const { Router } = require("express");
const register = require("../../controllers/auth");
const { authMiddlewares } = require("../../middlewares");
const router = Router();

router.post("/sign-up", register.registerUser);
router.post("/login", register.loginUser);
router.post("/update", authMiddlewares.checkJwt, register.updateUser);
router.post(
  "/updateProfile",
  authMiddlewares.checkJwt,
  register.updateUserProfile,
);
router.post("/update", authMiddlewares.checkJwt, register.updateUserProfile);
router.post(
  "/updatePassword",
  authMiddlewares.checkJwt,
  register.updatePassword,
);
router.post("/forgetPassword", register.forgetPassword);
router.post("/resetPassword/:resetToken", register.resetPassword);

module.exports = router;
