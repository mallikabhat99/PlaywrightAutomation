const ExeclJs = require('exceljs');

async function writeExcelTest(searchText,replaceText,filepath){
const workbook = new ExeclJs.Workbook();
await workbook.xlsx.readFile(filepath);
const worksheet = workbook.getWorksheet('Sheet1');
const output = await readExcel(worksheet ,searchText);



const cell = worksheet.getCell(output.row,output.col);
console.log(cell.value);
await workbook.xlsx.writeFile(filepath);
}


async function readExcel(worksheet ,searchText){
  let output = {row:-1,col:-1};

worksheet.eachRow((row, rowNumber) => {
  row.eachCell((cell, colNumber) => {
    console.log(cell.value);
    if(cell.value===searchText){
      output.row=rowNumber;
      output.col=colNumber;
    }
  })
});
  return output;

}
writeExcelTest("Banana","Generic","C:\\Users\\LAPTOPS24\\Downloads\\excel_download_test.xlsx");
