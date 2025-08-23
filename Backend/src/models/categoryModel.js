const { resolve } = require("path");
const db = require("../config/db");
const { rejects } = require("assert");

exports.addCategory = (category) => {   //Category Adding Query
      return new Promise((resolve, reject) => {
            db.query("insert into categories values('0',?)", [category], (err, row) => {
                  if (err)  reject(err);
                  else return resolve(row);
            });
      });
}
exports.viewProduct=()=>{
      return new Promise((resolve,rejects)=>{
            db.query("select *from categories",[],(err,row)=>{
                  if(err) rejects(err);
                  else resolve(row);
            });
      });
}
exports.updateCate = (name, id) => {   //  Category Updated..
      return new Promise((resolve, reject) => {
            db.query("update categories set name=? where id=?", [name, id], (err, row) => {
                  if (err) reject(err);
                  else resolve(row);
            })
      });
}
exports.deleteCate = (id) => {  // Delete Categories and their Products
      return new Promise((resolve, reject) => {
            db.query("delete from categories where id=? ", [id], (err, row) => {
                  if (err) reject(err);
                  else resolve(row);
            });
      });
}