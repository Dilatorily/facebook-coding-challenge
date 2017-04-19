import React from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';
import format from 'date-fns/format';

import { pluralize } from '../utils';

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
  pictureLink: {
    height: 40,
    marginRight: 8,
  },
  picture: {
    width: 40,
    height: 40,
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
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
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

const Post = ({ picture, post }) => {
  const content = { __html: post.message.replace(/\n/g, '<br />') };
  const ids = post.id.split('_');
  return (
    <li style={styles.container}>
      <div style={styles.header}>
        <a style={styles.pictureLink} href="https://www.facebook.com/Dilatorily-515870255467883">
          <img style={styles.picture} src={picture} alt="Dilatorily Profile" />
        </a>
        <div>
          <h5 style={styles.post}>
            <a style={styles.published} href={`https://www.facebook.com/permalink.php?story_fbid=${ids[1]}&id=${ids[0]}`}>
              {post.is_published ? 'Published' : 'Unpublished'} Post
            </a> viewed by {post.insights.data[0].values[0].value} {pluralize('person', post.insights.data[0].values[0].value)}.
          </h5>
          <h6 style={styles.time}>{format(post.created_time, 'dddd, MMMM Do, YYYY [at] hh:mma')}</h6>
        </div>
      </div>
      {/* eslint-disable react/no-danger */}
      <div style={styles.content} dangerouslySetInnerHTML={content} />
      {/* eslint-enable react/no-danger */}
    </li>
  );
};

Post.propTypes = {
  picture: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Radium(Post);
