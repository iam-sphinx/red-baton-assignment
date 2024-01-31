import bcrypt from "bcrypt";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  // for login
  const existedUser = await User.findOne({ username });
  if (!existedUser) {
    throw new ApiError(404, "User not Registered Yet.");
  }

  const encryptedPass = existedUser.password;

  const check = bcrypt.compare(password, encryptedPass);
  if (!check) {
    throw new ApiError(401, "invalid credentials");
  }

  // now user is verified so we are giving back accesstoken
  const token = jwt.sign(
    { userId: existedUser._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .cookie("accessToken", token, options)
    .json(
      new ApiResponse(
        200,
        { message: "User is being logged", token },
        "Successfully LoggedIn"
      )
    );
});

export const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // first we need to check if existed or not
  const existedUser = await User.findOne({ username });
  if (existedUser) {
    throw new ApiError(401, "User Already Existed!");
  }

  // now we will hash password
  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    password: hash,
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering a user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});
