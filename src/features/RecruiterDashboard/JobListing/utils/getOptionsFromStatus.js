export const getOptionsFromStatus = (status) => {
  let options;
  switch (status) {
    case 'Draft':
      options = [{ title: 'Edit Draft' }, { title: 'Delete Draft' }];
      break;

    case 'Active':
      options = [
        { title: 'Duplicate Job' },
        { title: 'Preview Job' },
        { title: 'Close Job', className: 'text-danger' },
      ];
      break;

    case 'ActivationRequested':
      options = [{ title: 'Preview Job' }, { title: 'Cancel Post', className: 'text-danger' }];
      break;

    case 'Closed':
      options = [{ title: 'Duplicate Post' }, { title: 'Preview Job' }];
      break;

    case 'Cancelled':
      options = [{ title: 'Edit Post' }, { title: 'Delete Post' }];
      break;

    default:
      break;
  }

  return options;
};
