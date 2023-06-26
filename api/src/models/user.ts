import { Schema, model, Document } from "mongoose";
import { compare, hash } from "bcryptjs";
import { BCRYPT_WORK_FACTOR } from "../config";

interface UserDocument extends Document {
  name: string
  email: string
  password: string
  isPasswordMatch: (password: string) => Promise<boolean>
}

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
}, {
  timestamps: true,
});

UserSchema.pre<UserDocument>("save", async function () {
  if (this.isModified("password")) {
    this.password = await hash(this.password, BCRYPT_WORK_FACTOR);
  }
});

UserSchema.methods.isPasswordMatch = async function (password: string) {
  const user = this;
  return compare(password, user.password);
};

UserSchema.set("toJSON", {
  transform: (doc, { __v, password, ...rest }, options) => rest
});

export const User = model<UserDocument>("User", UserSchema);