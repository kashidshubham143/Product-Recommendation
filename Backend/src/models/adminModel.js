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

exports.fetchAllOrders = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
  o.id AS orderId,
  u.name AS  username,
  p.name AS productName,
  p.price,
  p.discount_price,
  p.image_url,
  oi.quantity,                        -- ✅ comes from order_items
  (p.price * oi.quantity) AS totalPrice,  -- you can also calculate total
  o.created_at AS orderDate
FROM orders o
LEFT JOIN users u ON o.user_id = u.id
LEFT JOIN order_items oi ON o.id = oi.order_id
LEFT JOIN products p ON oi.product_id = p.id
ORDER BY o.id DESC;

    `;

    db.query(sql, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};


exports.updateOrderStatus = (orderId, status) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE orders SET status = ? WHERE id = ?";
    db.query(sql, [status, orderId], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};