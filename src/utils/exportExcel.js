import * as XLSX from 'xlsx';

export const exportToExcel = (ventas) => {

  const worksheet = XLSX.utils.json_to_sheet(ventas);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    'Ventas'
  );

  XLSX.writeFile(workbook, 'ventas.xlsx');
};