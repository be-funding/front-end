import * as XLSX from 'xlsx';

interface GenericData {
  [key: string]: string | number | boolean | undefined;
}

export interface ClientsExcelDownloadProps {
  filteredData: GenericData[];
  name: string;
}

export const useClientsExcelDownload = ({
  filteredData,
  name
}: ClientsExcelDownloadProps): { handleDownloadExcel: () => void } => {
  const handleDownloadExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredData);
    XLSX.utils.book_append_sheet(wb, ws, name);
    const filename = `${name}_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, filename);
  };

  return { handleDownloadExcel };
};
