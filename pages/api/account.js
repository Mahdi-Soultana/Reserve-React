import User from '../../models/User'
import jwt from 'jsonwebtoken'
import connectDb from "../../utils/connectDb"

connectDb();

export default async (req, res) => {
// req.headers.cookie.replace("token=","")
    if (!("authorization" in req.headers)) {
        return res.status(401).send("No AuthorizatioN Token")

    }

    try {
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: userId })
         
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).send("user not Found ")

        }
    } catch (error) {
        res.status(403).send("Invalid Token ")

    }
}