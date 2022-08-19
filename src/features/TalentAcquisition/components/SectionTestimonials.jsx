import { DoctContainer } from '@doct-react/core';

function SectionTestimonials() {
  return (
    <DoctContainer>
      <div className="d-flex align-items-start my-5 mx-3">
        <div className="heading_border m-4"></div>
        <h2 className="font-weight-bold text-left w-100 w-sm-0">
          Our customers <br /> love what we do!
        </h2>
      </div>
      <div className="d-flex flex-column flex-md-row justify-content-around align-items-center">
        <div className="order-2 order-md-0">
          <img
            src="/media/illustration/Testimonials.png"
            className="illustration_img mx-5 mx-sm-0"
          />
        </div>

        <div className="d-flex flex-column">
          <div className="testimonial_card_body p-3 m-3">
            <div className="d-flex align-items-center ">
              <img src="/media/images/testimonial_img1.png" />
              <div className="mx-3">
                <h5 className="font-weight-bold">Dr Chetan Mistry</h5>
                <p className="text-primary-500">CEO, BT Savani Kidney Hospital</p>
              </div>
            </div>

            <h6 className="text-primary-500 my-3 font-weight-bold">Efficient and Smooth</h6>
            <p className="testimonial_content ">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              In my short time working with Docthub's Talent Acquisition Services on x3 essentials
              nursing posts, they have really aided us with their knowledge in candidate screening
              and conducting interviews in a transparent and timely manner. I look forward to
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              working with them again on feature roles; they're one of the best Hospital Recruitment
              agencies
            </p>
          </div>

          <div className="testimonial_card_body_2 p-3 m-3">
            <div className="d-flex align-items-center">
              <img src="/media/images/image.png" />
              <div className="mx-3">
                <h5 className="font-weight-bold">Dr Mayank Kulshretha</h5>
                <p className="text-primary-500"> Urologist </p>
              </div>
            </div>

            <h6 className="text-primary-500 my-3 font-weight-bold">Quick and Responsive</h6>
            <p className="testimonial_content">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Just a phone call to Docthub's Talent Acquisition Services, and I was provided with
              multiple hospital vacancies! They assisted me in selecting the one that best matched
              my talents and interests. They are responsive, responsible, and reliable.
            </p>
          </div>
        </div>
      </div>
    </DoctContainer>
  );
}

export default SectionTestimonials;
