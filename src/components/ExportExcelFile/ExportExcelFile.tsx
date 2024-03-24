import React from 'react';
import * as XLSX from 'xlsx';

import Button from '@mui/material/Button';
interface PropsExport {
    data:any,
    fileName:string
}
const ExportExcelFile:React.FC<PropsExport> = ({ data, fileName }) => {
  const exportToExcel = () => {
    if (!Array.isArray(data) || data.length === 0) {
      console.error('Data is either not an array or is empty');
      return;
    }

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${fileName}${new Date().toLocaleString()}.xlsx`);
  };

  return (
    <Button onClick={exportToExcel} type="button" variant="outlined" size="small" color='success' className='flex items-center'>
     <i className="fa-regular fa-file-excel text-[16px] mr-1"/>Export to Excel
    </Button>
  );
};

export default ExportExcelFile;
