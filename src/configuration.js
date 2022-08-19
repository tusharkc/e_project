const configuration = {
  client_id: process.env.REACT_APP_IDENTITY_CLIENT_ID,
  client_secret: process.env.REACT_APP_IDENTITY_CLIENT_SECRET,
  redirect_uri: `${process.env.REACT_APP_ENTERPRISE_APP_LINK}/api/auth/callback/${process.env.REACT_APP_IDENTITY_ID}`,
  response_type: 'code',
  scope: 'openid profile email',
  authority: process.env.REACT_APP_IDENTITY_DOMAIN,
  silent_redirect_uri: `${process.env.REACT_APP_ENTERPRISE_APP_LINK}/api/auth/silent_callback/${process.env.REACT_APP_IDENTITY_ID}`,
  automaticSilentRenew: true,
  loadUserInfo: true,
  monitorSession: false,
  post_logout_redirect_uri: process.env.REACT_APP_ENTERPRISE_APP_LINK,
};

export default configuration;
