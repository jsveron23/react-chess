import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Text, FlexMiddle, FlexCol, FlexRow, Button } from 'ui/es';
import { startReplay } from '~/store/slices/replay';
import { deleteSavedGame } from '~/store/actions';
import { useTheme } from '~/hooks';

const GameHistoryDialog = ({ isOpen, onClose }) => {
  const { color, border, borderRadius } = useTheme();
  const savedGames = useSelector(({ replay }) => replay.savedGames);
  const dispatch = useDispatch();

  if (!isOpen) {
    return null;
  }

  const onReplay = (game) => {
    dispatch(startReplay(game));
    onClose();
  };

  const onDelete = (id) => dispatch(deleteSavedGame(id));

  return createPortal(
    <FlexMiddle
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      backgroundColor="rgba(0,0,0,0.65)"
      zIndex={1000}
      onClick={onClose}
      alignItems="center"
      justifyContent="center"
    >
      <Box
        backgroundColor={color.white}
        borderRadius={borderRadius}
        maxWidth={360}
        width="92%"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Header */}
        <Box
          padding="14px 16px 10px"
          borderBottom={border}
          position="sticky"
          top="0"
          backgroundColor={color.white}
          zIndex={1}
        >
          <FlexRow justifyContent="space-between" alignItems="center">
            <Text display="block" fontWeight="bold" fontSize={14}>
              Saved Games
            </Text>
            <Box
              onClick={onClose}
              cursor="pointer"
              padding="4px 8px"
              backgroundColor={color.gray1}
              borderRadius={4}
              style={{ flexShrink: 0 }}
            >
              <Text fontSize={13} color={color.gray4}>
                ✕
              </Text>
            </Box>
          </FlexRow>
        </Box>

        {/* Content */}
        <FlexCol padding="14px 16px" gap={8}>
          {savedGames.length === 0 ? (
            <Text fontSize={13} color={color.gray4}>
              No saved games yet.
            </Text>
          ) : (
            savedGames.map((game, idx) => (
              <FlexRow
                key={game.id}
                justifyContent="space-between"
                alignItems="center"
                padding="8px"
                borderBottom={border}
                gap={8}
              >
                <FlexRow
                  gap={8}
                  alignItems="center"
                  style={{ flex: 1, minWidth: 0 }}
                >
                  <Text
                    fontSize={12}
                    color={color.gray4}
                    style={{ flexShrink: 0 }}
                  >
                    {idx + 1}.
                  </Text>
                  <FlexCol gap={2}>
                    <Text fontSize={13} fontWeight="bold">
                      {game.winner === 'Draw' ? 'Draw' : `${game.winner} wins`}
                    </Text>
                    <Text fontSize={12} color={color.gray4}>
                      {new Date(game.date).toLocaleString()} · {game.matchType}
                    </Text>
                  </FlexCol>
                </FlexRow>
                <FlexRow gap={4} style={{ flexShrink: 0 }}>
                  <Button
                    width="auto"
                    paddingLeft={10}
                    paddingRight={10}
                    onClick={() => onReplay(game)}
                  >
                    Replay
                  </Button>
                  <Button
                    width="auto"
                    paddingLeft={8}
                    paddingRight={8}
                    onClick={() => onDelete(game.id)}
                  >
                    ✕
                  </Button>
                </FlexRow>
              </FlexRow>
            ))
          )}
        </FlexCol>
      </Box>
    </FlexMiddle>,
    document.body
  );
};

export { GameHistoryDialog };
