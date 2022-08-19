import { DoctContainer } from '@doct-react/core';
import FormInput from './FormInput';

function Form() {
  return (
    <DoctContainer>
      <div className=" py-5 d-flex justify-content-center align-items-center" id="form_section">
        <div className="form_bg d-flex flex-column flex-md-row align-items-center justify-content-around">
          <div className="d-flex flex-column flex-sm-row flex-md-column align-items-center justify-content-around">
            <div>
              <div>
                <h3 className="text-white form_heading">
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  Looking for assistance? <br /> Let's connect!
                </h3>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p className="text-primary my-3">Reach out to us, we'll be happy to help</p>
              </div>

              <button className="form_email_button d-flex align-items-center my-4 p-2">
                <img src="/media/images/mail_icon.png" />
                <a className="mx-2" href="mailto:recruiter@docthub.com">
                  recruiter@docthub.com
                </a>
              </button>
            </div>

            <img className="my-4 my-md-0" src="media/illustration/MailIllustration.png" />
          </div>
          <FormInput />
        </div>
      </div>
    </DoctContainer>
  );
}

export default Form;
