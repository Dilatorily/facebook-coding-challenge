import React from 'react';
import PropTypes from 'prop-types';

import AddPost from './AddPost';
import Post from './Post';
import { get } from '../utils';

const styles = {
  list: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
  button: {
    width: '100%',
    color: '#90949c',
    fontSize: 16,
    backgroundColor: 'white',
    borderRadius: 4,
    padding: '14px 28px',
    borderTop: '1px solid rgb(229, 230, 233)',
    borderRight: '1px solid rgb(223, 224, 228)',
    borderBottom: '1px solid rgb(208, 209, 213)',
    borderLeft: '1px solid rgb(223, 224, 228)',
    marginBottom: 12,
    textAlign: 'left',
    outline: 'none',
    cursor: 'pointer',
  },
};

class Posts extends React.PureComponent {
  state = {
    posts: [],
    picture: '',
    loadMore: '',
  }

  async componentWillMount() {
    const [posts, picture] = await Promise.all([
      get('/api/posts'),
      get('/api/picture'),
    ]);
    this.setState({
      posts: posts.data,
      picture: picture.location,
      loadMore: posts.data.length > 0 ? posts.paging.next : '',
    });
  }

  handleClick = () => async () => {
    const posts = await get(this.state.loadMore);
    this.setState({
      ...this.state,
      posts: [...this.state.posts, ...posts.data],
      loadMore: posts.data.length > 0 ? posts.paging.next : '',
    });
  };

  handleSubmit = () => async () => {
    const posts = await get('/api/posts');
    this.setState({
      ...this.state,
      posts: posts.data,
      loadMore: posts.data.length > 0 ? posts.paging.next : '',
    });
  }

  render() {
    return (
      <div>
        <AddPost onSubmit={this.handleSubmit()} />
        <ul style={styles.list}>
          {
            this.state.posts
              .filter(post => post.message)
              .sort((a, b) => {
                if (b.created_time < a.created_time) return -1;
                if (b.created_time > a.created_time) return 1;
                return 0;
              })
              .map(post => <Post
                key={post.id}
                appId={this.props.appId}
                post={post}
                picture={this.state.picture}
              />)
          }
        </ul>
        {
          this.state.loadMore && <button style={styles.button} onClick={this.handleClick()}>
            More Stories
          </button>
        }
      </div>
    );
  }
}

Posts.propTypes = {
  appId: PropTypes.string.isRequired,
};

export default Posts;
