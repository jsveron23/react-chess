import { FlexRow } from 'ui/es';
import { reverse } from 'ramda';
import { Rank as Ranks } from 'chess/es';
import { useDiagram } from '~/hooks';
import File from './File';

const Rank = () => {
  const { flip } = useDiagram();
  const rankList = flip ? reverse(Ranks) : Ranks;

  return rankList.map((rankName) => {
    return (
      <FlexRow key={rankName} flex="1">
        <File rankName={rankName} />
      </FlexRow>
    );
  });
};

export default Rank;
