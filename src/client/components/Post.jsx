import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';

import { get, pluralize } from '../utils';

const styles = {
  container: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 12,
    borderTop: '1px solid rgb(229, 230, 233)',
    borderRight: '1px solid rgb(223, 224, 228)',
    borderBottom: '1px solid rgb(208, 209, 213)',
    borderLeft: '1px solid rgb(223, 224, 228)',
    marginBottom: 12,
  },
  header: {
    display: 'flex',
    marginBottom: 11,
  },
  picture: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  post: {
    margin: '2px 0 3px',
    fontSize: 14,
    fontWeight: 'normal',
    color: '#90949c',
  },
  published: {
    color: '#365899',
    fontWeight: 600,
  },
  time: {
    margin: 0,
    fontSize: 12,
    fontWeight: 'normal',
    color: '#90949c',
  },
  content: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#1d2129',
  },
};

class Post extends React.Component {
  state = { views: 0 }

  componentWillMount() {
    get(`/api/posts/${this.props.post.id}/views`).then((views) => {
      this.setState({ views: views[0].values[0].value });
    });
  }

  render() {
    const { picture, post } = this.props;

    const content = { __html: post.message.replace(/\n/g, '<br />') };
    return (
      <li style={styles.container}>
        <div style={styles.header}>
          <img style={styles.picture} src={picture} alt="Dilatorily Profile" />
          <div>
            <h5 style={styles.post}>
              <span style={styles.published}>{post.is_published ? 'Published' : 'Unpublished'} Post</span> viewed by {this.state.views} {pluralize('user', this.state.views)}.
            </h5>
            <h6 style={styles.time}>{format(post.created_time, 'dddd, MMMM Do, YYYY [at] hh:mma')}</h6>
          </div>
        </div>
        {/* eslint-disable react/no-danger */}
        <div style={styles.content} dangerouslySetInnerHTML={content} />
        {/* eslint-enable react/no-danger */}
      </li>
    );
  }
}

Post.propTypes = {
  picture: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Post;
