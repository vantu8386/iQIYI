import React from "react";

interface ModalDeleteProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({
  isVisible,
  onConfirm,
  onCancel,
}) => {
  return (
    <div
      className={`modal fixed w-full h-full top-0 left-0 flex items-center justify-center text-black ${
        isVisible ? "" : "hidden"
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="bg-white w-96 rounded-lg">
        <div className="py-5">
          <div className="modal-header flex justify-between text-2xl px-5">
            <h5 className="font-semibold">Xác nhận xóa</h5>
            <button
              type="button"
              className="close btn"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onCancel}
            >
              <span className="text-red-500 font-bold text-3xl" aria-hidden="true">
                &times;
              </span>
            </button>
          </div>
          <div className="bg-gray-300 h-px border-gray-200 my-5"></div>
          <div className="flex flex-col items-center text-lg">
            <p className="animate-bounce text-red-600 font-semibold">Hi ! Chào cậu.</p>
            <p>Cậu có chắc chắn muốn xóa?</p>
          </div>
          <div className="bg-gray-300 h-px border-gray-200 my-5"></div>
          <div className="flex justify-end gap-2 text-white font-semibold px-5">
            <button
              type="button"
              className="bg-zinc-500 px-2 rounded-lg"
              onClick={onCancel}
            >
              Hủy
            </button>
            <button
              type="button"
              className="bg-red-500 py-1 px-2 rounded-lg"
              onClick={onConfirm}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
