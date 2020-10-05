const mongoose = require("mongoose");
    const UserModelSchema = mongoose.Schema({
firstname : {
                type : String,
                required: "firstname is required",
                },
lastname : {
                type : String,
                required: "lastname is required",
                },
emailaddress : {
                type : String,
                required: "emailaddress is required",
                },
}, {collection:"usermodel", timestamps : true});
    const UserModel = mongoose.model("UserModel", UserModelSchema);
    module.exports = {UserModel};