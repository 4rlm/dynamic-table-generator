// Important: First, create <div id="dynamic-table-display"></div> on HTML page to dynamically display table and data.

// Get html element to append dynamic table to.
var dynamicTableDisplay = document.getElementById('dynamic-table-display');

// Create table with id='dynamic-table'
var dynamicTable = document.createElement('table');
dynamicTable.setAttribute('id', 'dynamic-table');

// Create thead with id='dynamic-table-head'
var dynamicTableHead = document.createElement('thead');
dynamicTableHead.setAttribute('id', 'dynamic-table-head');

// Create tbody with id='dynamic-table-body'
var dynamicTableBody = document.createElement('tbody');
dynamicTableBody.setAttribute('id', 'dynamic-table-body');

let dataToDisplay = [];

// Appends Elements to Each Other and Top Parent dynamicTableDisplay
function appendToDynamicTableDisplay() {
  dynamicTable.appendChild(dynamicTableHead);
  dynamicTable.appendChild(dynamicTableBody);
  dynamicTableDisplay.appendChild(dynamicTable);
}

// Displays CSV Data to Table
function displayDataToTable() {
  clearTable();
  var headRow = document.createElement('tr');
  var headings = dataToDisplay[0];

  // Append TH to THead from First Row of CSV/Array
  for (const item of headings) {
    var headTh = document.createElement('th');
    headTh.textContent = item;
    headRow.appendChild(headTh);
  }
  dynamicTableHead.appendChild(headRow);

  // Append TD to TBody from 2nd Row of CSV/Array
  for (const array of dataToDisplay.slice(1)) {
    var bodyRow = dynamicTableBody.insertRow(0);
    for (const item of array) {
      var cell = bodyRow.insertCell();
      cell.innerHTML = item;
    }
  }
  appendToDynamicTableDisplay()
}

// Clear Table After Each Time Display Data Updates
function clearTable() {
  clearTableHelper(dynamicTableHead);
  clearTableHelper(dynamicTableBody);
}

// Helps clearTable()
function clearTableHelper(element) {
  while (element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }
}

// CSV Upload Button Calls getCsv()
document.getElementById('fileSelect').onclick = function(){
  getCsv();
}

// Get CSV Data, Then Send to getParsecsvdata(csvdata)
function getCsv() {
  let fileElement = document.getElementById('fileSelect');
  fileElement.addEventListener('change', function() {
    if (this.files && this.files[0]) {
        var myFile = this.files[0];
        var reader = new FileReader();
        reader.addEventListener('load', function (e) {
            let csvdata = e.target.result; 
            getParsecsvdata(csvdata); // calling function for parse csv data 
        });
        reader.readAsBinaryString(myFile);
    }
  });
}

// Parses CSV Data, then Sends to parsedData Array
function getParsecsvdata(csvdata) {
    dataToDisplay = [];
    let newLinebrk = csvdata.split("\n");
    for(let i = 0; i < newLinebrk.length; i++) {
      dataToDisplay.push(newLinebrk[i].split(","))
    }
    displayDataToTable();
}

// Fetches Remote CSV to Use as Default Display
function getDefaultCSV(func) {
  var file = "csv/cars.csv";
  var rawFile = new XMLHttpRequest();
  var allText;
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
      if(rawFile.readyState === 4)
          if(rawFile.status === 200 || rawFile.status == 0)
              allText = rawFile.responseText;
              if(func!=undefined && typeof(func) == "function"){
                  func(allText);
               }
  };
  rawFile.send();
  getParsecsvdata(rawFile.responseText);
}

// Calls getDefaultCSV on Load
window.onload = getDefaultCSV();

