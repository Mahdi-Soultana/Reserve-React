import connectDb from '../../utils/connectDb'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../../models/User'

connectDb();

export default async (req, res) => {
    try {
        const { email, password } = req.body;

        //1) check if the user is exicte
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(422).send("this user is not found please sign UP !")
        }

        //2)if not we will return error 
        const match = await bcrypt.compare( password,user.password)
        if (!match) {
            return res.status(401).send("this passowrd is not Match  !")
        }
        //3)check to see user password is existe
        //4)generate token 
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        //5)send that token to client
        res.status(200).json(token)
        console.log("loggin :"+ token)
    } catch (error) {
        res.status(500).send("Error Loginnn !")
    }

}