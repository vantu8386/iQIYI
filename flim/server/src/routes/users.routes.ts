import express, { Request, Response } from "express";
const router = express.Router();
import db from "../utils/database";
import * as controllers from "../controllers/auth.controllers";
import {
  isAuth,
  validateSignin,
  validateSigninAdmin,
  validateSignup,
} from "../middlewares/auth.middlewares";

router.get("/", async (req: Request, res: Response) => {
  try {
    const sql = await db.execute("CALL Proc_get_all_user()");

    const [result] = sql;

    if (!Array.isArray(result)) {
      throw new Error("Invalid");
    }

    res.status(200).json({
      message: "Thành công",
      listUsers: result[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "lỗi server",
      error: error,
    });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const sql = await db.execute("CALL Proc_get_one_user(?)", [id]);
    const [resultUser] = sql;

    if (!Array.isArray(resultUser)) {
      throw new Error("Invalid");
    }

    res.status(200).json({
      message: "Thành công",
      resultUser: resultUser[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "lỗi server",
      error: error,
    });
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("req.params:", req.params)
  const { userName } = req.body;
  console.log("req.body:", req.body)
  try {
    const sql = await db.execute(
      "UPDATE users SET userName = ? WHERE userId = ?",
      [userName, id]
    );
    const [rows]: any = sql;

    if (rows.affectedRows === 1) {
      res.status(201).json({
        message: "Thành công",
      });
    }else {
      res.status(404).json({
        message: "Lỗi",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "lỗi server",
      error: error,
    });
  }
});

router.post("/avatarUser/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("req.params:", req.params)
  const { avatarUser } = req.body;
  console.log("req.body:", req.body)
  try {
    const sql = await db.execute(
      "UPDATE users SET avatarUser = ? WHERE userId = ?",
      [avatarUser, id]
    );
    const [rows]: any = sql;

    if (rows.affectedRows === 1) {
      res.status(201).json({
        message: "Thành công",
      });
    }else {
      res.status(404).json({
        message: "Lỗi",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "lỗi server",
      error: error,
    });
  }
});

router.post("/signup", validateSignup, controllers.signup);
router.post("/signin", validateSignin, controllers.signin);
router.post("/admin/signin", validateSigninAdmin, controllers.adminSignin);

router.put("/isBlocked/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await db.execute("update users set isBlocked = ? where userId = ?", [
      status,
      id,
    ]);
    res.status(200).json({
      message: status === 1 ? "Đã khóa tài khoản" : "Đã mở tài khoản",
    });
  } catch (error) {
    res.status(500).json({
      message: "lỗi server",
      error: error,
    });
  }
});

export default router;
