import * as XLSX from 'xlsx';

export class ExcelService {
  constructor() { }

  exportTableToExcel(table: string, filename: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.querySelector(table));
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, filename + '.xlsx');
  }
}