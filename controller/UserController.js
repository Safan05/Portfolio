const user=require("../models/userModel");
const bcrypt=require("bcrypt");
let SignUp=async (req,res)=>{
        try{
        console.log("sign #1");
        let salt=await bcrypt.genSalt(10);
        let hashedPass=await bcrypt.hash(req.body.pass,salt);
        const newUser=new user({
            fnm:req.body.fnm,
            lnm:req.body.lnm,
            email:req.body.email,
            pass:hashedPass,
            IsAdmin:false
        })
        newUser.save().then(()=>{
            let token=newUser.CreateToken();
            if(token==-1)
              return res.status(500).send("Token cannot be found ... Internal error")
            // it is better to save token in response header
            res.cookie("token",token,{
                httpOnly:true,
                maxAge:null
            })
            res.cookie("fnm",newUser.fnm,{httpOnly:true})
            res.cookie("lnm",newUser.lnm,{httpOnly:true})
            res.header("x-authentication-token",token);
            res.render("WelcomeUser.ejs",{
                fname:newUser.fnm,
                lname:newUser.lnm
            })
            console.log("Signed up successfully");
        }).catch((err)=>{
            console.log("sign #3");
            console.log(err);
            res.status(403).send("Bad request .... invalid input !");
            for(let e in err.errors){
                console.log(err.errors[e].message);
                res.status(403).send("Bad request .... invalid input !");
            }
        });
    }
    catch(err){
        console.log("sign #4");
        console.log(err);
        res.status(403).send("Bad request .... invalid input !");
        for(let e in err.errors){
            console.log(err.errors[e].message);
            res.status(403).send("Bad request .... invalid input !");
        }
    }
}
module.exports={SignUp}