import app from "./app.js";
import cloudinary from 'cloudinary';
import { connectDB } from "./config/database.js";
import Razorpay from "razorpay";
import nodeCron from "node-cron";
import { Stats } from "./models/Stats.js";

connectDB();

cloudinary.v2.config({ 
    cloud_name: "dtlzpa08e", 
    api_key:"866728182114353",
    api_secret: "851s4KHWSY_bWXcJc79oG7EYtUE"
});

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  }); 

nodeCron.schedule("0 0 0 1 * *",async()=>{
    try {
        await Stats.create({});
    } catch (error) {
        console.log(error);
    }
});

const temp = async () => {
    await Stats.create({});
};

temp();
  
app.listen(process.env.PORT,()=>{
    console.log(`Server is Listening on port : ${process.env.PORT}`);
})