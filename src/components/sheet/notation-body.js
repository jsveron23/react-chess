import { Box, FlexRow } from 'ui/es';
import { useTheme } from '~/hooks';

const NotationBody = ({ data, children }) => {
  const { border } = useTheme();

  return (
    <Box>
      {data.map((item, idx) => {
        return (
          <FlexRow
            key={idx}
            justifyContent="space-between"
            borderBottom={border}
          >
            {children(item)}
          </FlexRow>
        );
      })}
    </Box>
  );
};

export { NotationBody };
