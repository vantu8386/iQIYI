import { useRef, useState, useEffect } from "react";
import "../css/comments.css";
import { AllComment, CommentsData } from "../entities/comments.entiti";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instance from "../api/axios";
import { formatDMY } from "../utils/formatTime";
import ModalUpdateComment from "../modal/ModalUpdateComment";
import { UserName1 } from "../entities/user.entiti";
import ModalDelete from "../modal/ModalDelete";

const Comments: React.FC<{
  comments: AllComment[];
  movieID: number;
  callFunction: (state: boolean) => void;
  call: boolean;
}> = ({ comments, movieID, callFunction, call }) => {
  const userID = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  // const avatarUser = localStorage.getItem("avatarUser");

  let parsedUserID = 0;
  if (userID !== null) {
    parsedUserID = Number(userID);
  }

  const [menuVisible, setMenuVisible] = useState<number | null>(null);
  const [textComments, setTextComments] = useState("");
  const refForm = useRef<null | HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState<number | null>(null);
  const [userN, setUserN] = useState<UserName1[]>([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [albumToDelete, setAlbumToDelete] = useState<number | null>(null);

  const openModal = (commentId: number) => {
    if (isOpen === commentId) {
      setIsOpen(null);
    } else {
      setIsOpen(commentId);
    }
  };

  const closeModal = () => {
    setIsOpen(null);
  };

  const toggleMenu = (commentId: number) => {
    if (menuVisible === commentId) {
      setMenuVisible(null);
    } else {
      setMenuVisible(commentId);
    }
  };
  const loadUser = () => {
    instance
      .get(`users/${userID}`)
      .then((res) => {
        setUserN(res.data.resultUser);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!textComments) {
      toast.warning("Bình luận không được để trống !.");
      return;
    }

    const commentData: CommentsData = {
      comments: textComments,
      userId: Number(userID),
      albumId: Number(movieID),
    };

    await instance
      .post("comments", { commentData, token: token })
      .then((res) => {
        console.log("res", res.data);
        // callFunction(!call);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });

    callFunction(!call);
    refForm.current?.reset();
  };

  const handleDelete = (commentId: number) => {
    setAlbumToDelete(commentId);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    instance
      .delete(`comments/${albumToDelete}`)
      .then((res) => {
        toast.success("Tạm biệt.");
        // toast.success(res.data.message);
        callFunction(!call);
      })
      .catch((err) => console.log(err));
    setIsDeleteModalVisible(false);
  };

  const cancelDelete = () => {
    setIsDeleteModalVisible(false);
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        closeOnClick
        pauseOnHover
        draggable={false}
      />
      <div className="text-black comment">
        <div className="flex justify-between items-center px-2 mt-2">
          <div className="font-bold text-zinc-300">
            <span>0</span> <span>bình luận</span>
          </div>
          <div className="font-bold ">
            <select className="outline-none rounded-md">
              <option value="">Mới nhất</option>
              <option value="">Cũ nhất</option>
            </select>
          </div>
        </div>
        <div className="bg-gray-400 h-px border-gray-200 my-5"></div>
        <div className="flex gap-3 bg-neutral-700 p-2 ">
          <div>
            <img
              className="w-10 h-9 rounded-full "
              src={userN[0]?.avatarUser}
              alt=""
            />
          </div>
          <form
            onSubmit={handleSubmit}
            className="border border-gray-500  w-full"
            ref={refForm}
          >
            <div>
              <textarea
                onChange={(e) => setTextComments(e.target.value)}
                placeholder="Viết bình luận..."
                className="border-gray-500 border-b w-full outline-none p-3 text-gray-200"
              ></textarea>
            </div>
            <div className="flex justify-end m-2">
              <button
                type="submit"
                className="bg-blue-500 px-5 py-1 rounded-lg text-white hover:bg-blue-600"
              >
                Đăng
              </button>
            </div>
          </form>
        </div>
        <div>
          {comments.length > 0 &&
            comments.map((cmt, index) => (
              <div key={index}>
                <div className="flex gap-3 my-5 w-full px-2">
                  <div>
                    <img
                      className=" h-11 w-12 rounded-full"
                      src={cmt.avatarUser}
                      alt=""
                    />
                  </div>

                  <div className="flex justify-between w-full">
                    <div>
                      <div>
                        <span className="font-bold text-zinc-300 ">
                          {cmt.userName}
                        </span>
                      </div>
                      <div>
                        <span className="text-zinc-200">{cmt.comments}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-400 cursor-pointer">
                          Thích
                        </span>
                        {" - "}
                        <span className="text-sm text-gray-400 cursor-pointer">
                          Phản hồi
                        </span>
                        {" - "}
                        <span className="text-sm text-gray-400">
                          {formatDMY(cmt.ngayComment)}
                        </span>
                      </div>
                    </div>
                    <div className="dropdown-container">
                      {menuVisible === cmt.commentId ? (
                        <div className="dropdown-content bg-white rounded-md font-semibold cursor-pointer">
                          {cmt.userId === parsedUserID && (
                            <p
                              className="hover:bg-blue-500 hover:text-white px-3"
                              onClick={() => openModal(cmt.commentId)}
                            >
                              Sửa bình luận
                            </p>
                          )}
                          {cmt.userId === parsedUserID && (
                            <p
                              className="hover:bg-blue-500 hover:text-white px-3"
                              onClick={() => handleDelete(cmt.commentId)}
                            >
                              Xóa
                            </p>
                          )}

                          <p
                            className="hover:bg-blue-500 hover:text-white px-3"
                            onClick={() => toggleMenu(cmt.commentId)}
                          >
                            Hủy
                          </p>
                        </div>
                      ) : (
                        cmt.userId === parsedUserID && (
                          <div
                            className="down"
                            onClick={() => toggleMenu(cmt.commentId)}
                          >
                            <i
                              className="fa-solid fa-chevron-down"
                              title="menu"
                            ></i>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-600 mx-2 h-px border-gray-200 my-5"></div>
              </div>
            ))}
        </div>
      </div>
      <ModalDelete
        isVisible={isDeleteModalVisible}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
      <div>
        {isOpen && (
          <div className=" modal-content fixed inset-0 z-50">
            <div className="">
              <ModalUpdateComment
                comments={comments}
                isOpen={isOpen}
                closeModal={closeModal}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Comments;
