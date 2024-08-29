const mongoose=require("mongoose");
const valid=require("validator");
const jwt = require("jsonwebtoken");
const config=require("config");
const schema=new mongoose.Schema({
    email:{
        type:String,
        unique: true,
        required: true,
        validate:{
            validator: (val)=>{ return valid.isEmail(val);},
            message:'{VALUE} is not valid'
        }
    },
    fnm:{
        type:String,
        required: true
    },
    lnm:{
        type:String,
        required: true
    },
    pass:{
        type:String,
        required: true,
        minlength:5
    },
    IsAdmin:{type:Boolean}
})
schema.method("CreateToken",function(){
    if(!config.get("jwtsec"))
        return -1;
    const token=jwt.sign({userid:this._id,IsAdmin:this.IsAdmin},
        config.get("jwtsec"));
    return token;
})
const user=mongoose.model("Users",schema);
module.exports=user
