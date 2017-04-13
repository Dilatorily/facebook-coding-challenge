import React from 'react';

import AddPost from './AddPost';
import Post from './Post';
import { get } from '../utils';

const styles = {
  list: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
};

class Posts extends React.Component {
  state = {
    posts: [],
    picture: '',
  }

  componentWillMount() {
    Promise.all([
      get('/api/posts'),
      get('/api/picture'),
    ]).then(([posts, picture]) => {
      this.setState({ posts, picture: picture.location });
    });
  }

  handleSubmit = () => {
    get('/api/posts').then((posts) => {
      this.setState({ ...this.state, posts });
    });
  }

  render() {
    return (
      <div>
        <AddPost onSubmit={this.handleSubmit} />
        <ul style={styles.list}>
          {
            this.state.posts
              .filter(post => post.message)
              .sort((a, b) => {
                if (b.created_time < a.created_time) return -1;
                if (b.created_time > a.created_time) return 1;
                return 0;
              })
              .map(post => <Post key={post.id} post={post} picture={this.state.picture} />)
          }
        </ul>
      </div>
    );
  }
}

export default Posts;
