import { memo } from 'react';
import PropTypes from 'prop-types';
import { reverse } from 'ramda';
import equal from 'fast-deep-equal/es6/react';
import Box from 'ui-box';
import { FlexRow, FlexOne, Text, Sticky } from 'ui/es';
import { useTheme } from '~/hooks';
import Notation from './internal/Notation';

const Sheet = ({ data }) => {
  const { border, color } = useTheme();

  return (
    <>
      <Sticky borderBottom={border} backgroundColor={color.white}>
        <FlexRow justifyContent="space-between">
          {['White', 'Black'].map((side) => {
            const reColor = color.reflect[side.toLowerCase()];

            return (
              <FlexOne
                key={side}
                textAlign="center"
                backgroundColor={reColor.bgColor}
                color={reColor.color}
                padding={5}
              >
                <Text fontWeight="bold">{side}</Text>
              </FlexOne>
            );
          })}
        </FlexRow>
      </Sticky>

      <Box>
        {reverse(data).map(({ white, black }, idx) => {
          return (
            <FlexRow
              key={idx}
              justifyContent="space-between"
              borderBottom={border}
            >
              <Notation sideData={white} />
              <Notation
                sideData={black}
                backgroundColor={color.black}
                color={color.white}
              />
            </FlexRow>
          );
        })}
      </Box>
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

Sheet.defaultProps = {
  data: [],
};

export default memo(Sheet, equal);
