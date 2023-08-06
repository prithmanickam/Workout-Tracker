const { Router } = require("express");

const {
  registerUser,
  loginUser,
  getUserData,
} = require("../controllers/AuthControllers");

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/userData", getUserData);

module.exports = router;