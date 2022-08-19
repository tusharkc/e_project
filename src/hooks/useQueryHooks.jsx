import { useLocation } from 'react-router-dom';
import qs from 'qs';

export default function useQueryHooks() {
  const { search } = useLocation();
  const queryObj = qs.parse(search.split('?')[1], { parseArrays: false }) || {};

  return queryObj;
}
