export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-50 w-11/12 max-w-md p-6 bg-white rounded-lg shadow-xl md:w-full dark:bg-slate-800">
        {children}
      </div>
    </div>
  );
}
