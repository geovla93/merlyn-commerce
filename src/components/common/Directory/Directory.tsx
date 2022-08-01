import { FC } from 'react';
import { Section } from '@prisma/client';

import MenuItem from '../MenuItem';
import List from '@/components/ui/List';

type Props = {
  sections: Section[];
};

const Directory: FC<Props> = ({ sections }) => {
  return (
    <List
      data={sections}
      keyExtractor={(item) => item.id}
      renderItem={(item) => (
        <MenuItem
          title={item.title}
          image={item.image}
          slug={item.slug}
          size={item.size}
        />
      )}
      className="grid gap-2 lg:grid-cols-6"
    />
  );
};

export default Directory;
