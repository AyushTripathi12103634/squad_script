import usermodel from "../models/usermodel.js";
import { hashPassword, comparePassword } from "../helpers/authhelper.js";
import JWT from "jsonwebtoken";
export const registerController = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;
    if (!username) {
      return res.status(400).send({
        success: false,
        message: "Username is required",
      });
    }
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Name is required",
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email is required",
      });
    }
    if (!password) {
      return res.status(400).send({
        success: false,
        message: "Password is required",
      });
    }

    const hashed_password = await hashPassword(password);

    const exist_email = await usermodel.findOne({ email: email });
    if (exist_email) {
      return res.status(300).send({
        success: false,
        message: "user already exists",
      });
    }

    const exist_name = await usermodel.findOne({ username: username });
    if (exist_name) {
      return res.status(300).send({
        success: false,
        message: "username already exists",
      });
    }

    try {
      const user = await new usermodel({
        name: name,
        email: email,
        username: username,
        password: hashed_password,
      }).save();
      return res.status(200).send({
        success: true,
        message: "user registered successfully",
        user,
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: "Failed to create user",
        error: error,
      });
    }
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Error in register API",
      error: error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Enter email",
      });
    }
    if (!password) {
      return res.status(400).send({
        success: false,
        message: "Enter password",
      });
    }
    const user = await usermodel.findOne({ email: email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "No such user found",
      });
    }
    const result = await comparePassword(password, user.password);
    if (result) {
      const token = await JWT.sign(
        {
          _id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      return res.status(200).send({
        success: true,
        message: "Logged in successfully",
        user: {
          username: user.username,
          name: user.name,
          email: user.email,
        },
        token,
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Invalid Password",
      });
    }
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Failed to login",
    });
  }
};
