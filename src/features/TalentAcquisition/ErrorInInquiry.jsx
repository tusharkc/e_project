import { Helmet } from 'react-helmet';

import { DoctButton } from '@doct-react/core';
import { LayoutCommon } from '../../layout';
import { TALENT_ACQUISITION_SERVICES } from '../../routes/constant';

const meta = {
  title:
    'Hospital Recruitment Services | Healthcare Recruitment Consultancy | Docthub Talent Acquisition Services',
  description:
    'We are one of the best Hospital Recruitment agencies. Our Healthcare Staffing companies recruiters are from medical background to hire the best Healthcare staff for your organization. Find Qualified Doctors, Nurses, Pharmacist, and other Healthcare Professionals for various position on time!',
  keywords:
    'Talent Acquisition Consultancy, Talent Acquisition Specialist, Talent Acquisition companies in India, Talent Acquisition Consultancy Docthub, perfect recruitment solutions, talent acquisition consulting contact details, talent acquisition contact number, Hospital staffing, Healthcare Staffing agency, hospital staffing agency, hospital recruitment agency, medical recruitment services',
};

function ErrorInInquiry() {
  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta property="og:title" content={meta.title}></meta>
        <meta property="og:description" content={meta.description}></meta>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
      </Helmet>
      <LayoutCommon hideFooter>
        <div className="d-flex align-items-center justify-content-center mt-5">
          <div className="text-center">
            <h3>Error Sending inquiry application!</h3>
            <p className="text-grey-500 py-3">
              Try to send it again.
              <br /> or
              <br /> contact us on
              <span className="text-grey-800"> +91 8320 876 533</span>
            </p>
            <div className="d-flex align-items-center justify-content-center pb-5">
              <a href={`/${TALENT_ACQUISITION_SERVICES}#form_section`}>
                <DoctButton text="Retry" type="semantic-warning" />
              </a>
            </div>
            <img
              src="/media/illustration/ErrorIllustration.png"
              className="py-5 illustration_img"
            />
          </div>
        </div>
      </LayoutCommon>
    </>
  );
}

export default ErrorInInquiry;
