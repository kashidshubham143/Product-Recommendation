let express = require("express");
let routerProd = express.Router();
let prod = require("../controllers/productController.js");
const upload = require("../middleware/upload.js");

// Add product with image upload
routerProd.post("/addProduct", upload.single("image"), prod.createProduct);
routerProd.get("/viewProduct",prod.viewProduct);
routerProd.post("/updateProduct",upload.single("image"), prod.updateProduct);
routerProd.delete("/deleteProd/:id", prod.deleteProduct);

module.exports = routerProd;
