const express=require("express");
const router=express.Router();
const path=require("path");
router.get("/",(req,res)=>{
    console.log("#####");
    console.log(req.cookies.token);
    if(req.cookies.token)
        res.render("emailForm.ejs",{
            fname:req.cookies.fnm,
            lname:req.cookies.lnm
        })
    else{
        res.sendFile(path.join(require.main.path,"/public/Contact/index.html"));
    }
    }
    )
module.exports=router;