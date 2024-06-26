const asyncHandler= require("express-async-handler");
const User = require("../models/userModel");
const generateToken =require("../config/generateToken");


const registerUser = asyncHandler(async (req,res) => {
    const { name, email, password ,pic } = req.body;
    console.log(req.body);
    console.log(name,email,password,pic);

    if(!name || !email || !password){
        res.status(400);
        throw new Error("please enter all the fields");
    }
       const userExists = await User.findOne({ email });
       
       if(userExists)
       {
        res.status(400);
        throw new Error("User already exists");
       }
        const user= await User.create({
            name,
            email,
            password,
            pic,
        });
        

       if(user)
       {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
        console.log("dbwibdvw")
       } else{
        res.status(400);
        throw new Error("failed to  create the user")
       }
});

const authUser = asyncHandler(async(req,res) => {
    const {email,password} =req.body;
    console.log(req.body);

    const user = await User.findOne({ email });

    if(user && (await  user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        });
    }
});

const allUser = asyncHandler(async(req,res) =>
{
    
    const keyword = req.query.search
    ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i"}},
            { email:{ $regex: req.query.search, $options: "i"}},
        ],  
    }
    : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id}});
    res.send(users);

  
})  

module.exports = {registerUser,authUser,allUser};