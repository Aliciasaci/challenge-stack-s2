//importing modules
const express = require("express");
const db = require("../db");
//Assigning db.users to User variable
 const user = db.User;

 const saveUser = async (req, res, next) => {
 try {
   //checking if email already exist
   const emailcheck = await user.findOne({
     where: {
       email: req.body.email,
     },
   });

   if (emailcheck) {
     return res.json(409).send("Authentication failed");
   }

   next();
 } catch (error) {
   console.log(error);
 }
};

//exporting module
 module.exports = {
 saveUser,
};