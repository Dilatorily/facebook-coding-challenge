const getHeaders = () => new Headers({
  'Access-Token': localStorage.getItem('access_token'),
  'Content-Type': 'application/json',
});

export const get = url => fetch(url, { headers: getHeaders() }).then(response => response.json());

export const post = (url, json = {}) => fetch(url, {
  headers: getHeaders(),
  method: 'POST',
  body: JSON.stringify(json),
}).then(response => response.json());

export const pluralize = (word, count) => {
  const exceptions = {};
  if (count === 1) {
    return word;
  }

  return exceptions[word] || `${word}s`;
};
