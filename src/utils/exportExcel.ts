import * as XLSX from 'xlsx';
import { Member } from '../models/member/index';

export const exportToExcel = (data: Member[], fileName: string) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Members');
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};