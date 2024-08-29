const user=require("../models/userModel");
const bcrypt=require("bcrypt");
let Login=async (req,res)=>{
    try{
    let sUser=await user.findOne({email:req.body.email}).exec();
    console.log(sUser.email);
    if(!sUser)
        return res.status(404).send("this email is not found");
    let validPass=await bcrypt.compare(req.body.pass,sUser.pass);
    if(!validPass)
        return res.status(404).send("Wrong Password !");
    let token=sUser.CreateToken();
    if(token==-1)
        return res.status(500).send("Token cannot be found ... Internal error");
    res.cookie("token",token,{
        httpOnly:true,
        maxAge:null
    })
    res.cookie("fnm",sUser.fnm,{httpOnly:true})
    res.cookie("lnm",sUser.lnm,{httpOnly:true})
    res.header("x-authentication-token",token);
    res.render("WelcomeUser.ejs",{
        fname:sUser.fnm,
        lname:sUser.lnm
    })
    console.log("Signed up successfully");
}
catch(err){
    console.log(err);
    res.status(500).send("Internal error");
}
}
module.exports={Login};