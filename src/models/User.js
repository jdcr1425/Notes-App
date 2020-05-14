const bcrypt = require('bcryptjs');
const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true}
}, {timestamps:true});

userSchema.methods.encryptPassword = async pass =>{
    const salt = await bcrypt.genSalt(10);
    return  await bcrypt.hash(pass, salt);
};

userSchema.methods.matchPassword = async function(pass) {
    return await bcrypt.compare(pass, this.password);
};

module.exports = model('User', userSchema);

