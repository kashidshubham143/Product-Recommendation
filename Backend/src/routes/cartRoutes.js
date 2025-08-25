let express = require("express");
let router = express.Router();

let cartcntl = require("../controllers/cartController.js");

router.post("/addProductInCart",cartcntl.addProductsInCart);


module.exports = router;