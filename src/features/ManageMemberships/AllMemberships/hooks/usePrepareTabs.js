import { ManageMembershipDisplayName } from '../../../../helper/enums/manageMemberShipStatus';

export default function usePrepareManageMembersTabList() {
  const array = [
    {
      label: 'All Memberships',
    },
  ];

  Object.keys(ManageMembershipDisplayName).map((item) => {
    array.push({
      label: ManageMembershipDisplayName[item],
    });
  });

  return array;
}
