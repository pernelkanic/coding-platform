var mongoose = require('mongoose');



const UserSchema = new mongoose.Schema(
    {
      clerkUserId: { type: String, unique: true, required: true },
      firstName: String,
      lastName: String,
      problems:[{
       Name:{
          type:String
        },
        Language:{
          type:String
        },
        Code:{
          type:String
        },
        Status:{
          type:String
        }

      }],
    },
    { timestamps: true }
  );


const Users = mongoose.model('Users',UserSchema);
module.exports={
    Users
}