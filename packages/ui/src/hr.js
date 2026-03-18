import { Box } from './box';

const Hr = ({ color = '#cacaca', ...props }) => {
  return (
    <Box is="span" backgroundColor={color} width="100%" height={1} {...props} />
  );
};

export { Hr };
