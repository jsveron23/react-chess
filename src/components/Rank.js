import PropTypes from 'prop-types';
import { FlexRow } from 'ui/es';
import { Rank as Ranks } from 'chess/es';
import File from './File';

const Rank = ({ getTileBg, getPKey }) => {
  return Ranks.map((rankName) => {
    return (
      <FlexRow key={rankName} flex="1">
        <File rankName={rankName} getTileBg={getTileBg} getPKey={getPKey} />
      </FlexRow>
    );
  });
};

Rank.propTypes = {
  getPKey: PropTypes.func.isRequired,
};

export default Rank;
