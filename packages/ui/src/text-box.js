import { memo } from 'react';
import { identity } from 'ramda';
import { Box } from './box';

const TextBox = memo(function TextBox({
  value = '',
  placeholder = '',
  onChange,
  onKeyDown = identity,
  ...props
}) {
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
});

export { TextBox };
