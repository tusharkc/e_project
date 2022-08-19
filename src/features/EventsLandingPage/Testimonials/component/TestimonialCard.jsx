import React from 'react';
import playBtn from '../../../../assets/icons/play_icon.svg';
import VideoPlayer from '../../../../helper/VideoPlayer/VideoPlayer';
const TestimonialCard = ({
  testimonialContent,
  fraternityName,
  fraternityPost,
  containsMedia = false,
  media,
}) => {
  return (
    <div className="event_testimonial_card my-5 mx-2">
      {!containsMedia ? (
        <div className="event_testimonial_content d-flex align-items-center justify-content-center">
          <p>{testimonialContent}</p>
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-center mx-auto mt-3 mb-5 event_video_bg">
          <VideoPlayer src={media} />
        </div>
      )}

      <h5 className="text-center font-weight-bold m-1 event_fraternity_name">{fraternityName}</h5>
      <p className="text-grey-400 text-center m-1 event_fraternity_post">{fraternityPost}</p>
    </div>
  );
};

export default TestimonialCard;
