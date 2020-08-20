import connectDb from '../../utils/connectDb'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../../models/User'
import Cart from "../../models/Cart"
import isLength from "validator/lib/isLength"
import isEmail from "validator/lib/isEmail"
connectDb()

export default async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!isLength(name, { min: 6, max: 15 })) {
            return res.status(422).send("name must be between 6-15 Character !")
        }
        else if (!isLength(password, { min: 6 })) {
            return res.status(422).send("Password  must at least  6 Character!")
        }
        else if (!isEmail(email)) {
            return res.status(422).send("please insert a valid Email  !")
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(422).send(`User  IS already
     existe with eamil ${email}`)
        }
        const hash = await bcrypt.hash(password, 10)
        ///Create User
        const newUser = await new User({
            name, email, password: hash
        }).save();
        ///Create Cart
        await new Cart({ user: newUser._id }).save()
        console.log({ newUser });
        ///////////4 create Token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.status(201).json(token)
    } catch (e) {
        console.log(e);
        res.status(500).send("Error SignUp user ,Please Try Again !")
    }

}