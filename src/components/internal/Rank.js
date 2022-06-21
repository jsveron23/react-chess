import { FlexRow } from 'ui/es';
import { reverse, compose, map, cond, always, T, identity } from 'ramda';
import { Rank as Ranks } from 'chess/es';
import { useDiagram } from '~/hooks';
import File from './File';

const Rank = () => {
  const { flip } = useDiagram();

  return compose(
    map((rankName) => {
      return (
        <FlexRow key={rankName} flex="1">
          <File rankName={rankName} />
        </FlexRow>
      );
    }),
    cond([
      [always(flip), reverse],
      [T, identity],
    ])
  )(Ranks);
};

export default Rank;
