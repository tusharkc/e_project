import { DoctContainer } from '@doct-react/core';
import Slider from 'react-slick';
import { SideContent } from './shared';

function OurPartnersSection() {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    variableWidth: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280, // desktop breakpoint
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 767, // mobile breakpoint
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <>
      <div className="m-3 mt-4 m-sm-0 mt-sm-0">
        <DoctContainer>
          <SideContent title="Our Partners" />
        </DoctContainer>
      </div>
      <div className="mx-4 my-3 my-sm-5">
        <Slider {...settings}>
          <img
            title="Vijaya Nursing Home"
            src="/media/partnersLogo/partner_1.png"
            className="p-2 p-sm-4"
          />

          <img
            title="Wockhardt | Life Wins"
            src="/media/partnersLogo/partner_2.png"
            className="p-2 p-sm-4"
          />

          <img
            title="Kota eye hospital & Research Foundation"
            src="/media/partnersLogo/partner_3.png"
            className="p-2 p-sm-4"
          />

          <img
            title="HCG Hospitals"
            src="/media/partnersLogo/partner_4.png"
            className="p-2 p-sm-4"
          />

          <img
            title="Seth Hospital & Maternity Home"
            src="/media/partnersLogo/partner_5.png"
            className="p-2 p-sm-4"
          />
        </Slider>
      </div>

      <div className="bg-primary-100 text-primary flex-column flex-md-row d-flex align-items-center justify-content-around  p-5">
        <div className="d-flex align-items-center my-3">
          <h2 className="mx-3 numbers">100+</h2>
          <h5>
            Satisfied <br /> Clientele
          </h5>
        </div>

        <div className="d-flex align-items-center my-3">
          <h2 className="mx-3 numbers">400+</h2>
          <h5>
            Vacancies <br />
            Closed
          </h5>
        </div>

        <div className="d-flex align-items-center my-3">
          <h2 className="numbers">1,00,000+</h2>
          <h5>
            Profiles <br /> Screened
          </h5>
        </div>
      </div>
    </>
  );
}

export default OurPartnersSection;
