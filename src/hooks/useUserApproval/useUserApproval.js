import { useSelector } from 'react-redux';
import { userSelector } from '../../components';
import { useCallback, useEffect, useState } from 'react';

export const useUserApproval = ({ allAccountTypes = [] }) => {
  const user = useSelector(userSelector);
  const [openModalPath, setOpenModalPath] = useState();
  const [allAccessableFeaturesArr, setAllAccessableFeaturesArr] = useState();

  const allAccessableFeatures = [];

  const checkAccessableAccountTypes = useCallback(() => {
    allAccountTypes?.map((type) => {
      if (type == user?.tenant?.type) {
        allAccessableFeatures.push((allAccessableFeatures[type] = true));
      } else {
        allAccessableFeatures.push((allAccessableFeatures[type] = false));
      }
    });
    setAllAccessableFeaturesArr(allAccessableFeatures);
  }, [allAccessableFeatures]);

  useEffect(() => {
    checkAccessableAccountTypes();
    if (user?.tenant?.status != 'Active') {
      setOpenModalPath(`?${user?.tenant?.type}-under-review`);
    } else {
      setOpenModalPath();
    }
  }, [user?.tenant]);

  return { allAccessableFeaturesArr, openModalPath };
};
