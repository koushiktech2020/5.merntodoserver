const User = require("../model/usermodel"); // Importing User model

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); //loading the jwt
const dotenv = require("dotenv");

// env file configure
dotenv.config();

// signup controller
exports.signup = async (req, res, next) => {
  try {
    // Check if email already exists
    if (await User.findOne({ email: req.body.email }))
      return res.json({
        status: false,
        data: null,
        message: "Email already used",
      });

    // Hash password if provided
    let hashedPassword = "";

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(req.body.password, salt);
    }

    // Create new user account object to save
    const newUser = new User({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and respond
    const savedaccount = await newUser.save();

    // Prepare the payload for the JWT token
    const tokenPayload = {
      email: savedaccount.email,
      userid: savedaccount._id,
    };

    // Generate JWT token using the payload and a secret key
    const token = jwt.sign(tokenPayload, "secret"); // Consider using environment variable for secret

    // Remove password from the account info
    const { password, ...userInfo } = savedaccount._doc;

    // Send success response with account details, token, ecosystem ID, and logo
    res.status(200).json({
      status: true,
      data: userInfo,
      token,
      message: "Sign up Successfully",
    });

    // Respond with success message
    res.status(200).json({
      status: true,
      data: savedaccount,
      message: "User registered Successfully",
    });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
  next();
};

// login controller
exports.login = async (req, res, next) => {
  try {
    // Find the account by email
    const userResult = await User.findOne({ email: req.body.email })
      .lean()
      .exec();

    // If account doesn't exist, return user not found message
    if (!userResult) {
      return res.status(202).json({ status: false, message: "User not found" });
    }

    // Compare provided password with the stored password
    const validPassword = await bcrypt.compare(
      req.body.password,
      userResult.password
    );

    // If password doesn't match, return wrong password message
    if (!validPassword) {
      return res.status(202).json({ status: false, message: "Wrong password" });
    }

    // Prepare the payload for the JWT token
    const tokenPayload = {
      email: userResult.email,
      userid: userResult._id,
    };

    // Generate JWT token using the payload and a secret key
    const token = jwt.sign(tokenPayload, "secret"); // Consider using environment variable for secret

    // Remove password from the account info
    const { password, ...userInfo } = userResult;

    // Send success response with account details, token, ecosystem ID, and logo
    res.status(200).json({
      status: true,
      data: userInfo,
      token,
      message: "Logged in Successfully",
    });
  } catch (error) {
    res.status(203).json({ status: false, message: error.message });
  }
  next();
};
