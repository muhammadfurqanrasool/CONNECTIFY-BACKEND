import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import auth from "./routes/auth.js"
const app = express();
dotenv.config();





// middlewares
app.use(express.json());
app.use(cors({origin: "*", }));
const PORT = Number(process.env.PORT) || 5500;
const MONGO_URI = process.env.MONGO_URI;




app.get("/", (Request,Response)=>{ 
    Response.status(200).send("<h1>Hello, World!</h1>");
})

app.use("/api/auth", auth)

async function callback() { 
    console.log("Listening on PORT", PORT);
    await mongoose.connect(MONGO_URI). then(()=>{
        console.log("Connected to Database!")
}).catch(e=>{
    console.log("Error Occured\n", e.message)
});
}

app.listen(PORT,callback)