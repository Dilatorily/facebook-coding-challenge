import 'whatwg-fetch';
import * as Utils from '../utils';

describe('get', () => {
  let response;

  beforeEach(() => {
    response = { json: jest.fn().mockReturnValue({ response: 'test response' }) };
    window.fetch = jest.fn().mockReturnValue(response);
    window.localStorage = {
      getItem: jest.fn().mockReturnValue('test_access_token'),
    };
  });

  it('should get the access token from localStorage', async () => {
    await Utils.get('test url');
    expect(window.localStorage.getItem.mock.calls.length).toBe(1);
    expect(window.localStorage.getItem.mock.calls[0]).toEqual(['access_token']);
  });

  it('should GET a URL with the access token from localStorage', async () => {
    await Utils.get('test url');
    expect(window.fetch.mock.calls.length).toBe(1);
    expect(window.fetch.mock.calls[0]).toEqual([
      'test url',
      {
        headers: new Headers({
          'Access-Token': 'test_access_token',
          'Content-Type': 'application/json',
        }),
      },
    ]);
  });

  it('should return a JSON response', async () => {
    const results = await Utils.get('test url');
    expect(response.json.mock.calls.length).toBe(1);
    expect(response.json.mock.calls[0]).toEqual([]);
    expect(results).toEqual({ response: 'test response' });
  });
});

describe('post', () => {
  let response;

  beforeEach(() => {
    response = { json: jest.fn().mockReturnValue({ response: 'test response' }) };
    window.fetch = jest.fn().mockReturnValue(response);
    window.localStorage = {
      getItem: jest.fn().mockReturnValue('test_access_token'),
    };
  });

  it('should get the access token from localStorage', async () => {
    await Utils.post('test url', { body: 'test body' });
    expect(window.localStorage.getItem.mock.calls.length).toBe(1);
    expect(window.localStorage.getItem.mock.calls[0]).toEqual(['access_token']);
  });

  it('should POST a URL with the access token from localStorage', async () => {
    await Utils.post('test url', { body: 'test body' });
    expect(window.fetch.mock.calls.length).toBe(1);
    expect(window.fetch.mock.calls[0]).toEqual([
      'test url',
      {
        headers: new Headers({
          'Access-Token': 'test_access_token',
          'Content-Type': 'application/json',
        }),
        method: 'POST',
        body: '{"body":"test body"}',
      },
    ]);
  });

  it('should POST a URL with the default json value for the body', async () => {
    await Utils.post('test url');
    expect(window.fetch.mock.calls[0]).toEqual([
      'test url',
      {
        headers: new Headers({
          'Access-Token': 'test_access_token',
          'Content-Type': 'application/json',
        }),
        method: 'POST',
        body: '{}',
      },
    ]);
  });

  it('should return a JSON response', async () => {
    const results = await Utils.post('test url', { body: 'test body' });
    expect(response.json.mock.calls.length).toBe(1);
    expect(response.json.mock.calls[0]).toEqual([]);
    expect(results).toEqual({ response: 'test response' });
  });
});

describe('pluralize', () => {
  it('should pluralize a word', () => {
    const results = Utils.pluralize('example', 2);
    expect(results).toBe('examples');
  });

  it('should pluralize an exception', () => {
    const results = Utils.pluralize('datum', 2);
    expect(results).toBe('data');
  });

  it('should not pluralize if the count is 1', () => {
    const results = Utils.pluralize('example', 1);
    expect(results).toBe('example');
  });

  it('should have a default count parameter of 1', () => {
    const results = Utils.pluralize('example');
    expect(results).toBe('example');
  });
});
