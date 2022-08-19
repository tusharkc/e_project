import { DoctButton, DoctContainer } from '@doct-react/core';
// import Link from 'next/dist/client/link';

function PricingModel() {
  return (
    <DoctContainer>
      <div className="full-height-without-header my-5 flex-column flex-md-row d-flex align-items-center justify-content-center">
        <img src="media/illustration/PricingModel.png" className="img-fluid order-2" />

        <div className="pricing_model_card order-1 order-md-2 my-5 my-sm-0 mx-5 mx-sm-2 d-flex flex-column align-items-start justify-content-around">
          <h2 className="m-3 text-left font-weight-bold"> Pricing Model</h2>
          <p className="m-3 text-left">
            8.33% of the Annual CTC of Candidate + <br /> GST(As Per Govt. norms) - For all
            Positions
          </p>
          {/* <Link > */}
          <a href="#form_section">
            <div className="mb-5 mx-3">
              <DoctButton text="I am Interested" />
            </div>
          </a>
          {/* </Link> */}
        </div>
      </div>
    </DoctContainer>
  );
}

export default PricingModel;
