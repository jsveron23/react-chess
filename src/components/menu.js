import { useState } from 'react';
import { Hr, FlexCol, FlexRow, Text, Button } from 'ui/es';
import { ONE_VS_CPU, ONE_VS_ONE } from '~/presets';
import { MenuItems } from './menu/menu-items';
import { HintDialog } from './hint-dialog';

const Menu = ({
  ingameMenu,
  mainMenu,
  matchType,
  onGameModeChange,
  cpuChildren: CpuChildren,
  onStart,
  onReset,
  hintEnabled,
  hintData,
  hintLoading,
  depth,
  onHint,
}) => {
  const [hintOpen, setHintOpen] = useState(false);

  return (
    <>
      <MenuItems data={ingameMenu} />
      <Hr is="p" marginTop={10} marginBottom={10} />
      <FlexCol gap={10} alignItems="center">
        <FlexRow
          paddingLeft={10}
          paddingRight={10}
          gap={6}
          alignItems="center"
          fontSize="80%"
        >
          <Text flexShrink={0} marginRight={4}>
            Mode:
          </Text>
          <select
            value={matchType}
            onChange={(e) => onGameModeChange(e.target.value)}
          >
            <option value="1v1">1 vs 1</option>
            <option value="1vscpu">1 vs CPU</option>
          </select>
        </FlexRow>
        {matchType === ONE_VS_CPU && CpuChildren && <CpuChildren />}
        {matchType === ONE_VS_CPU && <Button onClick={onStart}>Start</Button>}
        {matchType === ONE_VS_CPU && (
          <Button
            disabled={!hintEnabled}
            onClick={() => {
              onHint();
              setHintOpen(true);
            }}
          >
            Hint
          </Button>
        )}
        {matchType === ONE_VS_ONE && <Button onClick={onReset}>Reset</Button>}
      </FlexCol>
      <Hr is="p" marginTop={10} marginBottom={10} />
      <MenuItems data={mainMenu} />
      <HintDialog
        isOpen={hintOpen}
        onClose={() => setHintOpen(false)}
        hintData={hintData}
        loading={hintLoading}
        depth={depth}
      />
    </>
  );
};

export { Menu };
