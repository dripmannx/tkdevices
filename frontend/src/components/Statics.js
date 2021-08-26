// With default styles
import React, { useState } from "react";
import SideNav, { MenuIcon } from "react-simple-sidenav";
const Statics = (props) => {
const [showNav, setShowNav] = useState();
const navItems = [
  <div className="navbar">
    <a href="/devices" class="active" href="/">
      <i className="fa fa-fw fa-mobile"></i>
    </a>
    <a href="/defect">
      <i className="fa fa-fw fa-exclamation"></i>
    </a>
    <a href="/handout">
      <i className="fa fa-fw fa-arrow-left"></i>
    </a>
    <a href="/admin">
      <i className="fa fa-fw fa-user"></i>
    </a>
    <a href="/logout">
      <i className="fa fa-fw fa-sign-out"></i>
    </a>
  </div>,
];
  return (
    <div>
      <MenuIcon onClick={() => setShowNav(true)} />
      <SideNav
        title={"Navigation"}
        showNav={showNav}
        onHideNav={() => setShowNav(false)}
        items={navItems}
        
        navStyle={{backgroundColor:"#424242"}}
        titleStyle={{ backgroundColor: "#2b2b2b" }}
        itemStyle={{ backgroundColor: "#2b2b2b", color: "#fff"}}
        itemHoverStyle={{ backgroundColor: "#2b2b2b" }}
      />
    </div>
  );
};
export default Statics