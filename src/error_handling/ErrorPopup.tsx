type Props = {
  error: string | undefined;
};

const messages = {
  not_allowed:
    "Your account was successfully verified, but it is not included in the list of allowed users. You have been automatically signed out and will not be able to access this service.",
  invalid_code:
    "The code you entered is invalid or has expired. This can happen if the login process takes too long. Please try again.",
} as const;
type ErrorCode = keyof typeof messages;

export function ErrorPopup({ error }: Props) {
  if (!error) return null;
  return (
    <dialog
      open
      className="rounded-lg p-4 lg:p-6 bg-purple-400 text-white border-2
                 shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] z-9999 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95svw] max-w-lg"
    >
      <h2 className="text-xl font-bold mb-2">Error</h2>
      <p className="mb-4">
        {isKnownError(error)
          ? messages[error]
          : `An unknown error has ocurred. Error code: ${error}`}
      </p>

      <form method="dialog" className="text-right">
        <button
          type="submit"
          className="px-4 py-2 rounded bg-purple-800 cursor-pointer font-bold"
        >
          OK
        </button>
      </form>
    </dialog>
  );
}

function isKnownError(error: string): error is ErrorCode {
  return error in messages;
}
