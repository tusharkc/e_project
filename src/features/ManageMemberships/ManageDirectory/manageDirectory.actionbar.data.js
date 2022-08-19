import * as ROUTE from '../../../routes/constant';
import ActionButton from './components/ActionButton';

const manageDirectoryPageActionBar = {
  [ROUTE.MANAGE_MEMBERSHIPS_MANAGE_DIRECTORY]: {
    pathname: ROUTE.MANAGE_MEMBERSHIPS_MANAGE_DIRECTORY,
    title: 'Memberships Management',
    buttonText: 'New Member',
    buttonIcon: 'plus',
    isButtonDisabled: false,
    btnComponent: <ActionButton />,
  },
};

export default manageDirectoryPageActionBar;
