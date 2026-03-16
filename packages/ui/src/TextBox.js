import { memo } from 'react';
import PropTypes from 'prop-types';
import { identity } from 'ramda';
import Box from './Box';

const TextBox = ({ value = '', placeholder = '', onChange, onKeyDown = identity, ...props }) => {
  return (
    <Box
      is="input"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      {...props}
    />
  );
};

TextBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
};


export default memo(TextBox);
