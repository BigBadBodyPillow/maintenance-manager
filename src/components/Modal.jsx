import '../styles/Modal.css';

// passing thr children instead of having to import the components here
export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="modal-container">
      <div className="modal">
        <button className="close-modal" onClick={onClose} aria-label="Close">
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
