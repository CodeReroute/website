type Message = unknown;

export const logInfo = (
  message: Message,
  options?: Record<string, unknown>,
) => {
  // eslint-disable-next-line no-console
  console.log(message, options);
};

export const logWarning = (
  message: Message,
  options?: Record<string, unknown>,
) => {
  // eslint-disable-next-line no-console
  console.warn(message, options);
};

export const logError = (
  message: Message,
  options?: Record<string, unknown>,
) => {
  // eslint-disable-next-line no-console
  console.error(message, options);
};
