import { DoctButton, DoctTypography } from '@doct-react/core';
import React, { useState } from 'react';
import uploadIcon from '../../../../assets/icons/uploadIcon.svg';
import uploadIconWhite from '../../../../assets/icons/uploadIconWhite.svg';
import downloadIcon from '../../../../assets/icons/downloadIcon.svg';
import { DoctDropdownSelect, DoctModal } from '@doct-react/app';
import { downloadMemberDetails, uploadMemberExcel } from '../services/members.services';

const DownloadMemberDetails = ({ organizationName }) => {
  const [open, setOpen] = useState(false);

  const [openUpload, setOpenUpload] = useState(false);

  return (
    <>
      <DownloadMemberDetailModal
        organizationName={organizationName}
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
      />
      <div
        className="d-flex align-items-center cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          setOpenUpload(true);
        }}
      >
        <img src={uploadIcon} alt="Upload Icon" className="mx-2" />
        <DoctTypography variant="subtitle2" className="text-grey-600">
          Upload
        </DoctTypography>
      </div>
      <div
        className="d-flex align-items-center cursor-pointer"
        onClick={() => {
          setOpen(true);
        }}
      >
        <img src={downloadIcon} alt="Upload Icon" className="mx-2" />
        <DoctTypography variant="subtitle2" className="text-grey-600">
          Download
        </DoctTypography>
      </div>

      <UploadExcelModal
        open={openUpload}
        handleClose={() => {
          setOpenUpload(false);
        }}
      />
    </>
  );
};

export default DownloadMemberDetails;

const DownloadMemberDetailModal = ({ open, handleClose, organizationName }) => {
  const [selectedFormat, setSelectedFormat] = useState('');
  const [downloadFormat, setDownloadFormat] = useState('');

  return (
    <DoctModal
      open={open}
      iconName=""
      title="Download"
      showFooter={false}
      handleClose={handleClose}
      width={360}
    >
      <DoctTypography variant="subtitle2" className="text-grey-600">
        Download in PDF, Excel or Address Label List format as per your requirement.
      </DoctTypography>

      <div className="mt-2">
        <DoctDropdownSelect
          label="Format"
          width={328}
          value={selectedFormat}
          handleChange={(item) => {
            setSelectedFormat(item.target.value);

            if (item.target.value == 'Excel Sheet') {
              setDownloadFormat('ExcelSheet');
            }
          }}
          menuItems={[{ title: 'Excel Sheet', value: 'Excel Sheet' }]}
        />
      </div>

      <DoctButton
        icon="downloadOne"
        size="medium"
        text="Download"
        className="float-right mt-5"
        onButtonClickHandler={() => {
          downloadMemberDetails(downloadFormat, organizationName).then(() => {
            handleClose();
          });
        }}
      />
    </DoctModal>
  );
};

const UploadExcelModal = ({ open, handleClose }) => {
  const uploadFiles = () => {
    document.getElementById('selectField').click();
  };

  return (
    <>
      <input
        type="file"
        id="selectField"
        name="profileFile"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        hidden
        onChange={(e) => {
          uploadMemberExcel(e.target.files[0]).then(() => {
            handleClose();
          });
        }}
      />
      <DoctModal
        open={open}
        handleClose={() => {
          handleClose();
        }}
        iconName=""
        showFooter={false}
        title="Upload"
        width={360}
      >
        <DoctTypography variant="body2" className="text-grey-600">
          Fill in your existing members&apos; data as shown in the sample in excel format.
        </DoctTypography>

        <DoctTypography variant="body2" className="text-grey-600 font-italic">
          Please note that all mandatory columns must be filled or your data to be uploaded properly
          otherwise you might get an error while uploading.
        </DoctTypography>

        <div className="d-flex align-items-center justify-content-end">
          <a href={'/static/sample-excel-file.csv'} download>
            <DoctButton
              text="Sample Excel"
              icon="downloadOne"
              variant="text"
              type="inverse"
              size="medium"
            />
          </a>
          <div
            className="d-flex align-items-center justify-content-center cursor-pointer upload-excel-modal-btn"
            onClick={(e) => {
              e.preventDefault();
              uploadFiles();
            }}
          >
            <img src={uploadIconWhite} alt="Upload Icon" className="mx-2" />
            <DoctTypography variant="subtitle2" className="text-white">
              Upload
            </DoctTypography>
          </div>
        </div>
      </DoctModal>
    </>
  );
};
