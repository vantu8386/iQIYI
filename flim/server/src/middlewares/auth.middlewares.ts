import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import db from "../utils/database";
import { log } from "console";

// check Signup
export const validateSignup = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userName, email, passwords } = req.body;

  const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  if (!userName || !email || !passwords) {
    return res.status(400).json({
      status: "Lỗi",
      message: "Thông tin không được để trống.",
    });
  }
  if (userName.length < 5 || userName[0] !== userName[0].toUpperCase()) {
    return res.status(400).json({
      status: "Lỗi",
      message:
        "Username phải có ít nhất 5 kí tự và bắt đầu bằng chữ cái viết hoa",
    });
  }

  if (!emailPattern.test(email)) {
    return res.status(400).json({
      status: "Lỗi",
      message: "Email không đúng định dạng.",
    });
  }
  if (passwords.length < 8) {
    return res.status(400).json({
      status: "Lỗi",
      message:
        "Mật khẩu phải có ít nhất 8 kí tự, bao gồm ít nhất một chữ cái viết hoa và một chữ số.",
    });
  }
  if (!/[A-Z]/.test(passwords)) {
    return res.status(400).json({
      status: "Lỗi",
      message: "Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa.",
    });
  }
  if (!/\d/.test(passwords)) {
    return res.status(400).json({
      status: "Lỗi",
      message: "Mật khẩu phải chứa ít nhất 1 chữ số.",
    });
  }

  next();
};

// check Signin
export const validateSignin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, passwords } = req.body;

  const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  if (!email || !passwords) {
    return res.status(400).json({
      status: "Lỗi",
      message: "Thông tin không được để trống.",
    });
  }
  if (!emailPattern.test(email)) {
    return res.status(400).json({
      status: "Lỗi",
      message: "Email không đúng định dạng.",
    });
  }
  if (passwords.length < 8) {
    return res.status(400).json({
      status: "Lỗi",
      message:
        "Mật khẩu phải có ít nhất 8 kí tự, bao gồm ít nhất một chữ cái viết hoa và một chữ số.",
    });
  }
  if (!/[A-Z]/.test(passwords)) {
    return res.status(400).json({
      status: "Lỗi",
      message: "Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa.",
    });
  }
  if (!/\d/.test(passwords)) {
    return res.status(400).json({
      status: "Lỗi",
      message: "Mật khẩu phải chứa ít nhất 1 chữ số.",
    });
  }

  next();
};
export const validateSigninAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userName, passwords } = req.body;

  if (!userName || !passwords) {
    return res.status(400).json({
      status: "Lỗi",
      message: "Thông tin không được để trống1.",
    });
  }
  if (passwords.length < 8) {
    return res.status(400).json({
      status: "Lỗi",
      message:
        "Mật khẩu phải có ít nhất 8 kí tự, bao gồm ít nhất một chữ cái viết hoa và một chữ số.",
    });
  }
  if (!/[A-Z]/.test(passwords)) {
    return res.status(400).json({
      status: "Lỗi",
      message: "Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa.",
    });
  }
  if (!/\d/.test(passwords)) {
    return res.status(400).json({
      status: "Lỗi",
      message: "Mật khẩu phải chứa ít nhất 1 chữ số.",
    });
  }


};

// check đăng nhập
export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // token chua co o body
    let { token }: any = req.body;

    if (!token) {
      return res.status(401).json({
        status: "Lỗi",
        message: "Yêu cầu đăng nhập.",
      });
    }

    const decoded: any = jwt.verify(token, "vantu");

    const { id } = decoded.data;
    let [user]: any = await db.execute(`SELECT * FROM users WHERE userId = ?`, [
      id,
    ]);

    if (user[0]) {
      if (user[0].isBlocked === 0) {
        next();
      } else {
        res.status(401).json({
          message: "Tài khoản của bạn đã bị khóa. Liên hệ quản trị viên để biết thêm thông tin.",
        })
      }
    } else {
      res.status(401).json({
        message: "Unauthorized",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Đăng nhập để sử dụng dịch vụ.",
      error: error,
    });
  }
};
