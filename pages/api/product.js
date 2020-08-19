import Product from '../../models/Product'
import connectDb from "../../utils/connectDb"

connectDb();
export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await handleGetmethod(req, res)
            break;

        case "POST":
            await handlePostmethod(req, res)
            break;
        case "DELETE":
            await handleDeletemethod(req, res)
            break;

        default:
            res.status(405).send(`Method ${req.method} is not Allowed !`)
            break;
    }
}
const handleDeletemethod = async (req, res) => {
    const _id = req.query;
    console.log(req.query)
    await Product.findOneAndDelete({ _id });
    res.status(204).json({});

}
const handleGetmethod = async (req, res) => {

    const { _id } = req.query

    const product = await Product.findOne({ _id });

    res.status(200).json(product);
}

const handlePostmethod = async (req, res) => {
    try {

        const { name, price, description, mediaUrl } = req.body;
        console.log(req.body)
        if (!name || !price || !description || !media) {
            return res.status(422).send("Product missing One or more Field")
        }
        const product = await new Product({
            name, price, description, mediaUrl
        }).save();
        res.status(201).json(product)
    } catch (e) {
        res.status(500).send("Server Error in creating Product")
    }
}