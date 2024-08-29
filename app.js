const exp = require("constants");
const express=require("express");
const app=express();
const helmet=require('helmet');
const path=require("path");
const cookieParser=require("cookie-parser");
const sign=require("./routes/SignUser");
const login=require("./routes/LoginUser");
const signout=require("./routes/Signout");
const contact=require("./routes/Contact");
const mongoose=require("mongoose");
process.on("uncaughtException",(exception)=>{console.log("Exception !")});  // used to handle any sync exception that may happen
process.on("unhandledRejection",(exception)=>{console.log("Rejection !")});  // used to handle any asyn rejection that may happen
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(helmet());
app.use("/Contact/index.html",contact);
app.use("/WorkWithMe/index.html",sign);
app.use("/WorkWithMe/login.html",login);
app.use("/signout",signout);
app.get("/cookies",(req,res)=>{
    res.send(cookieParser.JSONCookies(req.cookies));
})
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/Portfolio").then(()=>console.log("Database connected...")).catch((err)=>console.log(err));
const port=process.env.PORT||3000;
app.listen(port,()=>{console.log(`listening to port ${port} ..... !`);}); 