import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res.status(401).json({
        message: "Something went wrong",
        success: false,
      });
    }
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      return res.status(401).json({
        message: "try another email",
        success: false,
      });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedpassword,
      },
    });
    return res.status(201).json({
      message: "Success",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Enter all fields",
        success: false,
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        posts: {
          select: {
            id: true,
            title: true,
            status: true,
            imageUrl: true,
            content:true,
          },
        },
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "User does not exist",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Incorrect password",
        success: false,
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    const { password: _, ...safeUser } = user;

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: `Welcome back ${user.email}`,
        success: true,
        user: safeUser,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.cookie("token", "", { maxAge: 0 }).json({
      message: "Logout Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);

    const user = await prisma.user.findUnique({
      where: { id: decode.userId },
      select: {
        id: true,
        email: true,
        name: true,
        posts: {
          select: {
            id: true,
            title: true,
            status: true,
            imageUrl: true,
            content: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};