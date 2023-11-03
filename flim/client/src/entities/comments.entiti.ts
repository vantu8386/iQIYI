export type AllComment = {
  commentId: number;
  comments: string;
  ngayComment: string;
  userId: number;
  albumId: number;
  userName: string;
  avatarUser: string;
};

export type PostComments = {
  commentId: number;
  comments: string;
  ngayComment: string;
  userId: number;
  albumId: number;
};

export interface CommentsData {
  comments: string;
  userId: number;
  albumId: number;
}

export interface Cmt {
  // commentId: number;
  comments: string;
//   ngayComment: string;
//   UpdateComment: string;
//   userId: number;
//   albumId: number;
}
