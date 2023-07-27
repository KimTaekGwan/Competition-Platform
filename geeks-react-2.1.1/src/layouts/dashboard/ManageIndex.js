// import node module libraries
import React, { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';

// import sub components
import ManageVertical from './ManageVertical';
import HeaderDefault from './HeaderDefault';

const ManageIndex = (props) => {
  const { children, className, overflowHidden } = props;
  const [showMenu, setShowMenu] = useState(true);
  const ToggleMenu = () => {
    return setShowMenu(!showMenu);
  };

  return (
    <div
      id="db-wrapper"
      className={`${overflowHidden ? 'chat-layout' : ''} ${
        showMenu ? '' : 'toggled'
      }`}
    >
      <div className="navbar-vertical navbar">
        <ManageVertical
          showMenu={showMenu}
          onClick={(value) => setShowMenu(value)}
        />
      </div>
      <section id="page-content">
        <div className="header">
          <HeaderDefault
            data={{
              showMenu: showMenu,
              SidebarToggleMenu: ToggleMenu,
            }}
          />
        </div>
        <div className={`container-fluid ${className ? className : 'p-4'}`}>
          {children}
          <Outlet />
        </div>
      </section>
    </div>
  );
};
export default ManageIndex;
