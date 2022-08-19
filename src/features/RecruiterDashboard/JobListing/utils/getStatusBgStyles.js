export const statusBgStyles = (status) => {
  if (status == 'Draft') {
    return 'bg-info';
  } else if (status == 'Rejected') {
    return 'bg-danger';
  } else if (status == 'Active') {
    return 'bg-active-green';
  } else if (status == 'ActivationRequested') {
    return 'bg-warning';
  } else if (status == 'Closed') {
    return 'bg-grey-600';
  } else if (status == 'Cancelled') {
    return 'bg-black';
  }
};
