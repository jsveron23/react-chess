import PropTypes from 'prop-types';
import Box from 'ui-box';
import { Rank as Ranks } from 'chess/es';
import File from './File';

const Rank = ({ snapshot }) => {
  return Ranks.map((rankName) => {
    return (
      <Box key={rankName} flex="1" display="flex" flexDirection="row">
        <File snapshot={snapshot} rankName={rankName} />
      </Box>
    );
  });
};

Rank.propTypes = {
  snapshot: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Rank;
