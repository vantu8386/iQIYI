import express, { Request, Response } from "express";
const router = express.Router();
import db from "../utils/database";

router.get("/", async (req: Request, res: Response) => {
  try {
    const sql = await db.execute("CALL Proc_all_movies()");
    const [movies] = sql;

    if (!Array.isArray(movies)) {
      throw new Error("Không hợp lệ");
    }

    res.status(200).json({
      message: "Thành công",
      movies: movies[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "lỗi server",
      error: error,
    });
  }
});

router.get("/moviesCount", async (req: Request, res: Response) => {
  try {
    const sql = await db.execute(`SELECT movieId, movie, searchCount
    FROM movies
    ORDER BY searchCount DESC
    LIMIT 10;`);
    const [rows] = sql
    res.status(200).json({
      message: "success",
      result: rows
    })
  } catch (error) {
    res.status(500).json({
      message: "lỗi server",
      error: error,
    });
  }
});

router.get("/query/", async (req: Request, res: Response) => {
  const { search } = req.query;
  try {
    const sql = await db.query("CALL Proc_search(?)", [search]);
    const [searchs] = sql;

    if (!Array.isArray(searchs)) {
      throw new Error("Error");
    }

    res.status(200).json({
      message: `${search}`,
      result: searchs[0],
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
    const sql = await db.execute(
      `SELECT m.movieId, m.movie, m.reviewUrl, m.daoDien, m.dienVien, m.describes, m.namPhatHanh, m.ngayDangTai, c.categoryName, m.image
    FROM movies AS m
    INNER JOIN category AS c
    ON m.categoryId = c.categoryId
    WHERE m.movieId = ?;`,
      [id]
    );
    const [movies] = sql;
    res.status(200).json({
      message: "Thành công",
      movies: movies,
    });
  } catch (error) {
    res.status(500).json({
      message: "lỗi server",
      error: error,
    });
  }
});

router.get("/review/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const sql = await db.execute("CALL Proc_review(?)", [id]);
    const [listAlbum] = sql;
    if (!Array.isArray(listAlbum)) {
      throw new Error("Không hợp lệ");
    }
    res.status(200).json({
      message: "Thành công",
      listAlbum: listAlbum[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "lỗi server",
      error: error,
    });
  }
});

// Số lượt xem bộ phim
router.put("/review/count/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await db.execute("CALL Proc_search_count(?)", [id]);
    res.status(200).json({
      message: "Cập nhật lượt xem thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: "lỗi server",
      error: error,
    });
  }
});

// Đếm lượt xem tập xem
router.put("/album/count/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await db.execute("CALL Proc_search_count_album(?)", [id]);
    res.status(200).json({
      message: "Cập nhật lượt xem thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: "lỗi server",
      error: error,
    });
  }
});

router.get("/play/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const sql = await db.execute("CALL Proc_play_movie(?)", [id]);
    const [play] = sql;
    if (!Array.isArray(play)) {
      throw new Error("Không hợp lệ");
    }
    res.status(200).json({
      message: "Thành công",
      play: play[0],
    });
    // await db.execute("CALL Proc_search_count_album(?)", [id]);
  } catch (error) {
    res.status(500).json({
      message: "lỗi server",
      error: error,
    });
  }
});

router.get("/movieID/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const sql = await db.execute("CALL Proc_get_one_album_movieID(?)", [id]);
    const [rows]: any = sql;
    if (!Array.isArray(rows)) {
      throw new Error("Invalid");
    }
    res.status(200).json({
      message: "Success",
      result: rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "lỗi server",
      error: error,
    });
  }
});

router.post("/addMovie", async (req: Request, res: Response) => {
  const {
    movie,
    reviewUrl,
    image,
    daoDien,
    dienVien,
    describes,
    namPhatHanh,
    categoryId,
  } = req.body;

  try {
    const sql = await db.execute("CALL Proc_add_movies(?,?,?,?,?,?,?,?)", [
      movie,
      reviewUrl,
      image,
      daoDien,
      dienVien,
      describes,
      namPhatHanh,
      categoryId,
    ]);

    const [rows]: any = sql;
    if (rows.affectedRows === 1) {
      res.status(200).json({
        message: "Post movie successfully",
      });
    } else {
      res.status(404).json({
        mesage: "Post movie failed",
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
    await db.execute("CALL Proc_delete_movies_one(?)", [id]);
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
