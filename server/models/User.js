import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            require: true,
            min: 2,
            max: 50
        },
        lastName: {
            type: String,
            require: true,
            min: 2,
            max: 50
        },
        address: {
            type: String,
            require: true,
        },
        phoneNumber: {
            type: String,
            require: true,
            min: 10,
            max: 10
        },
        email: {
            type: String,
            require: true,
            unique: true,
            max: 50
        },
        password: {
            type: String,
            require: true,
            min: 5
        },
        picturePath: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
)
const User = mongoose.model("Users", UserSchema)
export default User;