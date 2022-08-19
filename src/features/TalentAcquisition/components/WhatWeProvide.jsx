import { DoctContainer } from '@doct-react/core';

function WhatWeProvide() {
  return (
    <DoctContainer>
      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center py-5">
        <img
          className="img-fluid my-4 order-2 order-md-1"
          src="/media/illustration/WhatWeProvideIllustration.png"
        />

        <div className="order-1 order-md-2 w-100">
          <div className="d-flex align-items-center">
            <div className="heading_border m-3"></div>
            <h2 className="font-weight-bold">What We Provide</h2>
          </div>
          <p className="side_content--p">
            We help healthcare industry find the greatest <br className="d-none d-md-none" />
            professional employees by providing high-quality <br className="d-none d-md-none" />
            candidates. In terms of talent acquisition, we strive
            <br className="d-none d-md-none" /> for excellence.
          </p>
        </div>
      </div>
    </DoctContainer>
  );
}

export default WhatWeProvide;
