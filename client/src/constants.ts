export const API_URL =
  process.env.NODE_ENV === 'test'
    ? 'https://jsonplaceholder.typicode.com/posts'
    : import.meta.env.VITE_API_URL
