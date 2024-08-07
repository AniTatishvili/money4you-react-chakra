import React from "react";

export const SidebarMenuPlaceholder = (props) => {
  const { name } = props;
  return (
    <div>
      This only placeholder for{" "}
      <b>
        <i>{name}</i>
      </b>{" "}
      tab.
    </div>
  );
};
