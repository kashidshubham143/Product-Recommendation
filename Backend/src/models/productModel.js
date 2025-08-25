const { resolve } = require("path");
const db = require("../config/db");
const { rejects } = require("assert");

exports.addProduct = (name, description, price, imageUrl, category, discount_price) => { //Add Products
      return new Promise((resolve, reject) => {
            db.query("insert into products values('0',?,?,?,?,?,?)", [name, description, price, imageUrl, category, discount_price], (err, row) => {
                  if (err) reject(err);
                  else resolve(row);
            });
      });
}
exports.updateprod = (id, name, description, price, imageUrl, category_id) => {
      return new Promise((resolve, reject) => {
            let update = "update products set name=?, description=?, price=?, image_url=?, category_id=? where id=?";
            db.query(update, [name, description, price, imageUrl, category_id, id], (err, row) => {
                  if (err) reject(err);
                  else resolve(row);
            });
      });
}
exports.viewProducts = () => {
      return new Promise((resolve, reject) => {
            db.query("select p.*,c.name as 'categoryName' from products p inner join categories c on p.category_id=c.id", (err, row) => {
                  if (err) reject(err);
                  else resolve(row);
            });
      });
}
exports.deleteProd = (id) => {  // Delete Query
      return new Promise((resolve, reject) => {
            db.query("delete from products where id=?", [id], (err, row) => {
                  if (err) reject(err);
                  else resolve(row)
            });
      });
}
exports.findImageUrl = (id) => { //find the url for delete image
      return new Promise((resolve, rejects) => {
            db.query("select *from products where id=?", [id], (err, row) => {
                  if (err) rejects(err);
                  else resolve(row);
            })
      });
}

 // Fetch Products Based On their Categories
 exports.getProducts=(id)=>{
      return new Promise((resolve,rejects)=>{
            db.query("select *from products where category_id=?",[id],(err,row)=>{
                  if(err) rejects(err);
                  else resolve(row);
            });
      });
 }

