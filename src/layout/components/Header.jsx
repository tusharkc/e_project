import React, { useContext } from 'react';
import { DoctTopBar } from '@doct-react/app';
import { DoctContainer } from '@doct-react/core';
import brandLogo from '../../assets/icons/dashboard_header_logo.svg';
import DefaultProfilePicture from '../../assets/images/topbar/default-profile.png';
import { Drawer, UserMenu } from '../../shared/ui';
import { useSelector } from 'react-redux';
import { AuthenticationContext } from '@axa-fr/react-oidc-context';
import { userSelector } from '../../components';
import { Link } from 'react-router-dom';
import './Header.scss';
const LayoutTopBar = () => {
  const [isDrawerOpen, SetIsDrawerOpen] = React.useState(false);

  const context = useContext(AuthenticationContext);
  const { logout } = context;

  const user = useSelector(userSelector);

  const handleAvatarClick = () => {
    SetIsDrawerOpen(true);
  };

  return (
    <>
      <div className="business-top-bar business-top-bar-sticky">
        <DoctContainer>
          <div className="d-flex align-items-center">
            <img src={brandLogo} alt="logo" />
            <span
              className="business-top-bar-profile-photo-wrapper ml-auto cursor-pointer"
              onClick={handleAvatarClick}
            >
              <img src={DefaultProfilePicture} alt="user profile photo" />
            </span>
          </div>
        </DoctContainer>
      </div>
      <Drawer SetIsDrawerOpen={SetIsDrawerOpen} isDrawerOpen={isDrawerOpen}>
        <UserMenu user={user} SetIsDrawerOpen={SetIsDrawerOpen} logout={logout} />
      </Drawer>
    </>
  );
};
export default LayoutTopBar;
