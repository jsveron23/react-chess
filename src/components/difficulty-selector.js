import { memo } from 'react';
import { FlexRow, Text } from 'ui/es';

const LEVELS = [
  { label: 'Easy', depth: 2 },
  { label: 'Normal', depth: 3 },
  { label: 'Hard', depth: 4 },
];

const DifficultySelector = memo(({ depth, onSelect }) => {
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
