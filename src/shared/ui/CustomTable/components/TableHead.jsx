import { DoctTypography } from '@doct-react/core';

export default function TableHead({ column }) {
  return (
    <div className="bg-grey-100 d-flex px-3 custom-tabel-row-head">
      {column.map((el) => {
        return (
          <DoctTypography
            key={el.title}
            variant="textLabel2"
            className={`text-grey-400 flex-1 px-2 my-0 custom-tabel-th d-flex align-items-center ${
              el.key?.toLowerCase() || ''
            }`}
          >
            {el.title}
          </DoctTypography>
        );
      })}
    </div>
  );
}
