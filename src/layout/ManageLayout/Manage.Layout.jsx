import { Outlet } from 'react-router';
import { DoctCol, DoctContainer, DoctRow } from '@doct-react/core';
import { DoctSidebarMenu } from '@doct-react/app';

import { ManagePageActionBar } from '../components';
import PropTypes from 'prop-types';
import FooterCopyRight from '../components/Footer.CopyRight';

export default function MangeLayout({ sideBar }) {
  return (
    <>
      <ManagePageActionBar />
      <DoctSidebarMenu responsive menuItems={sideBar} />
      <main className="bg-grey-200 manage_page__main_area">
        <div className="manage_page__gap_top">
          <DoctContainer>
            <DoctRow>
              <DoctCol md={3}>
                <div className="manage_page__sidebar manage_page__sidebar_pr">
                  <DoctSidebarMenu menuItems={sideBar} />
                </div>
              </DoctCol>
              <DoctCol md={9}>
                <Outlet />
              </DoctCol>
            </DoctRow>
          </DoctContainer>
        </div>
      </main>
      <FooterCopyRight />
    </>
  );
}

MangeLayout.propTypes = {
  sideBar: PropTypes.any,
};
