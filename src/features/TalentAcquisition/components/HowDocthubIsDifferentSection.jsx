import { DoctContainer } from '@doct-react/core';
import { useWindowSize } from '../../../hooks';
import { SideContent } from './shared';

function HowDocthubIsDifferentSection() {
  const size = useWindowSize();
  const { width = {} } = size[0];
  return (
    <>
      {width == 1024 ? (
        <DoctContainer>
          <SideContent title="How Docthub is different?" />

          <div
            className="d-flex align-items-center justify-content-center"
            style={{ marginTop: '-70px' }}
          >
            <div className="p-5">
              <div className="card_body_1" style={{ marginTop: '-100px' }}>
                <h4>
                  Pre Assessed <br /> Candidates
                </h4>

                <p>
                  Our Experts do Pre-Assessment of Candidate Resume and share handpicked best
                  matched candidates.
                </p>
              </div>

              <div className="card_body_2">
                <h4>
                  Niche <br /> Consultancy
                </h4>

                <p>
                  Our Healthcare Staffing companies recruiters are from medical background to hire
                  the best Healthcare staff for your organization.
                </p>
              </div>

              <div className="card_body_3">
                <h4>
                  Reduced <br /> Cost
                </h4>

                <p>
                  Get access to resumes and pay after <br />
                  hiring at lowest possible rate.
                </p>
              </div>
            </div>

            <div className="p-5">
              <img src="/media/illustration/HowDocthubIsDifferent.png" className="" />

              <div className="card_body_4">
                <h4>
                  10x Faster Recruitment <br /> Process
                </h4>

                <p>
                  Find Qualified Doctors, Nurses, Pharmacist, and other Healthcare Professionals for
                  various position on time, which helps meet your project deadline effectively.
                </p>
              </div>
            </div>
          </div>
        </DoctContainer>
      ) : (
        <>
          <DoctContainer>
            <div className="mb-5 mb-sm-0">
              <SideContent title="How Docthub is different?" />
            </div>
            <div className="cards_container">
              <div className="d-flex flex-column flex-md-row justify-content-around align-items-center align-items-sm-end pb-5">
                <div>
                  <div className="d-flex mx-5 flex-column flex-md-row flex-sm-row">
                    <div className="card_body_1">
                      <h4 className="my-4 my-sm-2 card-title">
                        Pre Assessed <br /> Candidates
                      </h4>

                      <p className="card-details">
                        Our Experts do Pre-Assessment <br />
                        of Candidate Resume and share <br />
                        handpicked best matched <br />
                        candidates.
                      </p>
                    </div>

                    <div className="card_body_2">
                      <h4 className="my-4 my-sm-2 card-title">
                        Niche <br /> Consultancy
                      </h4>

                      <p className="card-details">
                        Our Healthcare Staffing companies <br />
                        recruiters are from medical background
                        <br /> to hire the best Healthcare staff for your <br />
                        organization.
                      </p>
                    </div>
                  </div>

                  <div className="d-flex mx-5 flex-column flex-md-row flex-sm-row">
                    <div className="card_body_3">
                      <h4 className="my-4 my-sm-2 card-title">
                        Reduced <br /> Cost
                      </h4>

                      <p className="card-details">
                        Get access to resumes and pay after <br />
                        hiring at lowest possible rate.
                      </p>
                    </div>

                    <div className="card_body_4">
                      <h4 className="my-4 my-sm-2 card-title">
                        10x Faster Recruitment <br /> Process
                      </h4>

                      <p className="card-details">
                        Find Qualified Doctors, Nurses, <br />
                        Pharmacist, and other Healthcare <br />
                        Professionals for various position on <br />
                        time, which helps meet your project <br />
                        deadline effectively.
                      </p>
                    </div>
                  </div>
                </div>
                <img
                  src="/media/illustration/HowDocthubIsDifferent.png"
                  className="doctor_img img illustration_img my-0 my-sm-4 my-md-2"
                />
              </div>
            </div>
          </DoctContainer>
        </>
      )}
    </>
  );
}

export default HowDocthubIsDifferentSection;
