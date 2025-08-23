let express=require("express");
let router = express.Router();
let cate=require("../controllers/categoryController")


// router.get("/", cate.homePage);
// router.get("/cate", cate.Login);
// router.post("/cate-auth", cate.adminAuth);
// router.get("/dashboard", cate.dashboad);
// router.get("/adminlogout", cate.logout);
// router.get("/view-users", cate.viewAdminUsers);

// router.get("/Login",cate.Login); //for Login
// router.get("/", cate.homePage); //Admin Home Page

router.post("/addCategory",cate.createCategory); // for add Category
router.get("/viewCategory",cate.getAllCategories); // Views Categories
router.put("/updateCategory",cate.updateCategory);  
router.delete("/deleteCategory/:id", cate.deleteCategory); // Delete Category

module.exports = router;