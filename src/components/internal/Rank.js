import PropTypes from 'prop-types';
import { FlexRow } from 'ui/es';
import { Rank as Ranks } from 'chess/es';
import File from './File';

const Rank = ({
  animate,
  checkCode,
  checkRoute,
  checkDefenders,
  getPKey,
  detectOTWByCode,
  detectEnemy,
  onClickTile,
  detectEnPassantTile,
}) => {
  return Ranks.map((rankName) => {
    return (
      <FlexRow key={rankName} flex="1">
        <File
          animate={animate}
          checkCode={checkCode}
          checkRoute={checkRoute}
          checkDefenders={checkDefenders}
          rankName={rankName}
          getPKey={getPKey}
          detectOTWByCode={detectOTWByCode}
          detectEnemy={detectEnemy}
          onClickTile={onClickTile}
          detectEnPassantTile={detectEnPassantTile}
        />
      </FlexRow>
    );
  });
};

Rank.propTypes = {
  getPKey: PropTypes.func.isRequired,
  detectOTWByCode: PropTypes.func.isRequired,
  detectEnemy: PropTypes.func.isRequired,
  detectEnPassantTile: PropTypes.func.isRequired,
  onClickTile: PropTypes.func.isRequired,
  animate: PropTypes.shape({
    code: PropTypes.string,
    from: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  }).isRequired,
  checkRoute: PropTypes.arrayOf(PropTypes.string),
  checkDefenders: PropTypes.arrayOf(PropTypes.string),
  checkCode: PropTypes.string,
};

Rank.defaultProps = {
  checkCode: '',
  checkRoute: [],
  checkDefenders: [],
};

export default Rank;
