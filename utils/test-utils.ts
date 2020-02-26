/** Generate [0-9a-z]{length} string. */
export const generateRandomString = (length: number) =>
  [...Array(Number.isInteger(length) ? length : 12)]
    .map(() => (~~(Math.random() * 36)).toString(36))
    .join('')
