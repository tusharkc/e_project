import { Helmet } from 'react-helmet';

import { DoctButton } from '@doct-react/core';
import { LayoutCommon } from '../../layout';

const meta = {
  title:
    'Hospital Recruitment Services | Healthcare Recruitment Consultancy | Docthub Talent Acquisition Services',
  description:
    'We are one of the best Hospital Recruitment agencies. Our Healthcare Staffing companies recruiters are from medical background to hire the best Healthcare staff for your organization. Find Qualified Doctors, Nurses, Pharmacist, and other Healthcare Professionals for various position on time!',
  keywords:
    'Talent Acquisition Consultancy, Talent Acquisition Specialist, Talent Acquisition companies in India, Talent Acquisition Consultancy Docthub, perfect recruitment solutions, talent acquisition consulting contact details, talent acquisition contact number, Hospital staffing, Healthcare Staffing agency, hospital staffing agency, hospital recruitment agency, medical recruitment services',
};

function InquiryApplicationSentSuccessfully() {
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
        <div className=" d-flex align-items-center justify-content-center pt-5">
          <div className="text-center">
            <h3>Inquiry application sent successfully.</h3>
            <p className="text-grey-500 py-3">Thank you for using Docthub Platform.</p>
            <div className="d-flex align-items-center justify-content-center pb-5">
              <a href={process.env.REACT_APP_RECRUITMENT_WEB_APP_LINK}>
                <DoctButton text="Continue" />
              </a>
              {/* </Link> */}
            </div>
            <img src="/media/illustration/Success.png" className="illustration_img py-5" />
          </div>
        </div>
      </LayoutCommon>
    </>
  );
}

export default InquiryApplicationSentSuccessfully;
