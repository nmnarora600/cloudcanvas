const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const { body, validationResult } = require("express-validator");
const fetchUser=require('../middleware/fetchUser');
const JWT_SECRET_TOKEN='namanisaGoodB1oy';

//ROUTE: 1
//Create a User using Post  "api/auth/createuser" no need for Auth model. NO LOGIN NEEDED

//Validation of all areas
router.post(
  "/createuser",
  [
    body("name", "invalid name").isLength({ min: 3 }),
    body("password", "password not valid").isLength({ min: 5 }),
    body("email", "Invalid Email").isEmail(),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req); //to check whether error exists in typing
    if (errors.isEmpty()) {
      try {                             //try

        let user = await User.findOne({ email: req.body.email }); //check error for duplicate entries
        if (user) {
          return res.status(400).json({success:false,error:"Sorry User Already exists"});
        }
        const salt=await bcrypt.genSalt(10);
        let secPass=await bcrypt.hash(req.body.password, salt);
        user = await User.create({                          //creating user
          name: req.body.name,
          password: secPass,
          email: req.body.email,
        });
        const data={
            user:{
                id:user.id
            }
        }
      
        const authToken=jwt.sign(data, JWT_SECRET_TOKEN);
        // const verify=jwt.verify(authToken,JWT_SECRET_TOKEN, function(err,decoded){
        //     return (decoded);
        // }
        success=true;
        res.send({success,authToken});


      } catch (error) {                                     //catch
        console.error(error.message);
        res.status(500).send({success:false,error:"Some Error Occured"})
      }

    } 
    else {
      return res.status(400).json({ success:success, errors: errors.array() }); //if typo exists
    }
  }
); //post request ends


//ROUTE: 2
//Loging in a User using Post  "api/auth/login" no need for Auth model. NO LOGIN NEEDED
router.post('/login',
[
  body("password", "Invalid Credentials").exists(),
  body("email", "Invalid Credentails").isEmail()
],
async (req,res)=>{
  let success=false;
const errors= validationResult(req);
if(!errors.isEmpty()){
  return res.status(400).json({errors:errors.array()});
}
else{
  const {email, password}=req.body;
  try {
    let user=await User.findOne({email})
    if(!user){
      return res.status(400).json({error:"User Not exists"});
    }
    const pwdCompare= await bcrypt.compare(password,user.password)
    if(!pwdCompare){
      return res.status(400).json({success,error:"Invalid Password"});
    }
   
    const data={
      user:{
        id:user.id
      }
      
  }
  const authToken=jwt.sign(data, JWT_SECRET_TOKEN);
  success=true;
return res.json({success,authToken});
  } catch (error) {                                     //catch
    console.error(error.message);
    return res.status(500).send("Some Error Occured")
  }
}
}
)

//ROUTE: 3
//Get Loggedin User Details using Post  "api/auth/getuser" . LOGIN NEEDED
router.post('/getuser',
fetchUser,
async (req,res)=>{

try {
  let userId=req.user.id;
   const user = await User.findById(userId).select("-password")
   res.send(user);
} catch (error) {                                     //catch
  console.error(error.message);
  return res.status(500).send("Some Error Occured")
}

})
module.exports = router;
