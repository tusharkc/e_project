const filedManageAttendee = {
  gender: {
    id: 'gender',
    name: 'gender',
    options: [
      { value: 'Male', label: 'Male' },
      { value: 'Female', label: 'Female' },
    ],
    validationRules: {
      required: "It's Required Field",
    },
  },
  name: {
    id: 'name',
    name: 'name',
    label: 'Full name',
    validationRules: {
      minLength: {
        value: 3,
        message: 'Enter name at least 3 character long',
      },
      maxLength: {
        value: 100,
        message: 'Max 100 character allowed',
      },
      required: "It's Required Field",
    },
    showStar: true,
  },
  country: {
    id: 'country',
    name: 'country',
    validationRules: {
      required: "It's Required Field",
    },
  },
  state: {
    id: 'state',
    name: 'state',
    validationRules: {
      required: "It's Required Field",
    },
  },
  city: {
    id: 'city',
    name: 'city',
    validationRules: {
      required: "It's Required Field",
    },
  },
  phoneNo: {
    countryCode: {
      name: 'countryCode',
      validationRules: {
        required: "It's Required Field",
      },
    },
    number: {
      name: 'Number',
      validationRules: {
        required: "It's Required Field",
      },
    },
  },
  whatsAppNumber: {
    countryCode: {
      name: 'countryCode',
      validationRules: {
        required: "It's Required Field",
      },
    },
    number: {
      name: 'Number',
      validationRules: {
        required: "It's Required Field",
      },
    },
  },
  email: {
    id: 'email',
    name: 'email',
    label: 'Email address',
    validationRules: {
      required: "It's Required Field",
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: 'Entered value does not match email format',
      },
    },
    showStar: true,
  },
  licenseNo: {
    id: 'licenseNo',
    name: 'licenseNo',
    label: 'Practice License Number',
    validationRules: {},
  },
  memberId: {
    id: 'memberId',
    name: 'memberId',
    label: 'Membership ID',
    validationRules: {},
  },
};

export { filedManageAttendee };
