import Helmet from 'react-helmet';
import TagManager from 'react-gtm-module';

import { IS_PROD_ENV } from '../constants/constants';

const tagManagerArgs = {
  gtmId: process.env.REACT_APP_GOOGLE_TAG_MANAGER_ID,
};

if (IS_PROD_ENV) {
  TagManager.initialize(tagManagerArgs);
}

export default function TrackApp({ children }) {
  if (IS_PROD_ENV) {
    window?.dataLayer?.push({
      event: 'pageview',
    });
  }

  return (
    <>
      {IS_PROD_ENV && (
        <>
          <Helmet>
            <meta
              name="google-site-verification"
              content={process.env.REACT_APP_G_SITE_VERIFICATION}
            />
            <meta
              name="facebook-domain-verification"
              content={process.env.REACT_APP_FACEBOOK_DOMAIN_VERIFICATION}
            />
          </Helmet>
        </>
      )}
      {children}
    </>
  );
}
