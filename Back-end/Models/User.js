var mongoose = require('mongoose');



const UserSchema = new mongoose.Schema(
    {
      clerkUserId: { type: String, unique: true, required: true },
      firstName: String,
      lastName: String,
      problems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"problems"
      }]
    },
    { timestamps: true }
  );


const Users = mongoose.model('Users',UserSchema);
module.exports={
    Users
}