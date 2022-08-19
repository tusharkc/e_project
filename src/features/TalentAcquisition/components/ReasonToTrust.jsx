import { DoctContainer } from '@doct-react/core';
import { useWindowSize } from '../../../hooks';
import { SideContent } from './shared';

function ReasonToTrust() {
  const size = useWindowSize();
  const { width = {} } = size[0];

  return (
    <>
      {width > 768 ? (
        <DoctContainer>
          <div className=" my-5 full-height-without-header">
            <SideContent title="Reasons to trust us" />
            <div className="d-flex flex-column flex-sm-row justify-content-around align-items-center">
              <div style={{ maxWidth: '430px' }}>
                <div className="d-flex align-items-start my-4 ">
                  <img className="mx-2 our_partner_img" src="/media/images/checkbox.png" />
                  <p>Docthub Talent Acquisition acquires candidates using its own job portal.</p>
                </div>

                <div className="d-flex align-items-start my-4 ">
                  <img className="mx-2" src="/media/images/checkbox.png" />
                  <p>
                    Hence, we not only get inundated by resumes through other sources but also our
                    own.
                  </p>
                </div>

                <div className="d-flex align-items-start my-4 ">
                  <img className="mx-2" src="/media/images/checkbox.png" />
                  <p>
                    As a niche in talent acquisition, we share and utilize the best practices. We
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    don't simply curate our service; we use it too!
                  </p>
                </div>
              </div>
              <img className="illustration_img" src="/media/illustration/ReasonToTrust.png" />
            </div>

            <div className="d-flex flex-column flex-sm-row align-items-center text-center justify-content-around m-5">
              <div>
                <h5 className="font-weight-bold">10,000+ Jobs</h5>
                <p className="my-3 text-grey-400 reason_to_trust_subtitle">
                  Exclusively for Healthcare <br /> Professionals
                </p>
              </div>

              <div>
                <h5 className="font-weight-bold">2,000+ Organizations</h5>
                <p className="my-3 text-grey-400 reason_to_trust_subtitle">
                  Imbibing their trust <br /> upon us
                </p>
              </div>

              <div>
                <h5 className="font-weight-bold">1 Lakh+ Web Traffic</h5>
                <p className="my-3 text-grey-400 reason_to_trust_subtitle">
                  Advanced targeting, <br /> Real visitors
                </p>
              </div>
            </div>
          </div>
        </DoctContainer>
      ) : (
        <>
          <div className="m-2">
            <SideContent title="Reasons to trust us" />
          </div>

          <div className="d-flex flex-column flex-sm-row justify-content-around align-items-center">
            <div style={{ maxWidth: '658px' }}>
              <div className="d-flex align-items-start my-4 ">
                <img className="mx-2 our_partner_img" src="/media/images/checkbox.png" />
                <p>Docthub Talent Acquisition acquires candidates using its own job portal.</p>
              </div>

              <div className="d-flex align-items-start my-4 ">
                <img className="mx-2" src="/media/images/checkbox.png" />
                <p>
                  Hence, we not only get inundated by resumes through other sources but also our
                  own.
                </p>
              </div>

              <div className="d-flex align-items-start my-4 ">
                <img className="mx-2" src="/media/images/checkbox.png" />
                <p>
                  As a niche in talent acquisition, we share and utilize the best practices. We
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  don't simply curate our service; <br /> we use it too!
                </p>
              </div>
            </div>
          </div>

          <div className="d-flex flex-column flex-sm-row align-items-center text-center justify-content-around m-5 m-sm-2">
            <div className="my-3">
              <h5 className="font-weight-bold">
                10,000+ <br /> Jobs
              </h5>
              <p className="my-3 text-grey-400 reason_to_trust_subtitle">
                Exclusively for Healthcare <br /> Professionals
              </p>
            </div>

            <div className="my-3">
              <h5 className="font-weight-bold">
                2,000+ <br /> Organizations
              </h5>
              <p className="my-3 text-grey-400 reason_to_trust_subtitle">
                Imbibing their trust <br /> upon us
              </p>
            </div>

            <div className="my-3">
              <h5 className="font-weight-bold">
                1 Lakh+ <br /> Web Traffic
              </h5>
              <p className="my-3 text-grey-400 reason_to_trust_subtitle">
                Advanced targeting, <br /> Real visitors
              </p>
            </div>
          </div>

          <img
            className="illustration_img reason_to_trust"
            src="/media/illustration/ReasonToTrust.png"
          />
        </>
      )}
    </>
  );
}

export default ReasonToTrust;
