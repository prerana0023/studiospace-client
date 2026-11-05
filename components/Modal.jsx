'use client';
export function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="modal modal-open" role="dialog">
      <div className="modal-box">
        <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3" aria-label="Close">✕</button>
        <h3 className="font-bold text-xl mb-4">{title}</h3>
        {children}
      </div>
      <div className="modal-backdrop bg-black/50" onClick={onClose} />
    </div>
  );
}

export function ConfirmModal({ open, title, message, confirmText = 'Confirm', onConfirm, onCancel, busy }) {
  return (
    <Modal open={open} onClose={onCancel} title={title}>
      <p className="opacity-80">{message}</p>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={onCancel}>Keep it</button>
        <button className="btn btn-error" onClick={onConfirm} disabled={busy}>
          {busy && <span className="loading loading-spinner loading-sm" />}{confirmText}
        </button>
      </div>
    </Modal>
  );
}
