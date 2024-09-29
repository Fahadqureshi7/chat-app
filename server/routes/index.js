const express = require('express')
const registerUser = require('../controller/registerUser')
const checkEmail = require('../controller/checkEmail')
const checkPassword = require('../controller/checkPassword')
const userDetails = require('../controller/userDetails')
const logout = require('../controller/logout')
const userUpdateDetails = require('../controller/updateUserdetails')
const searchUser = require('../controller/searchUser')


const router = express.Router()

// Create User API
router.post('/register',registerUser)
//check user email 
router.post('/email' , checkEmail)
//check password
router.post('/password' , checkPassword)
//login user detials
router.get('/user-details' , userDetails)
//logout user
router.get('/logout' , logout)
// update user details
router.post('/update-user', userUpdateDetails)
// search  user 
router.post('/search-user' , searchUser)



module.exports = router
