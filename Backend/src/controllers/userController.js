const usermodel = require("../models/userModel");

exports.getUsers = ((req, res) => {
  usermodel.getAllUsers().then((result) => {
    // console.log(result)
    res.send(result);
  }).catch((err) => console.log(err));
});

exports.saveUser = ((req, res) => {
  let { name, email, contact, password, address } = req.body;
  console.log(name, email, contact, password, address);
  let promise = usermodel.saveDB(name, email, contact, password, address); // Pass full object

  promise.then((result) => {
    res.send("User Saved...");
  }).catch((err) => {
    console.log(err);
    res.send("error", err);
  });
});

exports.LoginUser = (req, res) => {
  const { email, password } = req.body;
  usermodel.checkusers(email, password).then((result) => {
    // console.log(result);
    res.send(result);
  }).catch((err) => {
    console.log(err);
    res.send("Invalid Crediatials");
  });
}

// exports.deleteUser
// exports.likeProduct=(req,res)=>{
//   res.send("Show Liked Products to that user ");
//   // res.render("likedProd");
// }


