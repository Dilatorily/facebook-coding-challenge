import React from 'react';
import { shallow } from 'enzyme';

import Post from '../Post';

describe('<Post />', () => {
  it('should render the page profile picture', () => {
    const post = {
      appId: 'testApplicationId',
      picture: 'http://picture.url',
      post: {
        created_time: '2017-01-01T00:00:00+0000',
        id: 'testApplicationId_testPostId1',
        insights: { data: [{ values: [{ value: 10 }] }] },
        is_published: true,
        message: 'This is a test message.',
      },
    };
    const wrapper = shallow(<Post {...post} />);
    expect(wrapper.containsMatchingElement(<img src="http://picture.url" alt="Page Profile" />)).toBe(true);
  });

  it('should render a link to the page', () => {
    const post = {
      appId: 'testApplicationId',
      picture: 'http://picture.url',
      post: {
        created_time: '2017-01-01T00:00:00+0000',
        id: 'testApplicationId_testPostId1',
        insights: { data: [{ values: [{ value: 10 }] }] },
        is_published: true,
        message: 'This is a test message.',
      },
    };
    const wrapper = shallow(<Post {...post} />);
    expect(wrapper.containsMatchingElement(
      <a href="https://www.facebook.com/testApplicationId">
        <img src="http://picture.url" alt="Page Profile" />
      </a>,
    )).toBe(true);
  });

  it('should render a published post', () => {
    const post = {
      appId: 'testApplicationId',
      picture: 'http://picture.url',
      post: {
        created_time: '2017-01-01T00:00:00+0000',
        id: 'testApplicationId_testPostId1',
        insights: { data: [{ values: [{ value: 10 }] }] },
        is_published: true,
        message: 'This is a test message.',
      },
    };
    const wrapper = shallow(<Post {...post} />);
    expect(wrapper.containsMatchingElement(<a>Published Post</a>)).toBe(true);
  });

  it('should render an unpublished post', () => {
    const post = {
      appId: 'testApplicationId',
      picture: 'http://picture.url',
      post: {
        created_time: '2017-01-01T00:00:00+0000',
        id: 'testApplicationId_testPostId1',
        insights: { data: [{ values: [{ value: 10 }] }] },
        is_published: false,
        message: 'This is a test message.',
      },
    };
    const wrapper = shallow(<Post {...post} />);
    expect(wrapper.containsMatchingElement(<a>Unpublished Post</a>)).toBe(true);
  });

  it('should render a link to the post permanent link', () => {
    const post = {
      appId: 'testApplicationId',
      picture: 'http://picture.url',
      post: {
        created_time: '2017-01-01T00:00:00+0000',
        id: 'testApplicationId_testPostId1',
        insights: { data: [{ values: [{ value: 10 }] }] },
        is_published: true,
        message: 'This is a test message.',
      },
    };
    const wrapper = shallow(<Post {...post} />);
    expect(wrapper.containsMatchingElement(
      <a href="https://www.facebook.com/permalink.php?story_fbid=testPostId1&id=testApplicationId">
        Published Post
      </a>,
    )).toBe(true);
  });

  it('should render the number of persons that viewed the post', () => {
    const post = {
      appId: 'testApplicationId',
      picture: 'http://picture.url',
      post: {
        created_time: '2017-01-01T00:00:00+0000',
        id: 'testApplicationId_testPostId1',
        insights: { data: [{ values: [{ value: 10 }] }] },
        is_published: true,
        message: 'This is a test message.',
      },
    };
    const wrapper = shallow(<Post {...post} />);
    expect(wrapper.containsMatchingElement(
      <h5><a>Published Post</a> viewed by 10 persons.</h5>,
    )).toBe(true);
  });

  it('should render the post creation time', () => {
    const post = {
      appId: 'testApplicationId',
      picture: 'http://picture.url',
      post: {
        created_time: '2017-01-01T00:00:00+0000',
        id: 'testApplicationId_testPostId1',
        insights: { data: [{ values: [{ value: 10 }] }] },
        is_published: true,
        message: 'This is a test message.',
      },
    };
    const wrapper = shallow(<Post {...post} />);
    expect(wrapper.containsMatchingElement(
      <h6>Saturday, December 31st, 2016 at 07:00pm</h6>,
    )).toBe(true);
  });

  it('should render the post content', () => {
    const post = {
      appId: 'testApplicationId',
      picture: 'http://picture.url',
      post: {
        created_time: '2017-01-01T00:00:00+0000',
        id: 'testApplicationId_testPostId1',
        insights: { data: [{ values: [{ value: 10 }] }] },
        is_published: true,
        message: 'This is a test message.',
      },
    };
    const wrapper = shallow(<Post {...post} />);
    expect(wrapper.containsMatchingElement(
      /* eslint-disable react/no-danger */
      <div dangerouslySetInnerHTML={{ __html: 'This is a test message.' }} />,
      /* eslint-enable react/no-danger */
    )).toBe(true);
  });
});
