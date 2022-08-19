import * as ROUTE from '../routes/constant';
import { useLocation } from 'react-router-dom';

const useExcludeHeaderPathname = () => {
  const location = useLocation();
  const { pathname } = location;

  const excludeHeaderPathnames = [
    `/${ROUTE.DASHBOARD}/${ROUTE.ADD_NEW_MEMBER}`,
    `/${ROUTE.DASHBOARD}/${ROUTE.CREATE_NEW_MEMBERSHIP}`,
    `/${ROUTE.DASHBOARD}/${ROUTE.EDIT_MEMBERSHIP}`,
    `/${ROUTE.DASHBOARD}/${ROUTE.EDIT_MEMBER}`,
    `/${ROUTE.DASHBOARD}/${ROUTE.INSTITUTE}/${pathname.replace(/[^0-9]/g, '')}/${
      ROUTE.INSTITUTE_EDIT_COURSE
    }`,
    `/${ROUTE.DASHBOARD}/${ROUTE.INSTITUTE}/${pathname.replace(/[^0-9]/g, '')}/${
      ROUTE.PREVIEW_COURSE
    }`,
    `/${ROUTE.DASHBOARD}/${ROUTE.INSTITUTE}/${ROUTE.INSTITUTE_ADD_COURSE}`,
    `/${ROUTE.DASHBOARD}/${ROUTE.INSTITUTE}/${ROUTE.PREVIEW_COURSE}`,
    `/${ROUTE.DASHBOARD}/${ROUTE.RECRUITER}/${ROUTE.POST_A_JOB}`,
    `/${ROUTE.DASHBOARD}/${ROUTE.RECRUITER}/${pathname.replace(/[^0-9]/g, '')}/${ROUTE.EDIT_JOB}`,
    `/${ROUTE.DASHBOARD}/${ROUTE.RECRUITER}/${ROUTE.JOB_PREVIEW}/${pathname.replace(
      /[^0-9]/g,
      '',
    )}`,
  ];

  return { excludeHeaderPathnames };
};

export default useExcludeHeaderPathname;
