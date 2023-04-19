import { ComposeIcon } from '@fluentui/react-northstar';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
export interface MenuItem {
    key: string;
    content: string;
    on: string;
    menu: MenuItem[] | null
  }
  
  interface ChildMenuProps {
    item: MenuItem[];
    icon?: any;
    selectedKey?: string
    onSelectMenuItem?: (key: string) => void
  }  
const NestedList: FC<ChildMenuProps> = ({item }) => (
  <ul>
    {item.map((item:MenuItem, index:number) => (
      <li style={{lineHeight:'2', listStyle:'none'}} key={index}>
        <Link to={""}><ComposeIcon />
        {item.content}</Link>
        {item.menu && <NestedList item={item.menu} />}
      </li>
    ))}
  </ul>
);

export default NestedList;
