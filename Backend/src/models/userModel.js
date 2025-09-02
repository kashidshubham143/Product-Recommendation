const { resolve } = require("path");
const db = require("../config/db");
const { rejects } = require("assert");

exports.getAllUsers = () => {
  return new Promise((resolve, rejects) => {
    db.query("select *from users", (err, row) => {
      if (err) rejects(err);
      else resolve(row);
    })
  });
}
exports.saveDB = (name, email, contact, password, address) => {
  return new Promise((resolve, reject) => {

    db.query("INSERT INTO users (name, email, contact, password, address) VALUES (?, ?, ?, ?,?)", [name, email, contact, password, address], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.userNameCheck = (key, val) => {
  return new Promise((resolve, rejects) => {
    db.query(`select *from users where ${key}=?`, [val], (err, row) => {
      if (err) rejects(err);
      else resolve(row);
    });
  });
}

//likes
exports.showslike = (userId) => {
  return new Promise((resolve, rejects) => {
    db.query("select product_id, action_id as 'liked' from user_interactions where user_id=?", [userId], (err, row) => {
      if (err) rejects(err);
      else resolve(row);
    });
  });
}

exports.addLike = (userId, productId) => {
  return new Promise((resolve, rejects) => {
    db.query("insert into user_interactions(user_id,product_id,action_id) values(?,?,2)", [userId, productId], (err, row) => {
      if (err) rejects(err);
      else resolve(row);
    });
  });
}
exports.deleteLikes = (userId, productId) => {
  return new Promise((resolve, rejects) => {
    db.query("delete from user_interactions where user_id=? and product_id=?", [userId, productId], (err, row) => {
      if (err) rejects(err)
      else resolve(row)
    });
  });
}
exports.fetchAllLikes = () => {
  return new Promise((resolve, rejects) => {
    db.query("SELECT product_id, COUNT(action_id) AS liked FROM user_interactions WHERE action_id = 2 GROUP BY product_id", (err, row) => {
      if (err) rejects(err);
      else resolve(row);
    });
  })
}
exports.addNewView = (userId, productId) => {
  return new Promise((resolve, rejects) => {
    db.query("insert into user_interactions(user_id,product_id,action_id) values(?,?,1)", [userId, productId], (err, row) => {
      if (err) rejects(err);
      else resolve(row);
    });
  });
}
exports.allViews = () => {
  return new Promise((resolve, rejects) => {
    db.query("SELECT product_id, COUNT(action_id) AS viewed FROM user_interactions WHERE action_id = 1 GROUP BY product_id", (err, row) => {
      if (err) rejects(err);
      else resolve(row);
    });
  });
}
exports.userView = (userId) => {
  return new Promise((resolve, rejects) => {
    db.query("select  product_id from user_interactions where user_id=?", [userId], (err, row) => {
      if (err) rejects(err);
      else resolve(row);
    });
  });
}
exports.fetchLikes = (userId) => {
  return new Promise((resolve, rejects) => {
    db.query("SELECT u.id AS id,p.name AS productName,p.description,p.price,p.image_url,p.discount_price,c.name AS categoryName FROM user_interactions u INNER JOIN products p ON p.id = u.product_id INNER JOIN categories c ON c.id = p.category_id WHERE u.user_id = ? and u.action_id=2", [userId], (err, row) => {
      if (err) rejects(err);
      else resolve(row);
    });
  })
}