"use server";
import connetToDb from "@/database";
import User from "@/models";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function registerUserAction(formData) {
  await connetToDb();

  try {
    const { userName, email, password } = formData;

    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return {
        success: false,
        message: "User already exists! plz signin",
      };
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const CreateNewUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    const saveUser = await CreateNewUser.save();
    if (saveUser) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(saveUser)),
        message: "User created successfully",
      };
    } else {
      return {
        success: false,
        message: "user not created! plz try again",
      };
    }
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Something Went Wrong! plz try again",
    };
  }
}

export async function loginAction(formData) {
  await connetToDb();

  try {
    const { email, password } = formData;

    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return {
        success: false,
        message: "User doesnot exists! plz signup first",
      };
    }

    const checkPassword = await bcryptjs.compare(password, checkUser.password);
    if (!checkPassword) {
      return {
        success: false,
        message: "password is incorrect",
      };
    }

    const createTokenData = {
      id: checkUser._id,
      userName: checkUser.userName,
      email: checkUser.email,
    };

    const token = jwt.sign(createTokenData, "DEFAULT_KEY", { expiresIn: "1d" });

    const getCookies = cookies();
    getCookies.set('token',token);

    return {
        success : true,
        message : "login successful"
    }

  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Something Went Wrong! plz try again",
    };
  }
}

export async function fetchUserAction() {
    await connetToDb();

    try{
        const getCookies = cookies();
        const token = getCookies.get('token')?.value || "";

        if(token === "") {
            return {
                success : false,
                message : "Token is invalid",
            }
        }

        const decodedToken = jwt.verify(token, "DEFAULT_KEY");
        const userInfo = await User.findOne({id : decodedToken._id});

        if(userInfo){
            return {
                success : true,
                data : JSON.parse(JSON.stringify(userInfo)),
            }
        }
        else{
            return {
                success : false,
                message : "Some error occured! plz try again",
            }
        }
    }
    catch(err){
        console.log(err);
        return{
            success : false,
            message : "something went wrong! plz try again"
        }
    }
}

export async function logoutAction() {
  const getCookies = cookies();
  getCookies.set("token",'');
}