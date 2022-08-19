import { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { AuthenticationContext } from '@axa-fr/react-oidc-context';
import { useSelector, useDispatch } from 'react-redux';

import { DoctPageLoading } from '@doct-react/app';

import { appTokenState, setToken, setUser, useGetUserQuery } from '../components/App';
import applyAxiosConfig from '../helper/axiosConfig';

export default function AuthWrapper({ children }) {
  const dispatch = useDispatch();
  const appToken = useSelector(appTokenState);

  const [appLoading, setAppLoading] = useState(true);
  const [oidcLoadingStart, setOidcLoadingStart] = useState(false);

  const context = useContext(AuthenticationContext);
  const { oidcUser, isLoading, login } = context;

  const [isSetTokenToState, setIsSetTokenToState] = useState(false);
  const { data: userData } = useGetUserQuery('', {
    skip: !isSetTokenToState,
  });

  const navigateToBranding = useCallback(() => {
    window.location.href = process.env.REACT_APP_DOCTHUB_WEB_APP_LINK;
  }, []);

  useLayoutEffect(() => {
    login(process.env.IDENTITY_ID);
  }, []);

  useLayoutEffect(() => {
    if (isLoading) {
      // when getting oidc user start
      // initially it is false so listen while it's become true
      // when it's return false checking user is completed
      // when it's start loading we can store this state to component and waiting for being false
      setOidcLoadingStart(true);
    }
  }, [isLoading]);

  useLayoutEffect(() => {
    if (oidcLoadingStart) {
      if (!oidcUser?.access_token && !isLoading) {
        // when user related checking start we are listing here
        // when user related checking complete then isLoading will be false
        // when isLoading is become false after start checking for user, oidc user will returned
        // if oidc user null so it's not holding access token
        // it will redirect to branding page
        navigateToBranding();
      }
    }
  }, [oidcLoadingStart, isLoading]);

  useLayoutEffect(() => {
    if (!oidcUser?.access_token) return;
    const { tenantId, tenantType } = jwt_decode(oidcUser?.access_token);
    if (!tenantId && !tenantType) {
      // non enterprise user - redirect to branding page
      navigateToBranding();
      return;
    }
    applyAxiosConfig(oidcUser.access_token);
    dispatch(setToken(oidcUser.access_token));
  }, [oidcUser?.access_token]);

  useEffect(() => {
    if (!oidcUser?.access_token) return;
    if (!appToken) return;
    setIsSetTokenToState(true);
    setAppLoading(false);
  }, [oidcUser?.access_token, appToken]);

  useEffect(() => {
    if (!userData) return;
    dispatch(setUser(userData));
  }, [userData]);

  if (appLoading) {
    return <DoctPageLoading />;
  }

  return children;
}
