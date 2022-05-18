import { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import useMeasure from 'react-use-measure';
import { Flex, Absolute } from 'ui/es';
import { getPiece } from 'chess/es';

const Animate = animated(Absolute);

const Piece = ({ pKey, animate, pretendCode }) => {
  const [ref, { width }] = useMeasure();
  const [styles, api] = useSpring(() => ({ x: 0, y: 0 }));
  const PieceComponent = getPiece(pKey);

  // TODO remove afterimage
  useEffect(() => {
    if (pretendCode === animate.code) {
      const { x, y } = animate.from;

      api.start({
        from: {
          opacity: 0,
          x: width * x,
          y: width * y,
        },
        to: {
          opacity: 1,
          x: 0,
          y: 0,
        },
      });
    }
  }, [api, pKey, width, animate, pretendCode]);

  if (!pKey) {
    return '';
  }

  return (
    <Animate
      ref={ref}
      zIndex={999}
      top={0}
      bottom={0}
      left={0}
      right={0}
      style={styles}
    >
      <Flex width="100%" height="100%" justifyContent="center">
        <PieceComponent width="57%" />
      </Flex>
    </Animate>
  );
};

Piece.propTypes = {
  pKey: PropTypes.string.isRequired,
  pretendCode: PropTypes.string.isRequired,
  animate: PropTypes.shape({
    code: PropTypes.string,
    from: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  }).isRequired,
};

export default memo(Piece);
