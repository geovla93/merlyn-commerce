import { FC } from "react";

import MenuItem from "../MenuItem/MenuItem";
import { Section } from "../../types/models";

type Props = {
  sections: Section[];
};

const Directory: FC<Props> = ({ sections }) => {
  return (
    <div className="grid gap-2 lg:grid-cols-6">
      {sections.map((section) => (
        <MenuItem
          key={section._id}
          title={section.title}
          imageUrl={section.imageUrl}
          linkUrl={section.linkUrl}
          size={section.size}
        />
      ))}
    </div>
  );
};

export default Directory;
