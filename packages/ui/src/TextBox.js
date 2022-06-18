import { memo } from 'react';
import PropTypes from 'prop-types';
import { identity } from 'ramda';
import Box from 'ui-box';

const TextBox = ({ value, placeholder, onChange, onKeyDown, ...props }) => {
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

TextBox.defaultProps = {
  value: '',
  placeholder: '',
  onKeyDown: identity,
};

export default memo(TextBox);
