import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable, { CellDef, HAlignType, RowInput } from 'jspdf-autotable';
import * as Papa from 'papaparse';
import myFontData from '../../../../assets/font/chinesefont';
import { ProductsService } from '../../../service/system/product.service';
import { Dialog } from './dialog.component';

interface ITransaction {
  item: number;
  accountCode: string;
  accountName: string;
  department: number;
  subject: string | null;
  description: string;
  debitAmount: number | null;
  creditAmount: number | null;
}

@Component({
  selector: 'app-report-pdf',
  templateUrl: './report-pdf.component.html',
  styleUrls: ['./report-pdf.component.scss']
})
export class ReportPDFComponent implements OnInit {
  rowData: ITransaction[] = [];
  importedProducts: Partial<ITransaction>[] = [];
  flattenedRowData: ITransaction[] = []; // 声明并初始化 flattenedRowData
  fileName: string = '尚未匯入任何檔案';
  currentDate: string = '';
  myfont: string = myFontData;
  signatureName: string = '簽名';

  cols: any[] = [
    { field: 'item', header: '項' },
    { field: 'accountCode', header: '會計科目' },
    { field: 'accountName', header: '科目名稱' },
    { field: 'department', header: '部門' },
    { field: 'subject', header: '對象別' },
    { field: 'description', header: '摘要' },
    { field: 'debitAmount', header: '借方金額' },
    { field: 'creditAmount', header: '貸方金額' },
  ];

  totalPrice: number = 0;

  constructor(
    private productsService: ProductsService,
    private http: HttpClient,
    public dialog: MatDialog,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.fetchProducts();
    this.currentDate = this.getCurrentDate();
  }

  fetchProducts() {
    this.http.get<any[]>('assets/demo/data/傳票列印_Table1.json').subscribe(
      (data) => {
        console.log('Fetched data:', data); // Debugging line
        if (Array.isArray(data)) {
          this.rowData = data.map(item => ({
            item: item['項'],
            accountCode: item['會計科目'],
            accountName: item['科目名稱'],
            department: item['部門'],
            subject: item['對象別'],
            description: item['摘    要'],
            debitAmount: item['借方金額'],
            creditAmount: item['貸方金額'],
          }));
          this.updateFlattenedRowData(); // 更新合并后的数据
        } else {
          console.error('Data fetched is not an array:', data);
        }
      },
      (error) => {
        console.error('Error fetching products:', error);
      },
    );
  }

  private updateFlattenedRowData() {
    this.flattenedRowData = [
      ...this.rowData,
      ...this.importedProducts.map(item => ({
        item: item.item ?? 0,
        accountCode: item.accountCode ?? '',
        accountName: item.accountName ?? '',
        department: item.department ?? 0,
        subject: item.subject ?? null,
        description: item.description ?? '',
        debitAmount: item.debitAmount ?? 0,
        creditAmount: item.creditAmount ?? 0,
      }) as ITransaction)
    ];
    this.updateTotalPrice();
  }

  private updateTotalPrice() {
    this.totalPrice = this.flattenedRowData.reduce((sum, row) => sum + (row.debitAmount || 0), 0);
  }

  getCurrentDate(): string {
    return this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;
  }

  exportToExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.flattenedRowData);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    XLSX.writeFile(workbook, 'filtered_data.xlsx');
  }

  exportToPDF() {
    const doc = new jsPDF('portrait');
    const fontBase64 = this.myfont;
    doc.addFileToVFS('C', fontBase64);
    doc.addFont('C', 'A', 'normal');
    doc.setFont('A');
  
    const colNames = this.cols.map(col => col.header);
    const maxRowsPerPage = 20;
  
    // 合并 rowData 和 importedProducts
    const mergedData = [
      ...this.rowData,
      ...this.importedProducts.map(item => ({
        item: item.item ?? 0,
        accountCode: item.accountCode ?? '',
        accountName: item.accountName ?? '',
        department: item.department ?? 0,
        subject: item.subject ?? null,
        description: item.description ?? '',
        debitAmount: item.debitAmount ?? 0,
        creditAmount: item.creditAmount ?? 0,
      }) as ITransaction)
    ];
  
    const grandDebitTotal = mergedData.reduce((sum, row) => sum + (row.debitAmount || 0), 0);
    const grandCreditTotal = mergedData.reduce((sum, row) => sum + (row.creditAmount || 0), 0);
  
    const addFooter = (doc: jsPDF, pageNumber: number, totalPages: number) => {
      const startX = 14;
      const pageWidth = doc.internal.pageSize.width - startX * 2;
      const footerStartY = doc.internal.pageSize.height - 50;
  
      const footerData: RowInput[] = [
        [{ content: '傳票備註', colSpan: 4, styles: { halign: 'left' as HAlignType } }],
        ['核准', '覆核', '製票', '稽核'].map((text): CellDef => ({ content: text, styles: { halign: 'center' as HAlignType } })),
        ['', '', this.signatureName, ''].map((text): CellDef => ({ content: text, styles: { halign: 'center' as HAlignType } }))
      ];
  
      autoTable(doc, {
        startY: footerStartY,
        margin: { left: startX },
        body: footerData,
        styles: { font: 'A', halign: 'center' as HAlignType, valign: 'middle', lineWidth: 0.5, lineColor: 0 },
        theme: 'grid',
        tableWidth: 'auto',
        columnStyles: {
          0: { cellWidth: pageWidth / 4 },
          1: { cellWidth: pageWidth / 4 },
          2: { cellWidth: pageWidth / 4 },
          3: { cellWidth: pageWidth / 4 },
        },
        didDrawCell: data => {
          if (data.section === 'body' && data.column.index === 0 && (data.cell.raw as CellDef).content === '傳票備註') {
            const cell = data.cell;
            doc.setDrawColor(0);
            doc.setLineWidth(0.5);
            const textWidth = doc.getTextWidth((data.cell.raw as CellDef).content as string);
            doc.line(cell.x + textWidth + 2, cell.y, cell.x + textWidth + 2, cell.y + cell.height);
          }
        }
      });
    
      doc.setFontSize(12);
      doc.text(`頁次: ${pageNumber}/${totalPages}`, doc.internal.pageSize.width - 50, 10);
      doc.text(`借方金額: ${grandDebitTotal}`, doc.internal.pageSize.width - 50, 20);
      doc.text(`貸方金額: ${grandCreditTotal}`, doc.internal.pageSize.width - 50, 30);
    };
  
    const addHeader = (doc: jsPDF) => {
      doc.setFontSize(12);
      doc.text('帳別: 總公司', 14, 10);
      doc.text(`傳票日期: ${this.currentDate}`, 14, 20);
      doc.text('傳票編號: 240131000061', 14, 30);
  
      doc.setFontSize(18);
      const pageWidth = doc.internal.pageSize.width;
      const companyText = '100順儷健康事業股份有限公司';
      const voucherText = '轉帳傳票';
      const companyTextWidth = doc.getTextWidth(companyText);
      const voucherTextWidth = doc.getTextWidth(voucherText);
      const xPositionCompany = (pageWidth - companyTextWidth) / 2;
      const xPositionVoucher = (pageWidth - voucherTextWidth) / 2;
  
      doc.text(companyText, xPositionCompany, 22);
      doc.text(voucherText, xPositionVoucher, 30);
    };
  
    let lastY = 40; // 初始Y坐标
    let currentPage = 0;
    const totalPages = Math.ceil(mergedData.length / maxRowsPerPage);
    let remainingData = [...mergedData]; // 声明并初始化 remainingData
  
    while (remainingData.length > 0) {
      const pageData = remainingData.slice(0, maxRowsPerPage);
      remainingData = remainingData.slice(maxRowsPerPage);
  
      if (currentPage > 0) {
        doc.addPage();
        lastY = 40; // 新页面的初始Y坐标
      }
  
      autoTable(doc, {
        startY: lastY,
        margin: { top: 50 },
        head: [colNames],
        body: pageData.map(data => [
          data.item,
          data.accountCode,
          data.accountName,
          data.department,
          data.subject,
          data.description,
          data.debitAmount,
          data.creditAmount
        ]),
        styles: { font: 'A', lineWidth: 0.5, lineColor: 0 },
        didDrawPage: (data) => {
          const pageNumber = currentPage + 1;
          addHeader(doc);
          addFooter(doc, pageNumber, totalPages);
        },
        didDrawCell: (data: any) => { // 明确类型为 any
          if (data.cursor) {
            lastY = data.cursor.y; // 更新最后绘制的Y坐标
          }
        }
      });
  
      currentPage++;
    }
  
    doc.save('merged_data.pdf');
  }
  
  
  
  
  
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file: File = input.files[0];
      this.fileName = file.name;
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result: Papa.ParseResult<any>) => {
          this.importedProducts = result.data.map((item: any) => ({
            item: item['項'],
            accountCode: item['會計科目'],
            accountName: item['科目名稱'],
            department: item['部門'],
            subject: item['對象別'],
            description: item['摘    要'],
            debitAmount: item['借方金額'],
            creditAmount: item['貸方金額'],
          }));
          this.updateFlattenedRowData(); // 更新合并后的数据
        },
      });
    }
  }

  insertData() {
    const productsToInsert = this.importedProducts.map(transaction => ({
      商品編號: transaction.accountCode,
      code: transaction.item?.toString(),
      name: transaction.accountName,
      description: transaction.description,
      price: transaction.debitAmount || 0,
      category: '',
      quantity: 0,
      inventoryStatus: '',
      rating: 0,
    }));

    this.productsService.insertProducts(productsToInsert).subscribe(
      (response) => {
        this.openDialog('資料已正確匯入');
        this.fetchProducts();
      },
      (error) => {
        this.openDialog('資料匯入錯誤');
        this.clearImportedData();
      },
    );
  }

  openDialog(message: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { message: message };
    dialogConfig.panelClass = 'custom-dialog-container';
    const dialogRef = this.dialog.open(Dialog, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.clearImportedData();
    });
  }

  clearImportedData() {
    this.importedProducts = [];
    this.fileName = '尚未匯入任何檔案';
    this.updateFlattenedRowData(); // 确保清除后只保留 fetch 的数据
  }
}