interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

function DeleteModal({ onCancel, onConfirm }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 text-center">
      <div className="bg-white border border-[#6c63ff] rounded-md w-70 p-4 flex flex-col justify-between h-45">
        <h3 className="text-lg  font-semibold">
          ARE YOU SURE YOU WANT TO DELETE THIS TASK?
        </h3>

        <div>
          <h1></h1>
        </div>

        <div className="flex justify-end gap-25">
          <button
            className="bg-white px-3 py-1 rounded-md border border-[#6c63ff] text-[#6c63ff]"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="bg-red-500 text-white px-3 py-1 rounded-md font-inter"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
