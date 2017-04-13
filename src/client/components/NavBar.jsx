import React from 'react';
import Radium from 'radium';

import icon from '../assets/icon.png';

const styles = {
  background: {
    backgroundColor: '#3b5998',
    borderBottom: '1px solid #29487d',
    height: 42,
  },
  container: {
    maxWidth: 1217,
    margin: '0 auto',
    padding: '9px 0px',
    boxSizing: 'border-box',
    '@media only screen and (max-width: 1233px)': {
      margin: 0,
      padding: '9px 8px',
    },
  },
  icon: {
    backgroundImage: `url(${icon})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '26px 772px',
    backgroundPosition: '0 -13px',
    display: 'inline-block',
    height: 24,
    width: 24,
  },
};

const NavBar = () => (
  <div style={styles.background}>
    <div style={styles.container}>
      <a href="https://www.facebook.com/Dilatorily-515870255467883">
        <span style={styles.icon} />
      </a>
    </div>
  </div>
);

export default Radium(NavBar);
