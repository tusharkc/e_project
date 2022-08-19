import { DoctCol, DoctContainer } from '@doct-react/core';

function Banner() {
  return (
    <DoctContainer>
      <div className="full-height-without-header">
        <div className="d-flex flex-column justify-content-center h-100">
          <div className="order-2 order-md-1 mt-4 d-flex flex-column justify-content-start">
            <img
              src="media/images/talent_acquistion--illustration.svg"
              className="my-sm-0 d-none d-md-block align-self-start"
            />
            <div className="banner_content">
              <h1 className="font-weight-bold">
                We make your <br className="d-none d-sm-block" /> hiring take flight.
              </h1>
              <p className="mt-3 font-weight-100">
                Hire highly qualified candidates for your
                <br /> organisation.
              </p>
            </div>
          </div>

          <img
            src="/media/images/talent_acquistion--illustration.svg"
            className="mt-5 mb-3 d-md-none align-self-start responsive-talant_acquistion_img"
          />
          <DoctCol xs={12} sm={8} md={12} className="order-1 order-md-2 mx-auto mx-md-0 d-md-none">
            <img
              src="/media/illustration/BannerIllustration.svg"
              className="banner_illustration img-fluid"
            />
          </DoctCol>
          <img
            src="/media/illustration/BannerIllustration.svg"
            className="banner_illustration img-fluid d-none d-md-block"
          />
        </div>
      </div>
    </DoctContainer>
  );
}

export default Banner;
