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
      className={`modal fade ${isVisible ? "show" : ""}`}
      role="dialog"
      style={{ display: isVisible ? "block" : "none" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Xác nhận xóa</h5>
            <button
              type="button"
              className="close btn"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onCancel}
            >
              <span className="text-danger h2" aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">Bạn có chắc chắn muốn xóa?</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Hủy
            </button>
            <button
              type="button"
              className="btn btn-danger"
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
