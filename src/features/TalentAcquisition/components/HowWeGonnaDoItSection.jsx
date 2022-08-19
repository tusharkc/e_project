import { DoctContainer } from '@doct-react/core';
import { SideContent } from './shared';

function HowWeGonnaDoItSection() {
  return (
    <DoctContainer>
      <div className="full-height-without-header d-flex flex-column flex-md-row justify-content-center align-items-center">
        <div className="mx-auto w-100">
          <div className="mx-2">
            <SideContent title="How we gonna do it!" />
          </div>

          <p className="how_we_gonna_do_it">
            We believe in building stronger teams by offering quality candidates through a
            tech-driven solution. Every candidate has to go through a stringent filtering process
            and is validated by our experienced recruitment team. <br /> <br />
            We have a highly experienced team who have expertise in finding the best candidates
            resume, who perfectly fits your organization requirements in a productive way.
          </p>
        </div>
        <img
          className="mx-0 mx-sm-auto illustration_img"
          src="media/illustration/HowWeGonnaDoIt.png"
        />
      </div>
    </DoctContainer>
  );
}

export default HowWeGonnaDoItSection;
