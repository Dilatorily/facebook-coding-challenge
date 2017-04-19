const getHeaders = () => new Headers({
  'Access-Token': localStorage.getItem('access_token'),
  'Content-Type': 'application/json',
});

export const get = async (url) => {
  const response = await fetch(url, { headers: getHeaders() });
  return response.json();
};

export const post = async (url, json = {}) => {
  const response = await fetch(url, {
    headers: getHeaders(),
    method: 'POST',
    body: JSON.stringify(json),
  });
  return response.json();
};

export const pluralize = (word, count) => {
  const exceptions = {};
  if (count === 1) {
    return word;
  }

  return exceptions[word] || `${word}s`;
};
