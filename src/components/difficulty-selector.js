import { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlexRow, Text } from 'ui/es';
import { updateDepth } from '~/store/actions';

const LEVELS = [
  { label: 'Easy', depth: 2 },
  { label: 'Normal', depth: 3 },
  { label: 'Hard', depth: 4 },
];

const DifficultySelector = memo(() => {
  const depth = useSelector(({ ai }) => ai.depth);
  const disabled = useSelector(({ ingame }) => ingame.past.length > 0);
  const dispatch = useDispatch();
  const onSelect = (d) => dispatch(updateDepth(d));

  return (
    <FlexRow
      paddingLeft={10}
      paddingRight={10}
      paddingTop={4}
      paddingBottom={4}
      gap={6}
      alignItems="center"
      fontSize="80%"
    >
      <Text flexShrink={0} marginRight={4}>
        Difficulty:
      </Text>

      <select
        value={depth}
        onChange={(e) => onSelect(Number(e.target.value))}
        disabled={disabled}
      >
        {LEVELS.map(({ label, depth: d }) => (
          <option key={d} value={d}>
            {label}
          </option>
        ))}
      </select>
    </FlexRow>
  );
});

DifficultySelector.displayName = 'DifficultySelector';

export { DifficultySelector };
