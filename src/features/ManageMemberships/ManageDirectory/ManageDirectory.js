import { DoctActionMenu } from '@doct-react/app';
import React, { useEffect, useState } from 'react';
import useQueryHooks from '../../../hooks/useQueryHooks';
import CustomTable from '../../../shared/ui/CustomTable/CustomTable';
import { useMembersQuery } from './services/members.services';
import ManageDirectoryFilter from './Filter/ManageDirectoryFilter';
import { manageDirectoryTableColumn } from './tableColumn.manageDirectory';
import ManageDirectoryCollapsable from './components/ManageDirectoryCollapsable';
import DeleteMemberModal from './components/DeleteMemberModal';
import { deleteMember, useMembershipsQuery } from '../AllMemberships/services/memberships.services';
import ChangeStatusModal from './components/ChangeStatusModal';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import DownloadMemberDetails from './components/Upload&DownloadMemberDetails';
import './manageDirectory.scss';
import { StaticMessageOnNoDataFound } from './components/StaticMessageOnNoDataFound';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../components/App/appSlice';

const options = [
  {
    title: 'View Member Detail',
  },
  {
    title: 'Edit Member',
  },
  {
    title: 'Change Status',
  },
  {
    title: 'Delete Member',
  },
];

const ManageDirectory = () => {
  const query = useQueryHooks();
  const user = useSelector(userSelector);

  const { data: membershipData } = useMembershipsQuery();

  const [membersData, setMembersData] = useState([]);
  const [totalMemberCount, setTotalMemberCount] = useState();
  const [selectedItemId, setSelectedItemId] = useState(0);
  const [openChangeStatus, setOpenChangeStatus] = useState(false);
  const [searchTextVal, setSearchTextVal] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();

  let navigate = useNavigate();

  const { data: allMembersData, isLoading } = useMembersQuery({ query });

  const [memberId, setMemberId] = useState('');
  const [membershipId, setMembershipId] = useState('');

  useEffect(() => {
    if (query.searchText != '') {
      setSearchTextVal(query.searchText);
    }
  }, [searchTextVal]);

  useEffect(() => {
    if (allMembersData) {
      setMembersData(allMembersData.members);
      setTotalMemberCount(allMembersData.totalRecords);
    }
  }, [allMembersData]);

  const [defaultValueFromQuery, setDefaultValueFromQuery] = useState({});

  useEffect(() => {
    const obj = {};

    Object.keys(query).forEach((key) => {
      if (Array.isArray(query[key])) {
        obj[key] = query[key];
      } else {
        obj[key] = [query[key]];
      }
    });

    setDefaultValueFromQuery(obj);
  }, [qs.stringify(query)]);

  const ActionMenu = ({ column, index, setTargetedRowIndex }) => {
    return (
      <DoctActionMenu
        btnType="inverse"
        options={options}
        onClick={(item) => {
          if (item.title == 'Delete Member') {
            setOpen(true);
            setMemberId(column?.id);
            setMembershipId(column?.membership?.id);
          }

          if (item.title == 'Change Status') {
            setOpenChangeStatus(true);
            setValue(column?.memberStatus);
            setMemberId(column?.id);
            setMembershipId(column?.membership?.id);
          }

          if (item.title == 'Edit Member') {
            navigate(
              `/dashboard/edit-member?${qs.stringify({
                memberId: column?.membership?.id,
                id: column?.id,
              })}`,
            );
          }

          if (item.title == 'View Member Detail') {
            setSelectedItemId(column?.id);
            setTargetedRowIndex(index);
          }
        }}
        className="custom-tabel-row-action-menu"
      />
    );
  };

  return (
    <div>
      <ChangeStatusModal
        value={value}
        setValue={setValue}
        membershipId={membershipId}
        memberId={memberId}
        open={openChangeStatus}
        handleClose={() => {
          setOpenChangeStatus(false);
        }}
      />
      <DeleteMemberModal
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        handlePrimaryButtonClick={() => {
          deleteMember({ memberId: memberId, membershipId: membershipId });
          setOpen(false);
          window.location.reload();
        }}
      />

      <CustomTable
        // downloadDetailComponent={
        //   <DownloadMemberDetails organizationName={user?.tenant?.organizationName || ''} />
        // }
        setSelectedItemId={setSelectedItemId}
        tableCollapsible={ManageDirectoryCollapsable}
        column={manageDirectoryTableColumn}
        tableRowData={membersData}
        actionMenu={ActionMenu}
        contentLoading={isLoading}
        searchPlaceholder={'Full name, City, Memberships'}
        resultCount={totalMemberCount}
        countHeading="MEMBERS"
        filterData={<ManageDirectoryFilter defaultValue={defaultValueFromQuery} />}
        onNoDataFound={
          <StaticMessageOnNoDataFound
            membershipsExists={membershipData?.length > 0 ? true : false}
          />
        }
        transformDisplayChips={
          allMembersData?.facets?.memberships
            ? { memberships: membershipData, valueAccessBy: 'membershipTitle' }
            : undefined
        }
      />
    </div>
  );
};

export default ManageDirectory;
