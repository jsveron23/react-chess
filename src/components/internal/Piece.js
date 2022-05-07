import { memo } from 'react';
import PropTypes from 'prop-types';
import { Flex, Absolute } from 'ui/es';
import { getPiece } from 'chess/es';

const Piece = ({ pKey }) => {
  const Piece = getPiece(pKey);

  if (!pKey) {
    return '';
  }

  return (
    <Absolute zIndex={999} top={0} bottom={0} left={0} right={0}>
      <Flex width="100%" height="100%" justifyContent="center">
        <Piece width="57%" />
      </Flex>
    </Absolute>
  );
};

Piece.propTypes = {
  pKey: PropTypes.string.isRequired,
};

export default memo(Piece);
