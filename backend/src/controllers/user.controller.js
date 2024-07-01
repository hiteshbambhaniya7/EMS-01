import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";

const registerUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body;

  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError("All fields are required", 400);
  }

  const existedUser = User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { fullName, phone, address, city, state, pincode ,access,gender, maritalStatus,joiningDate,skill,role,workingHours} = req.body;

  const user = await User.findByIdAndUpdate(req._id, {
    fullName,
    phone,
    address,
    city,
    state,
    pincode,
    access,
    gender,
    maritalStatus,
    joiningDate,
    skill,
    role,
    workingHours,
  }, { new: true });
});

export { registerUser };
