// src/components/admincomponent/CustomToolbar.jsx
import React from 'react';
import { GridToolbarContainer, useGridApiContext } from '@mui/x-data-grid';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import Button from './Button';

export default function CustomToolbar({ columns }) {
    // Lấy API của DataGrid
    const apiRef = useGridApiContext();
  
    // Hàm xuất Excel chuyên nghiệp
    const exportExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const ws = workbook.addWorksheet('Report');
        const metricCols = columns.filter(c => !['Year','Month','Day'].includes(c.field));
        const totalCols = 2 + metricCols.length; // No., Date, metrics
        let r = 1;

        // Header block
        ws.mergeCells(`A${r}:G${r}`);
        ws.getCell(`A${r}`).value = "PEOPLE'S PROCURACY";
        ws.getCell(`A${r}`).font = { bold: true };
        ws.getCell(`A${r}`).alignment = { horizontal: 'center' };
        r++;
        ws.mergeCells(`A${r}:G${r}`);
        ws.getCell(`A${r}`).value = '........................................................';
        ws.getCell(`A${r}`).alignment = { horizontal: 'center' };
        r++;
        ws.mergeCells(`A${r}:G${r}`);
        ws.getCell(`A${r}`).value = 'STATISTICAL MONITORING REPORT';
        ws.getCell(`A${r}`).font = { bold: true };
        ws.getCell(`A${r}`).alignment = { horizontal: 'center' };
        r++;
        ws.mergeCells(`A${r}:G${r}`);
        ws.getCell(`A${r}`).value = 'Date: DD/MM/YYYY';
        ws.getCell(`A${r}`).alignment = { horizontal: 'center' };
        r += 2;
    
        // Table header
        const headerRow = ws.getRow(r);
        headerRow.getCell(1).value = 'No.';
        headerRow.getCell(2).value = 'Date (DD/MM/YYYY)';
        metricCols.forEach((col, idx) => {
            headerRow.getCell(3 + idx).value = col.headerName;
        });
        headerRow.eachCell(cell => {
            cell.font = { bold: true };
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
            cell.border = {
                top: { style: 'thin' }, left: { style: 'thin' },
                bottom: { style: 'thin' }, right: { style: 'thin' }
            };
        });
        r++;
    
        // Data rows
        const rowModels = Array.from(apiRef.current.getRowModels().values());
        rowModels.forEach((rm, idx) => {
            const row = ws.getRow(r + idx);
            row.getCell(1).value = idx + 1;
            const y = rm.Year;
            const m = String(rm.Month).padStart(2, '0');
            const d = String(rm.Day).padStart(2, '0');
            row.getCell(2).value = `${d}/${m}/${y}`;
            metricCols.forEach((col, j) => {
                row.getCell(3 + j).value = rm[col.field];
            });
            row.eachCell(cell => {
                cell.alignment = { horizontal: 'center', vertical: 'middle' };
                cell.border = {
                    top: { style: 'thin' }, left: { style: 'thin' },
                    bottom: { style: 'thin' }, right: { style: 'thin' }
                };
            });
        });

        // Auto-width for all columns, minimal padding
        const columnWidths = [6, 25, ...Array(metricCols.length).fill(20)];
        columnWidths.forEach((width, i) => {
            const col = ws.getColumn(i + 1);
            col.width = width;
        });

        // Save Excel file
        const buf = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([buf]), 'Statistical_Report.xlsx');
    };
  
    // Hàm xuất PDF chuyên nghiệp
    const printPDF = () => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });
    
        const pageWidth = doc.internal.pageSize.getWidth();
    
        // === Header title ===
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text("STATISTICAL MONITORING REPORT", pageWidth / 2, 20, { align: 'center' });
    
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.text("Date: DD/MM/YYYY", pageWidth / 2, 28, { align: 'center' });  // Có thể thay thế bằng ngày thực tế
        doc.text("Reported by: John Doe", pageWidth / 2, 36, { align: 'center' });  // Có thể thay thế bằng người dùng thực tế
    
        // === Table content ===
        const metricCols = columns.filter(c => !['Year', 'Month', 'Day'].includes(c.field));
        const head = [['No.', 'Date', ...metricCols.map(c => c.headerName)]];
        const body = Array.from(apiRef.current.getRowModels().values()).map((rm, idx) => {
            const y = rm.Year;
            const m = String(rm.Month).padStart(2, '0');
            const d = String(rm.Day).padStart(2, '0');
            return [idx + 1, `${d}/${m}/${y}`, ...metricCols.map(c => rm[c.field])];
        });
    
        // === Render table ===
        autoTable(doc, {
            startY: 45, // sau phần header
            head,
            body,
            styles: { halign: 'center', fontSize: 9, cellPadding: 2 },
            headStyles: { fillColor: [40, 116, 166], textColor: 255, halign: 'center' },
            margin: { left: 14, right: 14 }
        });
    
        // === Save file ===
        doc.save('Statistical_Report.pdf');
    };
    
  
    return (
        <GridToolbarContainer>
            <Button onClick={exportExcel} size="small" sx={{ mr: 1 }} variant="contained">Export Excel</Button>       
            <Button onClick={printPDF} size="small" variant="contained">Print PDF</Button>
        </GridToolbarContainer>
    );
}
