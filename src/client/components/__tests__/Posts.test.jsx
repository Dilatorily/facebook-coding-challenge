import React from 'react';
import { shallow } from 'enzyme';

import AddPost from '../AddPost';
import Post from '../Post';
import Posts from '../Posts';
import * as Utils from '../../utils';

describe('<Posts />', () => {
  beforeEach(() => {
    Utils.get = jest.fn((url) => {
      if (url === '/api/picture') {
        return new Promise(resolve => resolve({ location: 'http://picture.location' }));
      }

      return new Promise(resolve => resolve({ data: [{}], paging: { next: 'https://load.more' } }));
    });
  });

  it('should GET the list of posts', () => {
    shallow(<Posts appId="testApplicationId" />);
    expect(Utils.get.mock.calls.length).toBeGreaterThanOrEqual(1);
    expect(Utils.get).toHaveBeenCalledWith('/api/posts');
  });

  it('should GET the link to the page profile picture', () => {
    shallow(<Posts appId="testApplicationId" />);
    expect(Utils.get.mock.calls.length).toBeGreaterThanOrEqual(1);
    expect(Utils.get).toHaveBeenCalledWith('/api/picture');
  });

  it('should update the state after getting the posts and the picture', async () => {
    const wrapper = shallow(<Posts appId="testApplicationId" />);
    const state = wrapper.state();
    await wrapper.update();
    await wrapper.update();
    expect(state).not.toEqual(wrapper.state());
  });

  it('should update the state with the posts data', async () => {
    const data = [
      { id: '1', message: 'test message 1' },
      { id: '2', message: 'test message 2' },
      { id: '3', message: 'test message 3' },
    ];
    Utils.get = jest.fn((url) => {
      if (url === '/api/picture') {
        return new Promise(resolve => resolve({ location: 'http://picture.location' }));
      }

      return new Promise(resolve => resolve({ data, paging: { next: 'https://load.more' } }));
    });
    const wrapper = shallow(<Posts appId="testApplicationId" />);
    await wrapper.update();
    await wrapper.update();
    expect(wrapper.state().posts).toEqual(data);
  });

  it('should update the state with the picture location', async () => {
    const wrapper = shallow(<Posts appId="testApplicationId" />);
    await wrapper.update();
    await wrapper.update();
    expect(wrapper.state().picture).toBe('http://picture.location');
  });

  it('should update the state with the link to load more data if there is some posts', async () => {
    const wrapper = shallow(<Posts appId="testApplicationId" />);
    await wrapper.update();
    await wrapper.update();
    expect(wrapper.state().loadMore).toBe('https://load.more');
  });
  //
  it('should update the state without a link to load more data if there is no posts', async () => {
    Utils.get = jest.fn((url) => {
      if (url === '/api/picture') {
        return new Promise(resolve => resolve({ location: 'http://picture.location' }));
      }

      return new Promise(resolve => resolve({ data: [], paging: { next: 'https://load.more' } }));
    });
    const wrapper = shallow(<Posts appId="testApplicationId" />);
    await wrapper.update();
    await wrapper.update();
    expect(wrapper.state().loadMore).toBe('');
  });

  describe('after componentWillMount', () => {
    let wrapper;
    beforeEach(async () => {
      wrapper = shallow(<Posts appId="testApplicationId" />);
      await wrapper.update();
      await wrapper.update();
    });

    it('should GET the link to load more data on click', async () => {
      Utils.get = jest.fn().mockReturnValue(new Promise(resolve => resolve({ data: [] })));
      await wrapper.instance().handleClick()();
      expect(Utils.get.mock.calls.length).toBe(1);
      expect(Utils.get.mock.calls[0]).toEqual(['https://load.more']);
    });

    it('should update the state on click', async () => {
      const state = wrapper.state();
      Utils.get = jest.fn().mockReturnValue(new Promise(resolve => resolve({ data: [] })));
      await wrapper.instance().handleClick()();
      expect(state).not.toEqual(wrapper.state());
    });

    it('should update the state by concatenating the posts on click', async () => {
      const oldPosts = [{ id: '0', message: 'test message 0' }];
      wrapper.setState({ posts: oldPosts });
      const newPosts = [
        { id: '1', message: 'test message 1' },
        { id: '2', message: 'test message 2' },
        { id: '3', message: 'test message 3' },
      ];
      Utils.get = jest.fn().mockReturnValue(new Promise(resolve => resolve({
        data: newPosts,
        paging: { next: 'https://load.more' },
      })));
      await wrapper.instance().handleClick()();
      expect(wrapper.state().posts).toEqual([...oldPosts, ...newPosts]);
    });

    it('should update the state with the link to load more data if there is some posts on click', async () => {
      Utils.get = jest.fn().mockReturnValue(new Promise(resolve => resolve({
        data: [{}],
        paging: { next: 'https://new.load.more' },
      })));
      await wrapper.instance().handleClick()();
      expect(wrapper.state().loadMore).toBe('https://new.load.more');
    });

    it('should update the state without a link to load more data if there is no posts on click', async () => {
      Utils.get = jest.fn().mockReturnValue(new Promise(resolve => resolve({
        data: [],
        paging: { next: 'https://new.load.more' },
      })));
      await wrapper.instance().handleClick()();
      expect(wrapper.state().loadMore).toBe('');
    });

    it('should GET the list of posts on submit', async () => {
      Utils.get = jest.fn().mockReturnValue(new Promise(resolve => resolve({ data: [] })));
      await wrapper.instance().handleSubmit()();
      expect(Utils.get.mock.calls.length).toBe(1);
      expect(Utils.get.mock.calls[0]).toEqual(['/api/posts']);
    });

    it('should update the state on submit', async () => {
      const state = wrapper.state();
      Utils.get = jest.fn().mockReturnValue(new Promise(resolve => resolve({ data: [] })));
      await wrapper.instance().handleSubmit()();
      expect(state).not.toEqual(wrapper.state());
    });

    it('should update the state by replacing the posts on submit', async () => {
      wrapper.setState({ posts: [{ id: '0', message: 'test message 0' }] });
      const posts = [
        { id: '1', message: 'test message 1' },
        { id: '2', message: 'test message 2' },
        { id: '3', message: 'test message 3' },
      ];
      Utils.get = jest.fn().mockReturnValue(new Promise(resolve => resolve({
        data: posts,
        paging: { next: 'https://load.more' },
      })));
      await wrapper.instance().handleSubmit()();
      expect(wrapper.state().posts).toEqual(posts);
    });

    it('should update the state with the link to load more data if there is some posts on submit', async () => {
      Utils.get = jest.fn().mockReturnValue(new Promise(resolve => resolve({
        data: [{}],
        paging: { next: 'https://new.load.more' },
      })));
      await wrapper.instance().handleSubmit()();
      expect(wrapper.state().loadMore).toBe('https://new.load.more');
    });

    it('should update the state without a link to load more data if there is no posts on submit', async () => {
      Utils.get = jest.fn().mockReturnValue(new Promise(resolve => resolve({
        data: [],
        paging: { next: 'https://new.load.more' },
      })));
      await wrapper.instance().handleSubmit()();
      expect(wrapper.state().loadMore).toBe('');
    });

    it('should render an AddPost component', () => {
      expect(wrapper.find(AddPost).exists()).toBe(true);
    });

    it('should render a list of Post component', () => {
      const posts = [
        { id: '1', message: 'test message 1', created_time: '100' },
        { id: '2', message: 'test message 2', created_time: '101' },
        { id: '3', message: 'test message 3', created_time: '102' },
        { id: '4', message: 'test message 4', created_time: '103' },
      ];
      wrapper.setState({ posts, picture: 'http://picture.location' });
      expect(wrapper.containsMatchingElement(
        <ul>
          <Post appId="testApplicationId" post={posts[3]} picture="http://picture.location" />
          <Post appId="testApplicationId" post={posts[2]} picture="http://picture.location" />
          <Post appId="testApplicationId" post={posts[1]} picture="http://picture.location" />
          <Post appId="testApplicationId" post={posts[0]} picture="http://picture.location" />
        </ul>,
      )).toBe(true);
    });

    it('should filter out posts without messages in the list of posts', () => {
      const posts = [
        { id: '1', message: 'test message 1', created_time: '100' },
        { id: '2', message: '', created_time: '101' },
        { id: '3', created_time: '102' },
        { id: '4', message: 'test message 4', created_time: '103' },
      ];
      wrapper.setState({ posts, picture: 'http://picture.location' });
      expect(wrapper.containsMatchingElement(
        <ul>
          <Post appId="testApplicationId" post={posts[3]} picture="http://picture.location" />
          <Post appId="testApplicationId" post={posts[0]} picture="http://picture.location" />
        </ul>,
      )).toBe(true);
    });

    it('should order the posts in descending order from their creation time', () => {
      const posts = [
        { id: '1', message: 'test message 1', created_time: '110' },
        { id: '2', message: 'test message 2', created_time: '105' },
        { id: '3', message: 'test message 3', created_time: '110' },
        { id: '4', message: 'test message 4', created_time: '120' },
      ];
      wrapper.setState({ posts, picture: 'http://picture.location' });
      expect(wrapper.containsMatchingElement(
        <ul>
          <Post appId="testApplicationId" post={posts[3]} picture="http://picture.location" />
          <Post appId="testApplicationId" post={posts[0]} picture="http://picture.location" />
          <Post appId="testApplicationId" post={posts[2]} picture="http://picture.location" />
          <Post appId="testApplicationId" post={posts[1]} picture="http://picture.location" />
        </ul>,
      )).toBe(true);
    });

    it('should render a More Stories button if there is a link to load more posts', () => {
      wrapper.setState({ loadMore: 'https://load.more' });
      expect(wrapper.containsMatchingElement(<button>More Stories</button>)).toBe(true);
    });

    it('should not render a More Stories button if there is not a link to load more posts', () => {
      wrapper.setState({ loadMore: '' });
      expect(wrapper.containsMatchingElement(<button>More Stories</button>)).toBe(false);
    });
  });
});
