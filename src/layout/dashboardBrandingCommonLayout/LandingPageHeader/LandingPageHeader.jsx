import { AuthenticationContext } from '@axa-fr/react-oidc-context';
import jwt_decode from 'jwt-decode';
import { DoctContainer, DoctButton } from '@doct-react/core';
import React, { useContext, useLayoutEffect, useState } from 'react';
import brandLogo from '../../../assets/icons/dashboard_header_logo.svg';
import './LandingPageHeader.scss';
import * as ROUTE from '../../../routes/constant';
import { DoctLoading } from '@doct-react/app';
import { appTokenState, setToken, useGetUserQuery, userSelector } from '../../../components';
import { Drawer, UserMenu } from '../../../shared/ui';
import { useDispatch, useSelector } from 'react-redux';
import DefaultProfilePicture from '../../../assets/images/topbar/default-profile_blue.svg';
import { Link } from 'react-router-dom';

const LandingPageHeader = () => {
  const dispatch = useDispatch();
  const appToken = useSelector(appTokenState);

  const context = useContext(AuthenticationContext);
  const { oidcUser, login, isLoading, logout } = context;
  const [isBusinessUser, setIsBusinessUser] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // const user = useSelector(userSelector);
  const { data: userData } = useGetUserQuery('', {
    skip: !appToken,
  });

  const handleAvatarClick = () => {
    setIsDrawerOpen(true);
  };

  useLayoutEffect(() => {
    if (!oidcUser?.access_token) return;
    const { tenantId, tenantType } = jwt_decode(oidcUser?.access_token);
    if (tenantId && tenantType) {
      window.location.pathname = `${ROUTE.DASHBOARD}`;
      setIsBusinessUser(true);
    } else {
      dispatch(setToken(oidcUser.access_token));
      setIsBusinessUser(false);
    }
  }, [oidcUser?.access_token]);

  function TextWithLoading() {
    return (
      <>
        Login
        <div className="white-color-svg d-flex ml-6px">
          <DoctLoading />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="header_container_dashboard">
        <DoctContainer>
          <div className="d-flex align-items-center justify-content-between">
            <Link to={`/`} className="d-flex header_logo">
              <img src={brandLogo} alt="logo" />
            </Link>

            <div className="d-flex align-items-center justify-content-around nav_container font-weight-medium">
              <Link
                to={`/`}
                className={`${
                  window.location.pathname == '/' ? 'active-link text-primary-500' : 'text-grey-500'
                }`}
              >
                Home
              </Link>
              {/* <span
                  className={`text-grey-500 ${
                    window.location.pathname == '/institute' ? 'active-link' : ''
                  }`}
                >
                  Institute
                </span> */}

              <Link
                to={`/create-an-event`}
                className={`mx-3 ${
                  window.location.pathname == '/create-an-event'
                    ? 'active-link text-primary-500 '
                    : 'text-grey-500'
                } nav-item-space`}
              >
                Events
              </Link>

              {/* <span
                  className={`text-grey-500 ${
                    window.location.pathname == '/recruiter' ? 'active-link' : ''
                  }`}
                >
                  Recruiter
                </span> */}
            </div>
            <div className="auth-area d-flex align-items-center">
              {!isBusinessUser ? (
                <>
                  <span
                    className="d-inline-flex ml-auto cursor-pointer"
                    onClick={handleAvatarClick}
                  >
                    <img src={DefaultProfilePicture} alt="user profile photo" />
                  </span>
                  <Drawer SetIsDrawerOpen={setIsDrawerOpen} isDrawerOpen={isDrawerOpen}>
                    <UserMenu user={userData} SetIsDrawerOpen={setIsDrawerOpen} logout={logout} />
                  </Drawer>
                </>
              ) : (
                <>
                  {/* <div className="d-flex align-items-center header_create_bussiness_account_text"> */}
                  <a
                    href={`${process.env.REACT_APP_ACCOUNT_APP_BUSINESS_LINK}`}
                    className="create_bussiness_account_title px-3 text-grey-800  font-weight-bold"
                  >
                    Create Account
                  </a>
                  {isLoading && (
                    <DoctButton
                      onButtonClickHandler={() => {
                        login(process.env.IDENTITY_ID);
                        const { tenantId, tenantType } = jwt_decode(oidcUser?.access_token);
                        if (tenantId && tenantType) {
                          setIsBusinessUser(true);
                        }
                      }}
                      text={<TextWithLoading />}
                      size="medium"
                    />
                  )}
                  {!isLoading && (
                    <DoctButton
                      onButtonClickHandler={() => {
                        login(process.env.IDENTITY_ID);
                        const { tenantId, tenantType } = jwt_decode(oidcUser?.access_token);
                        if (tenantId && tenantType) {
                          setIsBusinessUser(true);
                        }
                      }}
                      text={'Log in'}
                      icon="right"
                      iconPosition="right"
                      size="medium"
                    />
                  )}
                  {/* </div> */}
                </>
              )}
            </div>
          </div>
        </DoctContainer>
      </div>
    </>
  );
};

export default LandingPageHeader;
