import { Fragment } from 'react';
import { identity } from 'ramda';
import { FlexCol, FlexRow, Button } from 'ui/es';

const MenuItems = ({ data }) => {
  return (
    <FlexCol gap={10} alignItems="center">
      {data.map((entry) => {
        if (Array.isArray(entry)) {
          return (
            <FlexRow
              key={entry.map((e) => e.key).join('-')}
              gap={10}
              width="100%"
            >
              {entry.map(
                ({
                  key,
                  title,
                  onClick = identity,
                  children: Extra,
                  ...itemProps
                }) => (
                  <Fragment key={key}>
                    <Button
                      onClick={onClick}
                      style={{ flex: 1 }}
                      {...itemProps}
                    >
                      {title}
                    </Button>
                    {Extra && <Extra />}
                  </Fragment>
                )
              )}
            </FlexRow>
          );
        }

        const {
          key,
          title,
          onClick = identity,
          children: Extra,
          ...itemProps
        } = entry;

        
return (
          <Fragment key={key}>
            <Button onClick={onClick} {...itemProps}>
              {title}
            </Button>
            {Extra && <Extra />}
          </Fragment>
        );
      })}
    </FlexCol>
  );
};

export { MenuItems };
