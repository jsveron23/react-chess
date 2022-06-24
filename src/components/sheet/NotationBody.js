import PropTypes from 'prop-types';
import Box from 'ui-box';
import { FlexRow } from 'ui/es';
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

NotationBody.propTypes = {
  children: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      white: PropTypes.shape({
        from: PropTypes.arrayOf(PropTypes.string),
        to: PropTypes.arrayOf(PropTypes.string),
        check: PropTypes.shape({
          attackerCode: PropTypes.string,
          defenders: PropTypes.arrayOf(PropTypes.string),
          defendTiles: PropTypes.arrayOf(PropTypes.string),
          dodgeableTiles: PropTypes.arrayOf(PropTypes.string),
        }),
      }),
      black: PropTypes.shape({
        from: PropTypes.arrayOf(PropTypes.string),
        to: PropTypes.arrayOf(PropTypes.string),
        check: PropTypes.shape({
          attackerCode: PropTypes.string,
          defenders: PropTypes.arrayOf(PropTypes.string),
          defendTiles: PropTypes.arrayOf(PropTypes.string),
          dodgeableTiles: PropTypes.arrayOf(PropTypes.string),
        }),
      }),
    })
  ),
};

NotationBody.defaultProps = {
  sideData: null,
};

export default NotationBody;
