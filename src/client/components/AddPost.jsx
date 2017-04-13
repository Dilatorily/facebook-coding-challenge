import React from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';

import { post } from '../utils';

const styles = {
  container: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderTop: '1px solid rgb(229, 230, 233)',
    borderRight: '1px solid rgb(223, 224, 228)',
    borderBottom: '1px solid rgb(208, 209, 213)',
    borderLeft: '1px solid rgb(223, 224, 228)',
    marginBottom: 12,
  },
  inputContainer: {
    padding: '12px 12px 0',
  },
  textarea: {
    border: 'none',
    margin: 0,
    padding: 0,
    outline: 'none',
    height: 50,
    width: '100%',
    resize: 'none',
    borderRadius: 4,
    fontSize: 24,
    fontWeight: 300,
  },
  controls: {
    height: 40,
    backgroundColor: '#f6f7f9',
    borderTop: '1px solid #dddfe2',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '0 12px',
  },
  button: {
    border: 'none',
    cursor: 'pointer',
    transition: '0.25s ease-in-out',
    borderRadius: 2,
    fontSize: 12,
    fontWeight: 600,
    height: 24,
    padding: '0 16px',
    outline: 'none',
  },
  unpublish: {
    marginRight: 10,
    color: '#4b4f56',
    backgroundColor: '#f6f7f9',
    border: '1px solid #ced0d4',
    ':hover': {
      backgroundColor: '#e9ebee',
    },
    ':active': {
      backgroundColor: '#dddfe2',
      border: '1px solid #bec2c9',
    },
  },
  publish: {
    backgroundColor: '#4267b2',
    color: 'white',
    ':hover': {
      backgroundColor: '#365899',
    },
    ':active': {
      backgroundColor: '#29487d',
    },
  },
};

class AddPost extends React.Component {
  state = { post: '' }

  handleSubmit = isPublished => () => {
    post('/api/posts', { post: this.state.post, isPublished }).then(() => {
      this.setState({ post: '' });
      this.props.onSubmit();
    });
  }

  handleChange = (event) => {
    this.setState({ post: event.target.value });
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.inputContainer}>
          <textarea
            style={styles.textarea}
            placeholder="What's on your mind?"
            value={this.state.post}
            onChange={this.handleChange}
          />
        </div>
        <div style={styles.controls}>
          <button
            key="unpublish"
            style={[styles.button, styles.unpublish]}
            onClick={this.handleSubmit(false)}
          >
            Unpublished Post
          </button>
          <button
            key="publish"
            style={[styles.button, styles.publish]}
            onClick={this.handleSubmit(true)}
          >
            Publish
          </button>
        </div>
      </div>
    );
  }
}

AddPost.propTypes = {
  onSubmit: PropTypes.func,
};

AddPost.defaultProps = {
  onSubmit: () => {},
};

export default Radium(AddPost);
