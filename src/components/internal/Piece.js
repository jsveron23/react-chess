import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import useMeasure from 'react-use-measure';
import { Flex, Absolute } from 'ui/es';
import { getPiece } from 'chess/es';
import { useDiagram } from '~/hooks';

const Animate = animated(Absolute);

const Piece = ({ pKey, pretendCode }) => {
  const { animate } = useDiagram();
  const [ref, { width }] = useMeasure();
  const [styles, api] = useSpring(() => {
    let opacity = 1;

    // normally, opacity = 1, but when a piece moved
    // previous component will be removed from snapshot and creating a piece again on the tile,
    // so if targetCode is same as pretendCode, it means it will be animated piece
    // it will not remove afterimage effect but not perfectly
    if (animate.targetCode === pretendCode) {
      opacity = 0;
    }

    return { x: 0, y: 0, opacity };
  });
  const PieceComponent = getPiece(pKey);

  useEffect(() => {
    if (pretendCode === animate.targetCode) {
      const { x, y } = animate.from;

      api.start({
        from: {
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
};

export default Piece;
