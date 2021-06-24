import mongoose from 'mongoose'
//setup schema
var userSchema = mongoose.Schema({
        
        name:{
            type:String,
            required: true
        },
        dob: {
            type: String,
            required: false
        },
        address:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: false
        }
    },
        {
           timestamps: true
       } 
      
);

var Users = mongoose.model('user', userSchema);
export default Users;