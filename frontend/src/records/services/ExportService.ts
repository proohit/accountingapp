export const exportToCsv = (rows: unknown[], fields: string[]) => {
  const headersString = fields.join(',');
  const rowsString = rows
    .map((data) => {
      const singleRow = [];
      fields.forEach((header) => {
        singleRow.push(data[header]);
      });
      return singleRow.join(',');
    })
    .join('\n');
  const csvContent = `data:text/csv;charset=utf-8,${headersString}\n${rowsString}`;
  const encodedUri = encodeURI(csvContent);
  downloadFile(encodedUri, 'records.csv');
};

export const exportToJson = (rows: unknown[], fields: string[]) => {
  const data = rows?.map((row) => {
    return Object.fromEntries(
      Object.entries(row).filter((entry) => fields.includes(entry[0]))
    );
  });
  const dataStr =
    'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
  downloadFile(dataStr, 'records.json');
};

const downloadFile = (content: string, fileName: string) => {
  var link = document.createElement('a');
  link.setAttribute('href', content);
  link.setAttribute('download', fileName);
  document.body.appendChild(link); // Required for FF
  link.click(); // This will download the data file named "my_data.csv".
};
