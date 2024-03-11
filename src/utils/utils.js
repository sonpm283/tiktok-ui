export const checkvalidImageURL = (url) => {
  return url.match(/\.(jpeg|jpg|gif|png)$/i) !== null
}
