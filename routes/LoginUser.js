const express=require("express");
const router=express.Router();
const controller=require("../controller/LoginController");
router.post("/",controller.Login);
module.exports=router;