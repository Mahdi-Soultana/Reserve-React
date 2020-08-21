import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import Cart from '../../models/Cart'
import connectDb from '../../utils/connectDb'


connectDb();
const { ObjectId } = mongoose.Types;
export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await headelGetRequast(req, res)
            break
        case "PUT":
            await headelPUTRequast(req, res)
            break
        case "DELETE":
            await headelDeleteRequast(req, res)
            break
        default:
            res.status(405).sned(`Method ${req.method} not allowed`)
            break
    }
}

const headelGetRequast = async (req, res) => {
    if (!("authorization" in req.headers)) {
        res.status(401).send("No Authoriazation Token !")
    }

    try {
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        const cart = await Cart.findOne({ user: userId }).populate({
            path: "products.product",
            model: "Product"
        })
        res.status(200).json(cart.products)

    } catch (error) {
        console.error(error);
        res.status(403).sned("Please Login again !")
    }
}

const headelPUTRequast = async (req, res) => {
    const { quantity, productId } = req.body;
    if (!("authorization" in req.headers)) {
        res.status(401).send("No Authoriazation Token !")
    }
    try {
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        const cart = await Cart.findOne({ user: userId })
        const productExiste = cart.products.some(doc => ObjectId(productId).equals(doc.product))
        if (productExiste) {
            await Cart.findOneAndUpdate({ _id: cart._id, "products.product": productId },
                { $inc: { "products.$.quantity": quantity } })
        } else {
            const newProduct = { quantity, product: productId }
            await Cart.findOneAndUpdate({ _id: cart._id },
                { $addToSet: { products: newProduct } }
            )
        }
        res.status(200).send("Cart Updated");
    } catch (error) {
        console.error(error);
        res.status(403).sned("Please Login again !")
    }
}


const headelDeleteRequast = async (req, res) => {
    const { productId } = req.query
    if (!("authorization" in req.headers)) {
        res.status(401).send("No Authoriazation Token !")
    }
    try {
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        const cart=await Cart.findOneAndUpdate({
            user: userId
        },
            { $pull: { products: { product: productId } } }
            ,
            { new: true }
        ).populate({
            path: "products.product",
            model: "Product"
        })
        res.status(200).json(cart.products)

    } catch (error) {
        console.error(error);
        res.status(403).sned("Please Login again !")

    }
}