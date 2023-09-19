// import node module libraries
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

// impoort Auth module
import { useAuth } from 'components/AuthContext';
import { apiUtils } from 'components/utils/ApiUtils';
import { handleLogError } from 'components/utils/ErrorUtils';

// import sub components
import ManageVertical from './ManageVertical';
import HeaderDefault from './HeaderDefault';
import { isNotEmptyObj } from 'helper/utils';
import { loadCompetitionInfo, loadUser } from 'components/utils/LoadData';

const ManageIndex = (props) => {
  const { children, className, overflowHidden } = props;
  const [showMenu, setShowMenu] = useState(true);
  const ToggleMenu = () => {
    return setShowMenu(!showMenu);
  };

  const Auth = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { competition_id } = useParams();
  const [competitionInfo, setCompetitionInfo] = useState({});

  const navigate = useNavigate();
  function doLogOut() {
    Auth.userLogout();
    setIsLoggedIn(false);
    navigate('/');
    alert('로그아웃 완료');
  }

  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const isLoggedInChk = Auth.userIsAuthenticated();
    setIsLoggedIn(isLoggedInChk);

    // competitionInfo
    loadCompetitionInfo(competition_id).then((response) => {
      setCompetitionInfo(response);
    });

    if (isLoggedIn) {
      const user = Auth.getUser();
      loadUser(user).then((getData) => {
        setUserInfo(getData);
      });
    }
  }, []);

  // console.log(competitionInfo);
  if (isNotEmptyObj(competitionInfo)) {
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
              UserInfo={userInfo}
              isLoggedIn={isLoggedIn}
              doLogOut={doLogOut}
            />
          </div>
          <div className={`container-fluid ${className ? className : 'p-4'}`}>
            {children}
            <Outlet
              context={{
                isLoggedIn,
                Auth,
                competitionInfo,
                setCompetitionInfo,
              }}
            />
          </div>
        </section>
      </div>
    );
  }
};
export default ManageIndex;
