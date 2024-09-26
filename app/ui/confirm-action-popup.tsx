const ConfirmActionPopup = ({
  description,
  setConfirmActionPopupState,
  handler,
}: {
  description: string;
  setConfirmActionPopupState: any;
  handler: () => void;
}) => {
  return (
    <>
      <div
        onClick={() =>
          setConfirmActionPopupState({ isShowing: false, message: "" })
        }
        className="fixed inset-0 z-10 bg-black/20 backdrop-blur-sm"
      />
      <div className="fixed left-1/2 top-1/2 z-20 w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-8 sm:w-[50%]">
        <p className="mb-2 text-lg font-medium text-neutral-dark01">
          Confirm action
        </p>
        <p>Are you sure you want to {description}?</p>
        <div className="mt-4 flex gap-2">
          <button
            className="rounded-xl bg-primary-one px-4 py-2 font-medium text-white"
            onClick={handler}
          >
            Yes
          </button>
          <button
            className="rounded-xl bg-primary-one/10 px-4 py-2 font-medium text-primary-three"
            onClick={() =>
              setConfirmActionPopupState({ isShowing: false, message: "" })
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmActionPopup;
