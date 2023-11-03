import express, { Request, Response } from "express";
const router = express.Router();
import db from "../utils/database";

router.post("/addAlbum", async (req: Request, res: Response) => {
  const { url, imageEpisode, movieId } = req.body;
  try {
    const sql = await db.execute("CALL Proc_add_album(?,?,?)", [
      url,
      imageEpisode,
      movieId,
    ]);

    const [rows]: any = sql;
    if (rows.affectedRows === 1) {
      res.status(200).json({
        message: "Tải Phim Thành Công",
      });
    } else {
      res.status(404).json({
        mesage: "Post Album failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "lỗi server",
      error: error,
    });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await db.execute("CALL Proc_delete_album_one(?)", [id]);
      res.status(200).json({
        message: "Xóa thành công",
      });
    } catch (error) {
      res.status(500).json({
        message: "lỗi server",
        error: error,
      });
    }
  });

export default router;
