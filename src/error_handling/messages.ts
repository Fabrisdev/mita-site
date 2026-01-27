export const messages = {
  not_allowed:
    "Your account was successfully verified, but it is not included in the list of allowed users. You have been automatically signed out and will not be able to access this service.",
  invalid_code:
    "The code you entered is invalid or has expired. This can happen if the login process takes too long. Please try again.",
  message_send_success: "Message sent successfully.",
  message_send_failure:
    "An error has ocurred whilst sending the message. Please try again later.",
  service_down:
    "This service is currently unavailable. We apologize for the inconvenience. Please try again later.",
  non_existent_guild:
    "The requested guild either does not exist or you do not have permission to access it.",
} as const;

export type ErrorCode = keyof typeof messages;
