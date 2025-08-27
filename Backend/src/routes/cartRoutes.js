let express = require("express");
let router = express.Router();
let cartcntl = require("../controllers/cartController.js");

router.post("/addProductInCart",cartcntl.addProductsInCart);
router.get("/getCarts/:userId",cartcntl.getCartInfo);
router.get("/quantity/:id/:msg",cartcntl.reduceQuantity);


module.exports = router;