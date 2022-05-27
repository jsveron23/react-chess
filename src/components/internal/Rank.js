import { FlexRow } from 'ui/es';
import { Rank as Ranks } from 'chess/es';
import File from './File';

const Rank = () => {
  return Ranks.map((rankName) => {
    return (
      <FlexRow key={rankName} flex="1">
        <File rankName={rankName} />
      </FlexRow>
    );
  });
};

export default Rank;
