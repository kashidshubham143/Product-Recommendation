let express=require("express");
let router = express.Router();
let cate=require("../controllers/adminController.js")

// router.post("/adminlogin",cate.Login)
router.post("/login",cate.Login); //for Login
router.get("/view-users", cate.viewAdminUsers);
router.get("/orders", cate.getAllOrders);
router.put("/orders/:id/status", cate.updateOrderStatus);

module.exports=router;