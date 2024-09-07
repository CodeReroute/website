export const mergeClassNames = (
  ...args: (string | undefined | false | 0)[]
): string => {
  let classNames = '';
  for (const arg of args) {
    if (arg) {
      classNames += ' ' + arg;
    }
  }
  return classNames.substring(1);
};
