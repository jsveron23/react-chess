import React from 'react';
// import PropTypes from 'prop-types';
import FlexCol from '../layout/FlexCol';
import Button from '../layout/Button';

const Menu = () => {
  return (
    <FlexCol gap={10} alignItems="center">
      <Button>1 vs 1</Button>
      <Button disabled>1 vs CPU</Button>
      <Button disabled>Import</Button>
      <Button disabled>Export</Button>
      <Button disabled>Observe</Button>
      <Button disabled>Online</Button>
    </FlexCol>
  );
};

Menu.propTypes = {};

export default Menu;
