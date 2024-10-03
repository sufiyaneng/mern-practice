import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJwt = asyncHandler(async (req, res,next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    console.log("token",token)
    if (!token) {
      throw new ApiError(401, "Unauthorized user");
    }

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log("decodeToken",decodeToken)
    const user = await User.findById(decodeToken?._id).select(
      "-password -accessToken",
    );
    if (!user) {
      throw new ApiError(401, "invalid accessToken");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error.message || "Invalid access token");
  }
});
 export {verifyJwt}