var mongoose = require('mongoose');



const UserSchema = new mongoose.Schema(
    {
      clerkUserId: { type: String, unique: true, required: true },
      firstName: String,
      lastName: String,
    },
    { timestamps: true }
  );


const Users = mongoose.model('Users',UserSchema);
module.exports={
    Users
}