import { DoctButton, DoctTypography } from '@doct-react/core';
import React from 'react';
import './EventsBlog.scss';

function BlogsCard({ coverImg, blogTitle, blogCatagory, blogDescription, authorName, route }) {
  return (
    <>
      <div className="events_landing_page_blog-card-container bg-white m-3 mt-5">
        <div style={{ backgroundImage: `url(${coverImg})` }} className="blog_section_image" />

        <div className="p-2">
          <DoctTypography
            variant="subtitle1"
            className="blog-catagory common-border-radius text-white"
          >
            {blogCatagory}
          </DoctTypography>
          <DoctTypography variant="subtitle1" fontWeight="bold">
            {blogTitle}
          </DoctTypography>
          <DoctTypography variant="subtitle3" className="blog-description">
            {blogDescription}
          </DoctTypography>
          <div className="d-flex algin-items-center justify-content-between">
            <DoctTypography variant="subtitle2" className="my-3 font-weight-bold">
              By {authorName}
            </DoctTypography>

            <a
              href={`${process.env.REACT_APP_BLOGS_WEB_APP_LINK}/${route}`}
              target="_blank"
              rel="noreferrer"
            >
              <DoctButton
                type="primary"
                variant="text"
                text="Read now"
                icon="right"
                iconPosition="right"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogsCard;
