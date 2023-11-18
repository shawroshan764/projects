// Import Joi and other modules
import Joi from "joi";


// Define a Joi schema for user input validation
const userSchema = Joi.object({
    name: Joi.string().max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  
  // Function to validate user input against the schema
  function validateUser(user: {
    name: string;
    email: string;
    password: string;
  }) {
    return userSchema.validate(user);
  }



// User's Post validations 
  const UserpostSchema = Joi.object({
    postTitle:Joi.string().min(20).max(100),
    content:Joi.string().min(100).max(1000)
  })

  function validatePost(post:{
    postTitle:string,
    content:string
  }){
    return UserpostSchema.validate(post);
  }
  
  module.exports = {
    validateUser,
    validatePost
  };
  