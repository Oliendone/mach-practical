export const fetchArticleImage = url => {
  return fetch(`${url}?format=pjpg&auto=webp`)
    .then(res => res.blob())
    .then(imageBlob => {
      return URL.createObjectURL(imageBlob);
    });
};
