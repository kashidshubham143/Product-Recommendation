// let admodel = require("../models/catectlel");

const catectl = require("../models/categoryModel.js");



exports.createCategory=((req,res)=>{  // Admin Home Page Render
    // console.log(req.body);
    let {category} = req.body;
    let p = catectl.addCategory(category);
    p.then((result)=>{
        res.send("Category Added");
    }).catch((err)=>{  
        if (err.code == "ER_DUP_ENTRY") {
            // console.log(err.code);
            res.send("ER_DUP_ENTRY");
        }
        else {
        console.log(err);
        res.send(" DataBase Error ");
        }
    }); 
});
exports.getAllCategories=((req,res)=>{
    catectl.viewProduct().then((row)=>{
        if(row.length>0) res.send(row);
        else res.send([]);
    }).catch((err)=>{
        console.log(err);
    });
});

exports.updateCategory=((req,res)=>{  // Update Category
    let {name,id}=req.body;
    // console.log(name,id);
    catectl.updateCate(name,id).then((result)=>{
        res.send("Categories Changed...");
    }).catch((err)=>{
        console.log(err);
        res.send("Name Already Exist...");
    });
});
exports.deleteCategory=((req,res)=>{   //  Category Deletd
        catectl.deleteCate(req.params.id).then((result)=>{
            if(result.affectedRows>0) res.send("Deleted Category");
            else res.send("Its not deleted ");
        }).catch((err)=>{
            console.log(err);
            res.send("DataBase Error ");
        });
});
 
