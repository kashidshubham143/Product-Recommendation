const usermodel = require("../models/userModel");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

exports.getUsers = ((req, res) => {
  usermodel.getAllUsers().then((result) => {
    // console.log(result)
    res.send(result);
  }).catch((err) => console.log(err));
});

exports.saveUser = ((req, res) => {
  let { name, email, contact, password, address } = req.body;
  // console.log(name, email, contact, password, address);
  let enpass = bcrypt.hashSync(password, 8);
  // console.log(enpass);

  // check user already prasent or not
  let key = "name";
  let val = name;
  usermodel.userNameCheck(key, val).then((e) => {
    console.log(e);
    if (e.length > 0) res.send("UserName Already Taken By SomeOne");
    else {
      let promise = usermodel.saveDB(name, email, contact, enpass, address); // Pass full object
      promise.then((result) => {
        res.send("User Saved...");
      }).catch((err) => {
        console.log(err);
        res.send("error", err);
      });
    }
  }).catch((err) => {
    console.log(err);
    res.send(err);
  });

});

exports.LoginUser = (req, res) => {
  const { email, password } = req.body;
  let key = "email";
  let val = email;

  usermodel.userNameCheck(key, val).then((e) => {
    // console.log(e[0].password);
    if (e.length == 0) res.send("Invalid Crediatials");
    else {
      const isMatch = bcrypt.compareSync(password, e[0].password);
      if (isMatch) {
        let token = jwt.sign({ email }, process.env.JWTKEY, { expiresIn: '1h' });
        res.json({ data: e, token: token });
      }
      else res.send("Invalid Crediatials");
    }
  }).catch((err) => {
    console.log(err);
    res.send(err);
  });
}
exports.authenticateToken = (req, res, next) => {
  // console.log(req.headers);

  let authHeader = req.headers['authorization'];
  let token = authHeader && authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWTKEY, (err, valid) => {
    if (err) {
      res.status(403).send("Forbidden")
    }
    // console.log(valid.email);
    let key = 'email';
    let val = valid.email;
    usermodel.userNameCheck(key, val).then((e) => {
      // console.log(e[0].email);
      res.send(e[0].name);
    }).catch((err) => {
      console.log(err);
      res.send(err);
    });
  });
}

// Likes
exports.showLikes = (req, res) => {
  let { userId } = req.params;
  // console.log(userId)
  usermodel.showslike(userId).then((e) => {
    // console.log(e);
    res.send(e);
  }).catch((err) => {
    console.log(err);
    res.send(err);
  });
}

exports.manageLike = (req, res) => {

  let { userId, productId, msg } = req.body;
  console.log(userId, productId, msg);
  if (msg == "add") {
    usermodel.addLike(userId, productId).then((result) => {
      // console.log(result);
      res.send(result);
    }).catch((err) => {
      console.log(err);
      res.send(err);
    });
  }
  else {
    usermodel.deleteLikes(userId, productId).then((result) => {
      // console.log(result);
      res.send(result);
    }).catch((err) => {
      console.log(err);
      res.send(err);
    });
  }
}
exports.fetchLikes = (req, res) => {
  usermodel.fetchAllLikes().then((e) => {
    // console.log(e);    
    res.send(e);
  }).catch((err) => res.send(err));
}
//  Product Views
exports.addView = (req, res) => {
  let { userId, productId } = req.body;
  usermodel.addNewView(userId, productId).then((e) => {
    // console.log(e);
    res.send(e);
  }).catch((err) => {
    console.log(err);
    res.send(err);
  });
}
exports.fetchViews = (req, res) => {
  usermodel.allViews().then((e) => {
    // console.log(e);
    res.send(e);
  }).catch((err) => {
    console.log(err);
    res.send(err);
  });
}
exports.fetchUserview = (req, res) => {
  usermodel.userView(req.params.userId).then((e) => {
    // console.log(e);
    res.send(e);
  }).catch((err) => console.log(err));
}