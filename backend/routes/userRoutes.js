const express = require("express");
const {registerUser,authUser,allUser} = require("../controllers/userControllers");
const router = express.Router();
const { protect }=require("../middleware/authMiddleware");


router.post("/register", registerUser);
router.post("/login", authUser);
router.get("/userall",protect,allUser);


module.exports=router;