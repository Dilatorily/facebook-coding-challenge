import React from 'react';
import { shallow } from 'enzyme';

import AddPost from '../AddPost';
import * as Utils from '../../utils';

describe('<AddPost />', () => {
  beforeEach(() => {
    Utils.post = jest.fn().mockReturnValue(new Promise(resolve => resolve(true)));
  });

  it('should not submit an empty post', async () => {
    const wrapper = shallow(<AddPost />);
    await wrapper.instance().handleSubmit()();
    expect(Utils.post.mock.calls.length).toBe(0);
  });

  it('should not submit a post with only whitespaces', async () => {
    const wrapper = shallow(<AddPost />);
    wrapper.setState({ post: '  \n  \t  ' });
    await wrapper.instance().handleSubmit()();
    expect(Utils.post.mock.calls.length).toBe(0);
  });

  it('should make a POST API call on submit', async () => {
    const wrapper = shallow(<AddPost />);
    wrapper.setState({ post: 'test post' });
    await wrapper.instance().handleSubmit()();
    expect(Utils.post.mock.calls.length).toBe(1);
    expect(Utils.post.mock.calls[0]).toEqual(['/api/posts', { post: 'test post' }]);
  });

  it('should pass a whitespace trimmed version of the post in the POST API call on submit', async () => {
    const wrapper = shallow(<AddPost />);
    wrapper.setState({ post: 'test post  ' });
    await wrapper.instance().handleSubmit()();
    expect(Utils.post.mock.calls.length).toBe(1);
    expect(Utils.post.mock.calls[0]).toEqual(['/api/posts', { post: 'test post' }]);
  });

  it('should pass the published status in the POST API call on submit', async () => {
    const wrapper = shallow(<AddPost />);
    wrapper.setState({ post: 'test post' });
    await wrapper.instance().handleSubmit(true)();
    expect(Utils.post.mock.calls.length).toBe(1);
    expect(Utils.post.mock.calls[0]).toEqual(['/api/posts', { post: 'test post', isPublished: true }]);
  });

  it('should pass the unpublished status in the POST API call on submit', async () => {
    const wrapper = shallow(<AddPost />);
    wrapper.setState({ post: 'test post' });
    await wrapper.instance().handleSubmit(false)();
    expect(Utils.post.mock.calls.length).toBe(1);
    expect(Utils.post.mock.calls[0]).toEqual(['/api/posts', { post: 'test post', isPublished: false }]);
  });

  it('should clear the state on submit', async () => {
    const wrapper = shallow(<AddPost />);
    wrapper.setState({ post: 'test post' });
    await wrapper.instance().handleSubmit()();
    expect(wrapper.state().post).toBe('');
  });

  it('should call the onSubmit callback on submit', async () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<AddPost onSubmit={onSubmit} />);
    wrapper.setState({ post: 'test post' });
    await wrapper.instance().handleSubmit()();
    expect(onSubmit.mock.calls.length).toBe(1);
    expect(onSubmit.mock.calls[0]).toEqual([]);
  });

  it('should update the state on change', () => {
    const event = { target: { value: 'updated post' } };
    const wrapper = shallow(<AddPost />);
    wrapper.setState({ post: 'test post' });
    wrapper.instance().handleChange(event);
    expect(wrapper.state().post).toBe('updated post');
  });

  it('should render a textarea with a placeholder', () => {
    const wrapper = shallow(<AddPost />);
    expect(wrapper.containsMatchingElement(<textarea placeholder="What's on your mind?" />)).toBe(true);
  });

  it('should render an unpublish button', () => {
    const wrapper = shallow(<AddPost />);
    expect(wrapper.containsMatchingElement(<button>Unpublished Post</button>)).toBe(true);
  });

  it('should render a publish button', () => {
    const wrapper = shallow(<AddPost />);
    expect(wrapper.containsMatchingElement(<button>Publish</button>)).toBe(true);
  });
});
