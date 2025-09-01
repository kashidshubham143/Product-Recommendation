let express = require("express");
let router = express.Router();
let user = require("../controllers/userController.js")
let product = require("../controllers/productController.js");

router.get("/getUsers",user.getUsers);
router.post("/register", user.saveUser); // User Data saved
router.post("/login", user.LoginUser);   // login if user alredy prasent
router.get("/getProfile",user.authenticateToken); // Verify Token

//For fetch Category wise Data 
router.get("/showProducts/:id",product.showProducts);

//  Manages Likes
router.get("/showLikes/:userId",user.showLikes);
router.post("/managelike",user.manageLike);
router.get("/fetchLikes",user.fetchLikes);
router.post("/addView",user.addView);
router.get("/fetchViews",user.fetchViews);
router.get("/fetchUserview/:userId",user.fetchUserview);

//Inside the Menu option
// router.get("/profile", user.userProfile);
// router.get("/deleteUser",user.deleteUser);
// router.get("/likeProducts",user.likeProduct); //create a table for it user and product and refrence key to user,product table 


module.exports = router;