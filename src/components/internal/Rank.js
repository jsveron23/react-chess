import PropTypes from 'prop-types';
import { FlexRow } from 'ui/es';
import { Rank as Ranks } from 'chess/es';
import File from './File';

const Rank = ({ selectedCode, movableTiles, getPKey, onClickTile }) => {
  return Ranks.map((rankName) => {
    return (
      <FlexRow key={rankName} flex="1">
        <File
          selectedCode={selectedCode}
          rankName={rankName}
          getPKey={getPKey}
          onClickTile={onClickTile}
          movableTiles={movableTiles}
        />
      </FlexRow>
    );
  });
};

Rank.propTypes = {
  getPKey: PropTypes.func.isRequired,
  onClickTile: PropTypes.func.isRequired,
  movableTiles: PropTypes.arrayOf(PropTypes.string),
  selectedCode: PropTypes.string,
};

Rank.defaultProps = {
  selectedCode: '',
  movableTiles: [],
};

export default Rank;
