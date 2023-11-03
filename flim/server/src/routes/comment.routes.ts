import express, { Request, Response } from "express";
const router = express.Router();
import db from "../utils/database";
import { isAuth } from "../middlewares/auth.middlewares";
import { checkComments } from "../middlewares/comments.middlewares";

router.get("/:albumID", async (req: Request, res: Response) => {
  const { albumID } = req.params;
  try {
    const sql = await db.execute("CALL Proc_get_all_comments(?)", [albumID]);
    const [sqlComment] = sql;
    if (!Array.isArray(sqlComment)) {
      throw new Error("Invalid");
    }
    res.status(200).json({
      message: "Thành công",
      result: sqlComment[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "lỗi server",
      error: error,
    });
  }
});

router.post("/", isAuth, checkComments, async (req: Request, res: Response) => {
  const { comments, userId, albumId } = req.body.commentData;
  console.log("comments, userId, albumId:", comments, userId, albumId);

  try {
    await db.execute("CALL Proc_post_comments(?, ?, ?)", [
      comments,
      userId,
      albumId,
    ]);

    res.status(200).json({
      message: "Comments thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: "lỗi server",
      error: error,
    });
  }
});

router.patch(
  "/:commentId",
  isAuth,
  // checkComments,
  async (req: Request, res: Response) => {
    const { commentId } = req.params;
    const { commentData } = req.body;

    try {
      const sql = await db.execute("CALL Proc_update_comments(?, ?)", [
        commentData,
        commentId,
      ]);
      const [rows]: any = sql;
      if (rows.affectedRows === 1) {
        res.status(200).json({
          message: "Comment thành công",
        });
      } else {
        res.status(401).json({
          message: "lỗi",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "lỗi server",
        error: error,
      });
    }
  }
);

router.delete("/:commentId", async (req: Request, res: Response) => {
  const { commentId } = req.params;
  try {
    const sql = await db.execute("CALL Proc_delete_comment(?)", [commentId]);
    const [rows]: any = sql;

    if (rows.affectedRows === 1) {
      res.status(200).json({
        message: "Xóa thành công",
      });
    } else {
      res.status(401).json({
        message: "lỗi",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "lỗi server",
      error: error,
    });
  }
});

export default router;
