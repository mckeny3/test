import bcryptjs from "bcryptjs";
import { createError } from "../error.js";
import UserModel from "../models/User.js";

import Jwt from "jsonwebtoken";
// ///GET USERS
// //////CREATE USER

export const signUp = async (req, res, next) => {
  // const{userName,email,password,image,subscribers,subscribedUsers}=req.body;
  try {
    console.log("trying");

    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(req.body.password, salt);

    const create = await UserModel.create({
      ...req.body,
      password: hash,
    });

    console.log(create);

    const token = Jwt.sign({ id: create._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res
      .status(200)
      .json({ create })
      .cookie("ACCESS_TOKEN", token, { httpOnly: true });
  } catch (error) {
    next(error);
  }
};

// ///////////SIGN IN

export const signIn = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ userName: req.body.userName });

    // ///decrypt password and see if it match

    if (!user) {
      return next(createError(404, "user not found"));
    }
    const pass = bcryptjs.compareSync(req.body.password, user.password);

    if (!pass) {
      return next(createError(400, "Wrorng Credential"));
    }

    ////////create access token

    const token = Jwt.sign({ id: user._id }, process.env.SECRET_KEY);

    const { password, ...needed } = user._doc;

    return res
      .cookie("ACCESS_TOKEN", token, {
        httpOnly: true,
      })
      .status(200)
      .json(needed);
  } catch (error) {
    console.log("not found");
    next(error);
  }
};

/////////GOOGLE SIGN IN

export const signInGoogle = async (req, res, next) => {
  console.log("at sign up controller");
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      // console.log('signin up successfully',user)
      // return  res.status(200).json(user);

      ////////////add to to session
      const token = await Jwt.sign({ id: user.id }, process.env.SECRET_KEY);

      res
        .cookie("ACCESS_TOKEN", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user);
    } else {
      const set = await UserModel({
        userName: req.body.given_name,
        email: req.body.email,
        image: req.body.picture,
      });

      const user = await set.save();

      console.log("signed up successfully with google", user);

      const token = Jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });

      res
        .cookie("ACCESS_TOKEN", token, { httpOnly: true })
        .json({ user })
        .status(200);
    }

    //////means there was a user
  } catch (error) {
    console.log("login attempt failed");
    return next(error);
  }
};

//////SIGN OUT

export const signOut = async (req, res) => {
  try {
    res
      .cookie("ACCESS_TOKEN", "", {
        httpOnly: true,
        maxAge: 1,
      })
      .json({ message: "logged out successfully" })
      .status(200);
  } catch (error) {
    console.log("bad", error);
  }
};
