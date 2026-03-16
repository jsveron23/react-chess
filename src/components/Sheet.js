import { memo } from 'react';
import PropTypes from 'prop-types';
import { reverse } from 'ramda';
import equal from 'fast-deep-equal/es6/react';
import { useTheme } from '~/hooks';
import NotationHeader from './sheet/NotationHeader';
import NotationBody from './sheet/NotationBody';
import Notation from './sheet/Notation';

const Sheet = ({ data }) => {
  const { color } = useTheme();

  return (
    <>
      <NotationHeader data={['White', 'Black']} />
      <NotationBody data={reverse(data)}>
        {({ white, black }) => {
          return (
            <>
              <Notation sideData={white} />
              <Notation
                sideData={black}
                backgroundColor={color.black}
                color={color.white}
              />
            </>
          );
        }}
      </NotationBody>
    </>
  );
};

Sheet.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      white: PropTypes.shape({
        from: PropTypes.arrayOf(PropTypes.string),
        to: PropTypes.arrayOf(PropTypes.string),
        check: PropTypes.shape({
          attackerCode: PropTypes.string,
          defenders: PropTypes.arrayOf(PropTypes.string),
          defendTiles: PropTypes.arrayOf(PropTypes.string),
          dodgeableTiles: PropTypes.arrayOf(PropTypes.string),
        }),
      }),
      black: PropTypes.shape({
        from: PropTypes.arrayOf(PropTypes.string),
        to: PropTypes.arrayOf(PropTypes.string),
        check: PropTypes.shape({
          attackerCode: PropTypes.string,
          defenders: PropTypes.arrayOf(PropTypes.string),
          defendTiles: PropTypes.arrayOf(PropTypes.string),
          dodgeableTiles: PropTypes.arrayOf(PropTypes.string),
        }),
      }),
    })
  ),
};


export default memo(Sheet, equal);
