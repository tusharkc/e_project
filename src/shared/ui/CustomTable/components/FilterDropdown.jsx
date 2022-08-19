import { DoctDropdownSelect } from '@doct-react/app';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FilterDropdown({ dropdownMenuItems, dropdownMenuDefaultSelected }) {
  const navigate = useNavigate();

  const [dropdownValue, setDropdownValue] = useState('');

  const handleChange = (event) => {
    const { code } = dropdownMenuItems.find(({ id }) => id == event.target.value) || {};
    navigate({
      search: `?id=${event.target.value}${code ? `&code=${code}` : ''}`,
    });
  };

  useEffect(() => {
    setDropdownValue(dropdownMenuDefaultSelected);
  }, [dropdownMenuDefaultSelected]);

  if (dropdownMenuItems.length > 0 && dropdownValue) {
    return (
      <div className="dropdown-select dropdown-select-dashed">
        <DoctDropdownSelect
          value={dropdownValue}
          handleChange={handleChange}
          menuItems={dropdownMenuItems}
        />
      </div>
    );
  }
  return null;
}
