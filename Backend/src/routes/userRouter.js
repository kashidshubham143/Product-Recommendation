let express = require("express");
let router = express.Router();
let user = require("../controllers/userController.js")

router.get("/getUsers",user.getUsers);
router.post("/register", user.saveUser); // User Data saved
router.post("/login", user.LoginUser);   // login if user alredy prasent

//Inside the Menu option
// router.get("/profile", user.userProfile);
// router.get("/deleteUser",user.deleteUser);
// router.get("/likeProducts",user.likeProduct); //create a table for it user and product and refrence key to user,product table 


module.exports = router;