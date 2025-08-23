const { resolve } = require("path");
const db = require("../config/db");
const { rejects } = require("assert");

exports.getAllUsers=()=>{
  return new Promise((resolve,rejects)=>{
    db.query("select *from users",(err,row)=>{
      if(err) rejects(err);
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

exports.checkusers = (email, password) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE  email=? AND password = ?", [email, password], (err, row) => {
      if (err) reject(err);
      else if(row.length>0) resolve(row);
      else reject("Invalid Crediatials ");
    });
  });
}