import { DoctTypography } from '@doct-react/core';

export default function FooterCopyRight() {
  return (
    <footer className="common-box-panel-h-sm py-0 bg-grey-100 justify-content-center">
      <DoctTypography variant="textLabel2" className="text-grey-400">
        Copyright © 2022 Docthub. All rights reserved.
      </DoctTypography>
    </footer>
  );
}
