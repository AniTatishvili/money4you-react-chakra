import React from "react";

import { List, ListItem } from "@chakra-ui/react";
import s from "./tv.module.scss";

export const TvMenu = () => {
  return (
    <List className={s.tv_menu}>
      <ListItem className={s.tv_link}>
        <a href="https://money4you.financial/">Home</a>
      </ListItem>
      <ListItem className={s.tv_link}>
        <a href="https://money4you.financial/projects">Projects</a>
      </ListItem>
      <ListItem className={s.tv_link}>
        <a href="https://money4you.financial/about">About us</a>
      </ListItem>
      <ListItem className={s.tv_link}>
        <a href="https://money4you.financial/blog">Blog</a>
      </ListItem>
      <ListItem className={s.tv_link}>
        <a href="https://money4you.financial/shop">Shop</a>
      </ListItem>
      <ListItem className={s.tv_link}>
        <a href="https://money4you.financial/jobs">Jobs</a>
      </ListItem>
      <ListItem className={s.tv_link}>
        <a href="https://money4you.financial/press">Press</a>
      </ListItem>
      <ListItem className="jm-menu-link jm-menu-link-extended">
        <a href="https://imedix.money4you.financial">iMediX</a>
      </ListItem>
    </List>
  );
};
