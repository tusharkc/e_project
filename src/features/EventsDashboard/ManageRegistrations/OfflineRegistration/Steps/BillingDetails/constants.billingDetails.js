export const BILLING_DETAILS_FORM = {
  ['Billing name']: {
    name: 'name',
    label: 'Billing name',
    validationRules: {
      required: "It's required",
    },
  },
  ['Email Address']: {
    name: 'emailId',
    label: 'Email Address',
    validationRules: {
      required: "It's required",
    },
  },
};

export const BUSINESS_BILLING_FORM = {
  ['Organisation name']: {
    name: 'organization',
    label: 'Organization name',
    validationRules: {
      required: "It's required",
      minLength: {
        value: 3,
        message: 'Organization name should be minimum 3 character long',
      },
      maxLength: {
        value: 100,
        message: 'Organization name should be maximum 100 character long',
      },
    },
  },
  ['Taxation']: {
    name: 'gstNo',
    label: 'Taxation (GST Number)',
    validationRules: {
      required: "It's required",
    },
  },
  ['Email Address']: {
    name: 'emailId',
    label: 'Email Address',
    validationRules: {
      required: "It's required",
    },
  },
  ['Cost Center']: {
    name: 'costCenter',
    label: 'Cost centre',
    validationRules: {},
  },
  ['PO number']: {
    name: 'poNumber',
    label: 'PO number',
    validationRules: {},
  },
  ['Department']: {
    name: 'department',
    label: 'Department',
    validationRules: {},
  },
  ['Purchase note']: {
    name: 'purchaseNote',
    label: 'Purchase note',
    validationRules: {},
  },
};
