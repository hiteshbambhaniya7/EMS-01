import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse} from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body;

  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError("All fields are required", 400);
  }

  const existedUser =await User.findOne({email});
  console.log(existedUser)
  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }


  const user = await User.create({
    email: email.toLowerCase(),
    password
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createdUser) {
    throw new ApiError("Failed to create user", 500);
  }

  return res
  .status(201)
  .json(
    new ApiResponse(
        200,
        createdUser,
        "User created successfully"
    )
  )
});

const updateUser = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
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
  } = req.body;

  const userPhotoLocalPath = req.file?.path;

  if (!userPhotoLocalPath) {
    throw new ApiError("User photo is required", 400);
  }

  const userPhoto = uploadOnCloudinary(userPhotoLocalPath);

  if (!userPhoto) {
    throw new ApiError("Failed to upload user photo", 500);
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName,
        email,
        phone,
        address,
        photo: userPhoto.url,
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
      }
    },
    { new: true }
  );
});

export { registerUser, updateUser };
