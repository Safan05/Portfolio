const express=require("express");
const router=express.Router();
router.get("/",(req,res)=>{
    let fnm=req.cookies.fnm;
    let lnm=req.cookies.lnm;
    res.clearCookie("fnm");
    res.clearCookie("token");
    res.clearCookie("lnm");
    res.render("WelcomeUser.ejs",{
        fname:fnm,
        lname:lnm
    })
})
module.exports=router;