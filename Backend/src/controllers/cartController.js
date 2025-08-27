const cartItem = require("../models/cartModel.js");


exports.addProductsInCart = (req, res) => {
  const { userId, productId } = req.body;

  cartItem.checkUserProduct(userId, productId)
    .then((result) => {
      if (result.length > 0) {
        // already exists -> increase quantity
        cartItem.updateQuantity(userId, productId)
          .then(() => res.send("Quantity increased"));
      } else {
        // new product -> add
        cartItem.addInCart(userId, productId)
          .then(() => res.send("Product added in cart"));
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Server error");
    });
};

exports.getCartInfo = (req, res) => {
  // console.log(req.params.userId);
  cartItem.getCartsData(req.params.userId).then((result) => {
    res.send(result);
  }).catch((err) => {
    console.log(err);
    res.send(err);
  });
}

exports.reduceQuantity = (req, res) => {
  let { id, msg } = req.params;
  cartItem.fetchCartById(id).then((result) => {
    // console.log(result);
    if (result[0].quantity <= 1) {
      cartItem.deletById(id).then((result) => res.send("deleted")).catch((err) => console.log(err));
    } else {
      if (msg == "minus") {
        cartItem.descreseQuantity(id).then((result) => {
          // console.log(result);
          res.send("Quantity Descresed")
        }).catch((err) => console.log(err));
      }
      else {
        cartItem.increseQuantity(id).then((result) => {
          res.send("Quantity Incresed")
        }).catch((err) => console.log(err));
      }
    }
  }).catch((err) => {
    console.log(err);
  });


}


