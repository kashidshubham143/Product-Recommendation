const db = require("../config/db.js");

exports.adminLogin = (name, pass) => {
  return new Promise((resolve, reject) => {
    db.query("select *from admin where name=? and password=?", [name, pass], (err, row) => {
      if (err) {
        reject(err);
      } else if (row.length > 0) {
        resolve(row[0]);  // valid admin
      } else {
        reject("Invalid credentials"); // no match
      }
    })
  });
}