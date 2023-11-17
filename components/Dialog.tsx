import React from "react";

type Props = {
  pic: string;
  allPics: string[];
  onClose: (data: string[]) => void;
  children: React.ReactNode;
};

function Modal({ onClose, children, pic, allPics }: Props) {
  function handleCloseClick() {
    onClose(allPics);
  }

  function deleteFile() {
    fetch("/picture-frame/api/delete", {
      method: "POST",
      body: pic,
    })
      .then((response) => response.json())
      .then((data) => {
        onClose(data);
      });
  }

  return (
    <div className="modal-overlay z-50">
      <div className="modal-wrapper">
        <div className="modal">
          <div className="modal-header">
            <h1>soll das Foto gelöscht werden:</h1>
            <a href="#" onClick={handleCloseClick}>
              x
            </a>
          </div>
          {pic && <div className="break-words">{pic}</div>}
          <div className="modal-body h-3/5">{children}</div>
          <div className="modal-footer">
            <button
              className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
              onClick={deleteFile}
            >
              Delete
            </button>
            <button
              className="bg-rose-600 hover:bg-rose-800 text-white font-bold py-2 px-4 rounded"
              onClick={handleCloseClick}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
