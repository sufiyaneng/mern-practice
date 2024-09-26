import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { cloudinaryOncloud } from "../utils/Coudaniary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res
  const { username, email, password, fullName } = req.body;
  // console.log("body",req.body)
  if (
    [username, email, password, fullName].some((field) => field.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    throw new ApiError(400, "Username or Email already exists.");
  }
  // upload images to cloudinary
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files.coverImage[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "avatarLocalPath not found.");
  }
  const avatar = await cloudinaryOncloud(avatarLocalPath);
  const coverImage = await cloudinaryOncloud(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar upload failed.");
  }
  const user = await User.create({
    username,
    email,
    password,
    coverImage: coverImage.url || "",
    avatar: avatar.url,
  });
  // remove password and refresh token from response
  const createdUser = await User.findById(user?._id).select(
    "-password",
    "-refreshToken",
  );
  if (!createdUser) {
    throw new ApiError(409, "User not found");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User created successfully"));
});

export { registerUser };
