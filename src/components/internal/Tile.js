import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Opponent, detectDarkTile, parseCode } from 'chess/es';
import { Relative, Absolute, Text } from 'ui/es';
import useTheme from '~/styles/useTheme';
import Piece from './Piece';
import Mask from './Mask';

function detectEnemy(pKey, selectedCode, tileName, movableTiles) {
  const { piece, side } = parseCode(selectedCode);
  const enemySide = Opponent[side];

  const isExist = !!pKey && !!tileName;
  const isNotSameSide = side !== enemySide;
  const isNotPawn = !piece.startsWith('P');
  const isInMt = movableTiles.indexOf(tileName) > -1;

  return isExist && isNotSameSide && isNotPawn && isInMt;
}

const Tile = ({
  pKey,
  tileName,
  fileName,
  rankName,
  selectedCode,
  movableTiles,
  onClickTile,
}) => {
  const { tile } = useTheme();
  const isDark = detectDarkTile(fileName, rankName);

  // code or tileName(pKey can be empty if no piece on tile)
  const pretendCode = `${pKey}${tileName}`;

  // actual code will match with piece tile
  // tiles will match with empty tiles
  // enemy title in it, but it won't match it because it's tile (not code)
  const isInWay = [selectedCode, ...movableTiles].indexOf(pretendCode) > -1;

  const enemyTile =
    detectEnemy(pKey, selectedCode, tileName, movableTiles) && tileName;
  const isEnemyTile = enemyTile === tileName;

  const handleClickTile = useCallback(
    (/* evt */) => onClickTile(movableTiles, tileName, pretendCode),
    [pretendCode, tileName, movableTiles, onClickTile]
  );

  return (
    <Relative
      flex="1"
      backgroundColor={isDark ? tile.dark : tile.light}
      onClick={handleClickTile}
    >
      <Absolute color={tile.text}>
        <Text padding={5}>{tileName}</Text>
      </Absolute>

      <Piece pKey={pKey} />
      <Mask isInWay={isInWay} isEnemy={isEnemyTile} />
    </Relative>
  );
};

Tile.propTypes = {
  onClickTile: PropTypes.func.isRequired,
  tileName: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  rankName: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  movableTiles: PropTypes.arrayOf(PropTypes.string),
  selectedCode: PropTypes.string,
  pKey: PropTypes.string,
};

Tile.defaultProps = {
  pKey: '',
  selectedCode: '',
  movableTiles: [],
};

export default Tile;
