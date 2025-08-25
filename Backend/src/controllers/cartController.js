const cartItem = require("../models/cartModel.js");

exports.addProduct=(req,res)=>{
      let p=cartItem.addProd();
}

exports.addProductsInCart=(req,res)=>{
  console.log(req.body);
  res.send(req.body)
}

