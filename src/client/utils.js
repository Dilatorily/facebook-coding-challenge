const headers = new Headers({
  'Access-Token': localStorage.getItem('access_token'),
});

export const get = url => fetch(url, { headers }).then(response => response.json());

export const post = (url, json = {}) => fetch(url, {
  ...headers,
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
