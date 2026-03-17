import { Fragment } from 'react';
import { identity } from 'ramda';
import { FlexCol, Button } from 'ui/es';

const MenuItems = ({ data }) => {
  return (
    <FlexCol gap={10} alignItems="center">
      {data.map(
        ({ key, title, onClick = identity, children: Extra, ...itemProps }) => {
          return (
            <Fragment key={key}>
              <Button onClick={onClick} {...itemProps}>
                {title}
              </Button>

              {Extra && <Extra />}
            </Fragment>
          );
        }
      )}
    </FlexCol>
  );
};


export { MenuItems };
