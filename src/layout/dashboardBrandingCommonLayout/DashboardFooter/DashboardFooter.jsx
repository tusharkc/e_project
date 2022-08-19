import React, { useState, useEffect } from 'react';
import {
  DoctContainer,
  DoctRow,
  DoctCol,
  DoctIcon,
  DoctTypography,
  DoctLogoRegTM,
} from '@doct-react/core';

import Collapsible from './Collapsable.jsx';

import './dashboardFooter.scss';

function DashboardFooter() {
  return (
    <footer className="footer mt-5">
      <DoctContainer>
        <DoctRow>
          {/* Social Links */}
          <DoctCol xs={12} sm={5} md={3} className="footer-social-wrapper">
            <div className="footer-widget">
              <div className="footer-nav-logo d-block d-sm-flex">
                <DoctLogoRegTM rest={true} />
              </div>
              <DoctTypography
                variant="textLabel1"
                className="footer-tag-line text-grey-800 d-block d-sm-flex"
              >
                Empowering Healthcare Fraternity
              </DoctTypography>
              <ul className={`footer-widget-social justify-content-sm-start`}>
                <li>
                  <DoctTypography
                    href="https://www.facebook.com/docthub/"
                    variant="link1"
                    targetBlank={true}
                    className="text-grey-600 facebook-icon footer-link align-items-center"
                  >
                    <DoctIcon width="16" name="facebook" />
                  </DoctTypography>
                </li>
                <li>
                  <DoctTypography
                    className="text-grey-600 footer-link align-items-center"
                    href="https://twitter.com/docthub"
                    targetBlank={true}
                    variant="link1"
                  >
                    <DoctIcon width="16" name="twitter" />
                  </DoctTypography>
                </li>
                <li>
                  <DoctTypography
                    targetBlank={true}
                    className="text-grey-600 footer-link align-items-center"
                    href="https://www.linkedin.com/company/docthub2017/"
                    variant="link1"
                  >
                    <DoctIcon width="16" name="linkedIn" />
                  </DoctTypography>
                </li>
                <li>
                  <DoctTypography
                    targetBlank={true}
                    className="text-grey-600 footer-link align-items-center"
                    href="https://www.instagram.com/docthub/"
                    variant="link1"
                  >
                    <DoctIcon width="16" name="instagram" />
                  </DoctTypography>
                </li>
                <li>
                  <DoctTypography
                    targetBlank={true}
                    className="text-grey-600 footer-link align-items-center"
                    href="https://www.youtube.com/c/Docthub1/videos"
                    variant="link1"
                  >
                    <DoctIcon width="16" name="youTube" />
                  </DoctTypography>
                </li>
              </ul>
            </div>
          </DoctCol>
          {/* Products Links */}
          <DoctCol xs={12} sm={0} className="col-sm">
            <Collapsible title="Solutions">
              <ul>
                <li>
                  <DoctTypography href="#" variant="link1" className="text-grey-600 footer-link">
                    List a Course
                  </DoctTypography>
                </li>
                <li>
                  <DoctTypography href="#" variant="link1" className="text-grey-600 footer-link">
                    Create an Event
                  </DoctTypography>
                </li>
                <li>
                  <DoctTypography href="#" variant="link1" className="text-grey-600 footer-link">
                    Post a Job
                  </DoctTypography>
                </li>
                <li>
                  <DoctTypography href="#" variant="link1" className="text-grey-600 footer-link">
                    Memberships Management
                  </DoctTypography>
                </li>
                <li>
                  <DoctTypography href="#" variant="link1" className="text-grey-600 footer-link">
                    Create Website
                  </DoctTypography>
                </li>
              </ul>
            </Collapsible>
          </DoctCol>
          <DoctCol xs={12} className="col-sm">
            <Collapsible title="Users Platform">
              <ul>
                <li>
                  <DoctTypography
                    targetBlank
                    href={process.env.REACT_APP_COURSES_WEB_APP}
                    variant="link1"
                    className="text-grey-600 footer-link"
                  >
                    Courses
                  </DoctTypography>
                </li>
                <li>
                  <DoctTypography
                    targetBlank
                    href={process.env.REACT_APP_EVENT_URL}
                    variant="link1"
                    className="text-grey-600 footer-link"
                  >
                    Events
                  </DoctTypography>
                </li>
                <li>
                  <DoctTypography
                    targetBlank
                    href={process.env.REACT_APP_RECRUITMENT_WEB_APP_LINK}
                    variant="link1"
                    className="text-grey-600 footer-link"
                  >
                    Jobs
                  </DoctTypography>
                </li>
              </ul>
            </Collapsible>
          </DoctCol>
          <DoctCol xs={12} className="col-sm">
            <Collapsible title="Explore">
              <ul>
                <li>
                  <DoctTypography
                    href={process.env.REACT_APP_BLOGS_WEB_APP_LINK}
                    variant="link1"
                    className="text-grey-600 footer-link"
                  >
                    Blogs
                  </DoctTypography>
                </li>
                <li>
                  <DoctTypography href="#" variant="link1" className="text-grey-600 footer-link">
                    News
                  </DoctTypography>
                </li>
              </ul>
            </Collapsible>
          </DoctCol>
          <DoctCol xs={12} className="col-sm">
            <Collapsible title="Company">
              <ul>
                <li>
                  <DoctTypography
                    targetBlank
                    href={`${process.env.REACT_APP_DOCTHUB_WEB_APP_LINK}/about-us`}
                    variant="link1"
                    className="text-grey-600 footer-link"
                  >
                    About DOCTHUB
                  </DoctTypography>
                </li>
                <li>
                  <DoctTypography
                    targetBlank
                    href={`${process.env.REACT_APP_DOCTHUB_WEB_APP_LINK}/contact-us`}
                    variant="link1"
                    className="text-grey-600 footer-link"
                  >
                    Contact Us
                  </DoctTypography>
                </li>
              </ul>
            </Collapsible>
          </DoctCol>
          <DoctCol xs={12} className="col-sm">
            <Collapsible title="Policies">
              <ul>
                <li className="cursor-pointer">
                  <span className="text-grey-600 footer-link link-1 py-0">Terms of Use</span>
                </li>
                <li className="cursor-pointer">
                  <span className="text-grey-600 footer-link link-1 py-0">Privacy Policy</span>
                </li>
                <li className="cursor-pointer">
                  <span className="text-grey-600 footer-link link-1 py-0">Payment Policy</span>
                </li>
              </ul>
            </Collapsible>
          </DoctCol>
        </DoctRow>
        {/* Copyright Footer */}
        <DoctTypography variant="textLabel2" className="text-center text-grey-400 copyright-footer">
          Copyright © {new Date().getFullYear()} Docthub. All rights reserved.
        </DoctTypography>
      </DoctContainer>
    </footer>
  );
}

export default DashboardFooter;
