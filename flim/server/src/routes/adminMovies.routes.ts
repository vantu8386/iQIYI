import express, { Request, Response } from "express";
const router = express.Router();
import db from "../utils/database";

router.get("/movies", async (req: Request, res: Response) => {
  try {
    const sql = await db.execute("CALL Proc_admin_get_all_movies()");
    const [rows] = sql;
    if (!Array.isArray(rows)) {
      throw new Error("Invalid");
    }
    res.status(200).json({
      message: "Thành công",
      result: rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "lỗi server",
      error: error,
    });
  }
});

router.get("/movies/:id", async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
      const sql = await db.execute("CALL Proc_admin_get_one_category(?)",[id]);
      const [rows] = sql;
      if (!Array.isArray(rows)) {
        throw new Error("Invalid");
      }
      res.status(200).json({
        message: "Thành công",
        result: rows[0],
      });
    } catch (error) {
      res.status(500).json({
        message: "lỗi server",
        error: error,
      });
    }
  });

export default router;
