import { useEffect, useState } from "react";
import {
  Button,
  MenuIcon,
  Form,
  SearchIcon,
  Menu,
  Popup,
  Grid, List, Text, Tree
} from "@fluentui/react-northstar";

import { menuItemData } from "./constants/menuItemData";
import Nav from './Nav';
import NestedList from "./NestedList";
import { ChildMenu } from "./SubMenu";
import { v4 as uuid } from 'uuid';
import '../styles.css'
export interface MenuItem {
  key: string;
  content: string;
  on: string;
  menu: MenuItem[] | null
}
const items:any = [
  {
    index: 0,
    key: 'submenuitem1',
    content: 'Sub Menu Item 1',
  },
  {
    index: 1,
    key: 'submenuitem2',
    content: 'Sub Menu Item 2',
  },
  {
    index: 2,
    key: 'submenuitem3',
    content: 'Sub Menu Item 3',
    menu: {
      items: [
        { key: 'company', content: 'Company' },
        { key: 'team', content: 'Team' },
        { key: 'mission', content: 'Mission' },
      ],
    },
  },
];

export default function Setting() {
  const [menuData, setMenuData] = useState<any[]>(menuItemData);
  const [menu, setMenu] = useState<any[]>([]);
  const [enteredItem, setEnteredItem] =
    useState<string>("");
    const [selectedAddEntryMenuItem, setSelectedAddEntryMenuItem] =
    useState<MenuItem | null>(null);
    useEffect(() => {
      const menuBars = JSON.parse(localStorage.getItem("menuItems") || "[]");
      if (menuBars.length === 0) {
        localStorage.setItem("menuItems", JSON.stringify(menuData));
        const menuBars = JSON.parse(localStorage.getItem("menuItems") || "[]");
        setMenu(menuBars);
        setMenuData(menuBars);
      } else {
        setMenu(menuBars);
        setMenuData(menuBars);
      }
    }, []);

    const addEnteredMenuItem = () => {
      let menuObj = {
        key: uuid(),
        content: enteredItem,
        menu: [],
        on: "hover",
      };
      selectedAddEntryMenuItem?.menu

      if (selectedAddEntryMenuItem?.menu) {
        selectedAddEntryMenuItem?.menu.push(menuObj);
        setMenuData([...menuData]);
      } else {
        setMenuData([...menuData, menuObj]);
      }
      setSelectedAddEntryMenuItem(null);
    };
    const saveEnteredMenuItems = () => {
      localStorage.setItem("menuItems", JSON.stringify(menuData));
      const menuBars = JSON.parse(localStorage.getItem("menuItems") || "[]");
      console.log(menuBars);
      setMenu(menuBars);
      setMenuData(menuBars);
    }
    const MenuItem = () => {
      return menuData.length > 0
        ? menuData.map((item:MenuItem, i:number) => {
            return (
              <li  
              key={i + 1} 
              style={{listStyle:'none'}} 
              onClick={() => {
                alert("add");
                setSelectedAddEntryMenuItem(item);
              }}
              >
                <h4>
                  <span className="listName">{i + 1}</span> {item.content}
                </h4>
                {item.menu && <NestedList item={item.menu} />}
                {item.menu && <ul className="addEntryList">
                      {item.menu.map((menu, idx) => {
                        return (
                          <ChildMenu
                            key={idx + menu.key}
                            onSelectMenuItem={(item) =>{
                              setSelectedAddEntryMenuItem(item);
                            }
                            }
                            selectedKey={menu.key}
                            item={menu}
                          />
                        );
                      })}
                    </ul>
        }
              </li>
            );
          })
        : "";
    };
  return (
    <>
      <Nav />
      <Grid className="Setting-Content" columns="20% 80%" styles={{ gridGap: '10px', width: "100%", marginLeft: 'auto', marginRight: 'auto' }}>
        <div className="settingSidebar">
          <div className="settingSidebar-heading">
            <Text className="Text" content={`Settings`} />
          </div>
          <ul className="settingSidebar-menu">{MenuItem()}</ul>
        </div>
        <div className="Content">
        <Grid columns="1fr" styles={{ gridGap: '10px', marginLeft:'auto', marginRight:'auto' }}>
           <Text className="Text" content={`Configure Navigation`} />
           <Text style={{font:'12px 300', marginLeft: '1rem'}} content={`The Mega Menu can be configured here`} />
           <Text className="Text" content={`Add Navigation`} />
           <Text style={{font:'12px 300', marginLeft: '1rem'}} content={`The Mega Menu can be configured here`} />
           
           <Grid columns="10% 50% 40%" styles={{ gridGap: '10px', marginLeft:'auto', marginRight:'auto' }}>
           <Button
                        content="+ Add entry"
                        className="btnPurple"
                        onClick={addEnteredMenuItem}
                      />
                      <input
                          type="text"
                          value={enteredItem}
                          onChange={(event) => {
                            setEnteredItem(event.target.value);
                          }}
                        />
           </Grid>
           <ul className="addEntryList">
                      {menuData.map((menu, idx) => {
                        return (
                          <ChildMenu
                            key={idx + menu.key}
                            onSelectMenuItem={(item) =>{
                              setSelectedAddEntryMenuItem(item);
                            }
                            }
                            selectedKey={menu.key}
                            item={menu}
                          />
                        );
                      })}
                    </ul>

                    <Button
                        content="+ Save"
                        className="btnPurple"
                        onClick={saveEnteredMenuItems}
                      />
        </Grid>
        </div>     
      </Grid>
    </>
  );
}
