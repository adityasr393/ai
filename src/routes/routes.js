const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');



//user routes
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/getsignup", userController.getsignup);

router.get("/getprofiledata/:id", userController.getprof);
router.put("/updateprofile/:id", userController.updateprof);
router.put("/updatestatus/:id",userController.updatestatus);



module.exports = router;