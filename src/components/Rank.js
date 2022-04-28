import PropTypes from 'prop-types';
import { FlexRow } from 'ui/es';
import { Rank as Ranks } from 'chess/es';
import File from './File';

const Rank = ({ selectedCode, getTileBg, getPKey, updateSelectedCode }) => {
  return Ranks.map((rankName) => {
    return (
      <FlexRow key={rankName} flex="1">
        <File
          selectedCode={selectedCode}
          rankName={rankName}
          getTileBg={getTileBg}
          getPKey={getPKey}
          updateSelectedCode={updateSelectedCode}
        />
      </FlexRow>
    );
  });
};

Rank.propTypes = {
  getPKey: PropTypes.func.isRequired,
  updateSelectedCode: PropTypes.func.isRequired,
  selectedCode: PropTypes.func,
};

Rank.defaultProps = {
  selectedCode: '',
};

export default Rank;
