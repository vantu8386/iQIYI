import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../utils/database";

export const signup = async (req: Request, res: Response) => {
  try {
    const { userName, email, passwords } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hasPasswords = bcrypt.hashSync(passwords, salt);

    const sql = await db.execute("CALL Proc_post_user(?, ?, ?)", [
      userName,
      email,
      hasPasswords,
    ]);

    const [result] = sql;

    res.status(200).json({
      message: "Đăng kí thành công",
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Email đã được người khác đăng kí",
      error: error,
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, passwords } = req.body;
  try {
    const sql = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    const [result]: any = sql;

    if (result.length === 0) {
      res.json({
        status: "fasle email",
        message: "Sai mật khẩu hoặc Email chưa đăng ký",
      });
    } else {
      if (result[0].isBlocked === 1) {
        res.json({
          status: "Khóa tài khoản",
          message: "Tài khoản của bạn tạm khóa. Liên hệ quản trị viên để biết thêm thông tin.",
        });
      } else {
        let hasPasswords = result[0].passwords;
        let compare = bcrypt.compareSync(passwords, hasPasswords);
        if (!compare) {
          res.json({
            status: "Thất bại",
            message: "Mật khẩu không đúng",
          });
        } else {
          let token = jwt.sign(
            {
              data: { id: result[0].userId, email: result[0].email },
            },
            "vantu",
            { expiresIn: "1h" }
          );

          res.json({
            status: "Thành công",
            messages: `Chào mừng bạn đến với iQIYI`,
            token,
            Username: result[0].userName,
            UserID: result[0].userId,
            avatarUser: result[0].avatarUser,
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "lỗi server",
      error: error,
    });
  }
};

export const adminSignin = async (req: Request, res: Response) => {
  const { userName, passwords } = req.body;
  try {
    const sql = await db.execute("SELECT * FROM users WHERE userName = ?", [userName]);
    const [result]: any = sql;

    if (!result) {
      res.json({
        status: "fasle email",
        message: "Sai tài khoản mật khẩu",
      });
    } else {
        let hasPasswords = result[0].passwords;
        let compare = bcrypt.compareSync(passwords, hasPasswords);
        if (!compare) {
          res.json({
            status: "Thất bại",
            message: "Mật khẩu không đúng",
          });
        } else {
          let token = jwt.sign(
            {
              data: { id: result[0].userId, user: result[0].userName },
            },
            "vantu",
            { expiresIn: "1h" }
          );

          res.json({
            status: "Thành công",
            messages: `Chào mừng Admin`,
            token,
            Username: result[0].userName,
            UserID: result[0].userId,
            avatarUser: result[0].avatarUser,
          });
        }
    }
  } catch (error) {
    res.status(500).json({
      message: "lỗi server",
      error: error,
    });
  }
};


