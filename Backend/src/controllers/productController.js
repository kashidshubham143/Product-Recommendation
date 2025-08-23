const { log } = require("console");
const prod = require("../models/productModel.js");
const fs = require("fs");
const path = require("path");


exports.createProduct = (req, res) => {   // Added Products

    const { name, description, price, discount_price, category } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    let p = prod.addProduct(name, description, price, imageUrl, category, discount_price);
    p.then((result) => {
        res.send("Product added successfully!");
    }).catch((err) => {
        res.send("Data Failed To Save");
        res.status(500).json(err);
    });
}
exports.viewProduct = (req, res) => {
    
    prod.viewProducts().then((result) => {
        console.log(result);
        res.send(result);
    }).catch((err) => {
        console.log(err);
        res.send(err);
    });
}

exports.updateProduct = (req, res) => { //Update the Products Page
    let { id, name, description, price, category } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // if(!imageUrl){
    prod.findImageUrl(id).then((row) => {
        // console.log(row[0]);
        const imagePath = path.join(__dirname, "../../public", row[0].image_url);

        // console.log("For Delete  "+imagePath)
        // if (imageUrl) {
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.log("Image deletion error: ", err);
                } else {
                    console.log("Image deleted successfully");
                }
            });
        }).catch((err) => {
            console.log(err);
        });
    // }

// console.log("For Add  "+imageUrl);
// console.log(id, name, description, price, imageUrl, category );
prod.updateprod(id, name, description, price, imageUrl, category).then((result) => {
    res.send("Product Updated... ");
}).catch((err) => {
    console.log(err);
    res.send("Error");
});
}

exports.deleteProduct = (req, res) => { // Product Deleted From DataBase

    //find image url 
    prod.findImageUrl(req.params.id).then((row) => {
        // console.log(row[0].image_url);
        const imagePath = path.join(__dirname, "../../public", row[0].image_url);
        // console.log(imagePath)
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.log("Image deletion error: ", err);
            } else {
                // console.log("Image deleted successfully");
            }
        });
    }).catch((err) => {
        console.log(err);
    });

    prod.deleteProd(req.params.id).then((result) => {
        res.send("Product Deleted");
    }).catch((err) => {
        res.send("Error" + err);
    });
}
