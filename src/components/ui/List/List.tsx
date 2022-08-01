/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { ElementType, Fragment, ComponentPropsWithoutRef } from 'react';

type Props<T, C extends ElementType> = {
  data: T[];
  renderItem: (item: T) => JSX.Element;
  keyExtractor: (item: T) => string;
  as?: C;
} & ComponentPropsWithoutRef<C>;

const List = <T, C extends ElementType = 'div'>({
  data,
  renderItem,
  keyExtractor,
  as,
  ...props
}: Props<T, C>) => {
  const Wrapper = as || 'div';

  return (
    <Wrapper {...props}>
      {data.map((item) => (
        <Fragment key={keyExtractor(item)}>{renderItem(item)}</Fragment>
      ))}
    </Wrapper>
  );
};

export default List;
