import express from "express";
import bodyParser from "body-parser";
import mongoose, { mongo } from "mongoose";
import multer from "multer";
import authRoutes from "./routes/auth.js"
import { register } from "./controllers/auth.js";
import dotenv from "dotenv";


const app = express();
dotenv.config();



//FILE STORAGE

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/assests");
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
});

const upload = multer({storage});

app.get('/',(req,res)=>{
    res.send("hello");
})


//routes with files

app.get("/auth/register",upload.single("Picture"),register);

//routes
app.use("/auth",authRoutes)

const PORT = process.env.PORT||6001 ;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    app.listen(PORT,()=>{
        console.log(`server running on ${PORT}`);
    })
}).catch((error)=>console.log(`${error} did not connect...`));