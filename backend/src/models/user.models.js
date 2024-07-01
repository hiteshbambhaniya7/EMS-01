import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    photo: {
      type: String,
      required: true,
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
    access: {
      type: String,
      enum: ["GUEST", "EMPLOYEE", "ADMIN", "SUPERADMIN"],
      default: "GUEST",
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE"],
      default: "MALE",
    },
    maritalStatus: {
      type: String,
      enum: ["SINGLE", "MARRIED"],
      default: "SINGLE",
    },
    joiningDate: {
      type: Date,
    },
    skill: {
      type: String,
    },
    role: {
      type: String,
      enum: [
        "TRAINEE",
        "DEVELOPER",
        "MANAGER",
        "TEAM LEADER",
        "DEPARTMENT HEAD",
      ],
      default: "ADMIN",
    },
    workingHours: {
      type: Number,
      default: 8,
    },
  },
  { timestamps: true }
);

userSchema.pre =
  ("save",
  async function (next) {
    if (!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10);
    next();
  });

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);
