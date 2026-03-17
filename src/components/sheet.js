import { memo } from 'react';
import { reverse } from 'ramda';
import equal from 'fast-deep-equal/es6/react';
import { useTheme } from '~/hooks';
import { NotationHeader } from './sheet/notation-header';
import { NotationBody } from './sheet/notation-body';
import { Notation } from './sheet/notation';

const Sheet = memo(({ data }) => {
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
}, equal);


export { Sheet };
