import { DoctContainer, DoctRow, DoctCol, DoctTypography, DoctButton } from '@doct-react/core';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import EventSectionHeading from '../../Shared/UI/EventSectionHeading/EventSectionHeading';
import BlogsCard from './BlogsCard';
import { useWindowSize } from '../../../shared/ui/useWindowSize';

function EventsBlog() {
  const size = useWindowSize();
  const { width } = size[0];
  const [eventBlogsData, setEventBlogsData] = useState([]);

  useEffect(() => {
    async function getBlogData() {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/blogcenter/blogs?BlogCategoryId=10&PageNumber=1&PageSize=6`,
      );
      setEventBlogsData(response?.data?.blogs);
    }

    getBlogData();
  }, []);

  return (
    <DoctContainer>
      <div className="section_blog_heading font-weight-bold mt-5 mx-3">
        <h4 className="font-weight-bold events_blog_title">
          Docthub<span className="blogs_label_blue mx-2">Blogs</span>
        </h4>

        <h6 className="text-grey-500 events_blog_subtitle font-regular mt-1">
          We also have Blogs to help you with research and make informed decisions!
        </h6>
      </div>
      <DoctRow>
        {eventBlogsData.map((blog, index) => {
          if (width < 768) {
            if (index == 0) {
              return (
                <DoctCol xs={12} sm={4}>
                  <BlogsCard
                    coverImg={blog.coverImageUrl}
                    blogCatagory="Healthcare Events"
                    blogTitle={blog.title}
                    blogDescription={blog.overview}
                    authorName={blog.authorName}
                    route={blog.route}
                  />
                </DoctCol>
              );
            }
          } else if (width > 768) {
            return (
              <DoctCol xs={12} sm={6} md={4}>
                <BlogsCard
                  coverImg={blog.coverImageUrl}
                  blogCatagory="Healthcare Events"
                  blogTitle={blog.title}
                  blogDescription={blog.overview}
                  authorName={blog.authorName}
                  route={blog.route}
                />
              </DoctCol>
            );
          }
        })}
      </DoctRow>

      <div className="d-flex align-items-center justify-content-center flex-column mt-4 py-4">
        <DoctTypography variant="h4" className="text-center explore_more_title my-3">
          Explore our huge data of blogs on every topic that <br /> you can think of.
        </DoctTypography>
        <a
          target="_blank"
          rel="noreferrer noopener"
          href={process.env.REACT_APP_BLOGS_WEB_APP_LINK}
        >
          <button className="exlore_more_button cursor-pointer text-center">Explore more</button>
        </a>
      </div>
    </DoctContainer>
  );
}

export default EventsBlog;
