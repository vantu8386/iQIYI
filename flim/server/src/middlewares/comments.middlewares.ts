import { NextFunction, Request, Response } from "express";


export const checkComments = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { commentData } = req.body;

  if (!commentData) {
    return res.status(400).json({
      status: "Lỗi",
      message: "Thông tin không được để trống.",
    });
  }
  
  const checkComments = ["ngu", "phim rác", "dm"];

  const containerComment = checkComments.some((word) =>
  commentData.comments.toLowerCase().includes(word)
  );

  if (containerComment) {
    return res.status(400).json({
      message: "Bình luận chứa từ cấm. Vui lòng chỉnh sửa bình luận.",
    });
  }
  next();
};
