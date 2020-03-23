/** Generate [0-9a-z]{length} string. */
export const randomString = (length: number) =>
  [...Array(length)].map(() => (~~(Math.random() * 36)).toString(36)).join('')
