import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/*Register User*/
export const register = async (req, res) => {
    try {
        const
            {
                firstName,
                lastName,
                address,
                phoneNumber,
                email,
                password,
                picturePath,
            } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = bcrypt.hash(password, salt);
        const newUser = new User(
            {
                firstName,
                lastName,
                address,
                phoneNumber,
                email,
                password:passwordHash,
                picturePath,
            });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch(err){
        res.status(500).json({error:err.message});
    }
};

/*LOGIN USER*/

export const loginUser = async(req,res)=>{
    try
    {
        const {email,password} = req.body
        const user = await User.findOne({email:email})
        //if user does not exit
        if(!user){
            return res.status(400).json({msg:"User does not exit"})
        }

        //check if user password is correct
        const isMatch = bcrypt.compare(password,user.password)
        //if the password is not correct
        if(!isMatch){
            return res.status(400).json({msg:"Password is wrong!"})
        }

        const token = jwt.sign({id:user._id}.password.env.JWT_SECRET)
        delete user.password
        res.status(200).json({token,user})

    }catch(err){
        res.status(500).json({errMsg:err.message})
    }
}