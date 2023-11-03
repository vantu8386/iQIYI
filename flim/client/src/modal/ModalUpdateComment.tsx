import React, { useState } from "react";
import { AllComment, Cmt } from "../entities/comments.entiti";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instance from "../api/axios";

const ModalUpdateComment: React.FC<{
  comments: AllComment[];
  isOpen: number;
  closeModal: () => void;
}> = ({ isOpen, closeModal, comments }) => {
  const avatarUser = localStorage.getItem("avatarUser");
  const token = localStorage.getItem("token");
  const [editComment, setEditComment] = useState<Cmt>({
    comments:
      isOpen !== null
        ? comments.find((comment) => comment.commentId === isOpen)?.comments ||
          ""
        : "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editComment.comments) {
      toast.warning("Bình luận không được để trống !.")
      return;
    }


    const updatedComment = comments.find(
      (comment) => comment.commentId === isOpen
    );
   


    if (updatedComment) {
      instance
        .patch(`comments/${isOpen}`, {
          commentData: editComment.comments,
          token: token,
        })
        // .set('Authorization', 'Bearer ' + this.token)
        .then((res) => {
          console.log(res.data);
          updatedComment.comments = editComment.comments;
          closeModal();
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data.message) {
            toast.error(err.response.data.message);
          }
        });
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        closeOnClick
        pauseOnHover
        draggable={false}
      />
      <div className="flex items-center justify-center h-screen ">
        <div className="form_update">
          <div className="flex justify-between p-2">
            <div>
              <span className="text-black font-semibold">Update</span>
            </div>
            <div>
              <i
                onClick={closeModal}
                className="fa-solid fa-x cursor-pointer text-black hover:text-red-500"
              ></i>
            </div>
          </div>
          <div className="bg-gray-600 mx-2 h-px border-gray-300"></div>
          <div className=" flex items-center gap-3 p-5">
            <div>
              <img
                className="w-9 h-9 rounded-full"
                src={avatarUser !== null ? avatarUser : undefined}
                alt=""
              />
            </div>
            <form
              onSubmit={handleSubmit}
              className=" flex text-green-500 gap-3"
            >
              <input
                name="comments"
                value={editComment.comments}
                onChange={(e) => setEditComment({ comments: e.target.value })}
                className="p-2"
                type="text"
                placeholder="Viết bình luận..."
              />
              <button
                type="submit"
                className="text-blue-500 hover:text-blue-700"
              >
                <i className="fa-regular fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdateComment;
