import PropTypes from 'prop-types';
import { FlexRow } from 'ui/es';
import { Rank as Ranks } from 'chess/es';
import File from './File';

const Rank = ({ getPKey, detectOTWByCode, detectEnemy, onClickTile }) => {
  return Ranks.map((rankName) => {
    return (
      <FlexRow key={rankName} flex="1">
        <File
          rankName={rankName}
          getPKey={getPKey}
          detectOTWByCode={detectOTWByCode}
          detectEnemy={detectEnemy}
          onClickTile={onClickTile}
        />
      </FlexRow>
    );
  });
};

Rank.propTypes = {
  getPKey: PropTypes.func.isRequired,
  detectOTWByCode: PropTypes.func.isRequired,
  detectEnemy: PropTypes.func.isRequired,
  onClickTile: PropTypes.func.isRequired,
};

export default Rank;
