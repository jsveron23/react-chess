import { memo } from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'ui/es';
import { getPiece } from 'chess/es';

const Piece = ({ pKey }) => {
  const Piece = getPiece(pKey);

  if (!pKey) {
    return '';
  }

  return (
    <Flex width="100%" height="100%" justifyContent="center">
      <Piece width="70%" />
    </Flex>
  );
};

Piece.propTypes = {
  pKey: PropTypes.string.isRequired,
};

export default memo(Piece);
