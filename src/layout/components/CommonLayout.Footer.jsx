import {
  DoctCookiePolicy,
  DoctPrivacyPolicy,
  DoctTermsAndCondition,
  DoctPaymentPolicy,
} from '@doct-react/app';
import { DoctCookiesBar, DoctEnterpriseFooter } from '@doct-react/ui';
import { useEffect, useState } from 'react';
import { getCookie, setCookie } from '../../helper/helperFunction';

export default function CommonLayoutFooter() {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [termsandconditionModalOpen, setTermsModalOpen] = useState(false);

  // Cookie policy code start
  const [cookieModalOpen, setCoockieModalOpen] = useState(false);
  const [showCoockieBar, setShowCookieBar] = useState(false);
  const [coockiesSetTriggerd, setoockiesSetTriggerd] = useState(false);

  const setCookiesPolicy = () => {
    setCookie('GDPR', +new Date(), 100, 'days');
  };

  useEffect(() => {
    const isSetCookiePolicy = getCookie('GDPR');

    if (!isSetCookiePolicy) {
      setShowCookieBar(true);
    } else {
      setShowCookieBar(false);
    }
  }, [coockiesSetTriggerd]);

  return (
    <>
      <DoctEnterpriseFooter
        onPrivacyHandler={() => setPrivacyModalOpen(!privacyModalOpen)}
        onPaymentHandler={() => setPaymentModalOpen(!paymentModalOpen)}
        onTermConditionHandler={() => setTermsModalOpen(!termsandconditionModalOpen)}
      />
      <DoctPrivacyPolicy open={privacyModalOpen} handleClose={() => setPrivacyModalOpen(false)} />
      <DoctTermsAndCondition
        open={termsandconditionModalOpen}
        handleClose={() => setTermsModalOpen(false)}
      />
      <DoctPaymentPolicy open={paymentModalOpen} handleClose={() => setPaymentModalOpen(false)} />

      {showCoockieBar && (
        <>
          <DoctCookiesBar
            onCoockiesPolicyClick={() => setCoockieModalOpen(true)}
            onConfirmClick={() => {
              setCookiesPolicy();
              setTimeout(() => {
                setoockiesSetTriggerd(true);
              }, 200);
            }}
          />
          <DoctCookiePolicy open={cookieModalOpen} handleClose={() => setCoockieModalOpen(false)} />
        </>
      )}
    </>
  );
}
