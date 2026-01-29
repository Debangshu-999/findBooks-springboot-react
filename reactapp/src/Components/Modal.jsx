const Modal = ({ type, message, onConfirm, onClose }) => {

  return (
    <div className="modal-backdrop">
      <div className={`modal-box ${type}`}>
        <h4>{type === "success" ? "Success" : "Error"}</h4>
        <p>{message}</p>

        {type === "success" ? (
          <button onClick={onConfirm}>OK</button>
        ) : (
          <button onClick={onClose}>Close</button>
        )}
      </div>
    </div>
  );
};

export default Modal;
