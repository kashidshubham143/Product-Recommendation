
let admodel = require("../models/adminModel.js")
exports.Login = (req, res) => {
    let {name,password} = req.body;
    admodel.adminLogin(name,password).then((result)=>{
        // console.log(result);
            res.send("okey");
    }).catch((err)=>{
        // console.log(err);
        res.send("Invalid Credentials");
    });    
};

exports.viewAdminUsers = (req, res) => {
    const adminId = req.session.admin.id;
    admodel.getAdminUsers(adminId, (err, users) => {
        if (err) throw err;
        res.render("viewUsers", { users, adminname: req.session.admin.username });
    });
}
