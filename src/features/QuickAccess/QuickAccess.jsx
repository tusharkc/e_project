import { DoctCol, DoctContainer, DoctRow } from '@doct-react/core';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CoursesEmptyStateImage from '../../assets/images/empty-state-courses.png';
import JobsEmptyStateImage from '../../assets/images/empty-state-jobs.png';
import { userSelector } from '../../components';
import * as ROUTE from '../../routes/constant.js';
import { AddMenu, QuickCardFocused, QuickCardHighted, Sidebar, UserInfo } from './components';
import './QuickAccess.scss';

export default function QuickAccess() {
  const user = useSelector(userSelector);

  const { name, tenant, userNumber } = user || {};

  const { organizationName } = tenant || {};

  const navigate = useNavigate();

  const userInfo = {
    name,
    organizationName,
    userNumber,
  };

  return (
    <main className="bg-grey-200 container-height-without-header pt-4">
      <DoctContainer>
        <DoctRow>
          <DoctCol md={3}>
            <AddMenu />
            <Sidebar className={'mt-4'} />
          </DoctCol>
          <DoctCol md={9}>
            <UserInfo userInfo={userInfo} className={'mb-4'} />
            <DoctRow>
              <DoctCol sm={4}>
                <QuickCardFocused emptyStateBgClass={'events_bg'} />
              </DoctCol>
              <DoctCol sm={4}>
                <QuickCardHighted
                  // onButtonPressFunction={() => {
                  //   navigate(`${ROUTE.RECRUITER}`);
                  // }}
                  title="Jobs"
                  btnText="Post Job"
                  emptyStateTitle="Post your first Job Now!"
                  emptyStateBgClass={'jobs_bg'}
                  emptyStateImage={<img src={JobsEmptyStateImage} alt="Post your first Job Now!" />}
                />
              </DoctCol>
              <DoctCol sm={4}>
                <QuickCardHighted
                  // onButtonPressFunction={() => {
                  //   navigate(`${ROUTE.INSTITUTE}`);
                  // }}
                  title="Courses"
                  btnText="Add Course"
                  emptyStateTitle="Add your first Course Now!"
                  emptyStateBgClass={'courses_bg'}
                  emptyStateImage={
                    <img src={CoursesEmptyStateImage} alt="Add your first Course Now!" />
                  }
                />
              </DoctCol>
            </DoctRow>
          </DoctCol>
        </DoctRow>
      </DoctContainer>
    </main>
  );
}
