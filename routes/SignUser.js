const express=require("express");
const router=express.Router();
const validator=require("../middlewares/registerValidator");
const controller=require("../controller/UserController");
router.post("/",validator,controller.SignUp);
module.exports=router;