import { reverse, compose, map, cond, always, T, identity } from 'ramda';
import { Rank as Ranks } from 'chess/es';
import { FlexRow, FlexOne } from 'ui/es';
import { useDiagram } from '~/hooks';
import File from './File';

const Rank = () => {
  const { flip } = useDiagram();

  return compose(
    map((rankName) => {
      return (
        <FlexOne is={FlexRow} key={rankName}>
          <File rankName={rankName} />
        </FlexOne>
      );
    }),
    cond([
      [always(flip), reverse],
      [T, identity],
    ])
  )(Ranks);
};

export default Rank;
