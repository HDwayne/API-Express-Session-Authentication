import { Router } from "express";
import { validate, loginSchema } from "../validation";
import { catchAsync, guest, auth } from "../middleware";
import { User } from "../models";
import { UnauthorizedError } from "../errors";
import { logIn, logOut } from "../auth";

const router = Router();

router.post("/login", guest, catchAsync(async (req, res) => { 
  await validate(loginSchema, req.body);

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.isPasswordMatch(password))) {
    throw new UnauthorizedError("Incorrect email or password");
  }

  logIn(req, user.id);

  res.json({ message: "OK" });
}));

router.post("/logout", auth, catchAsync(async (req, res) => {
  await logOut(req, res);
  res.json({ message: "OK" });
 }));

export default router;