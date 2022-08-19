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
let parsedData = [];
var fruits = [
  ['type', 'color', 'size', 'sweetness'],
  ['banana', 'yellow', 'medium', 'medium'],
  ['tomato', 'red', 'small', 'low'],
  ['watermelon', 'red', 'large', 'high'],
];

window.onload = setValueOfDataToDisplay();

function setValueOfDataToDisplay() {
  clearTable();

  if (parsedData.length) {
    dataToDisplay = parsedData;
  }else{
    dataToDisplay = fruits;
  };
  displayDataToTable();
}

function appendToDynamicTableDisplay() {
  dynamicTable.appendChild(dynamicTableHead);
  dynamicTable.appendChild(dynamicTableBody);
  dynamicTableDisplay.appendChild(dynamicTable);
}

function displayDataToTable() {
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

function clearTable() {
  dynamicTableHead.textContent = '';
  dynamicTableBody.textContent = '';
  dynamicTableDisplay.textContent = '';

  // while (dynamicTableDisplay.hasChildNodes()) {
  //   dynamicTableDisplay.removeChild(dynamicTable);
  //   // dynamicTableDisplay.removeChild(dynamicTableDisplay.firstChild);
  // }

  // while (dynamicTableDisplay.firstChild) {
  //   dynamicTableDisplay.removeChild(dynamicTableDisplay.lastChild);
  // }
}

////////////////////////////////////////

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

function fetchLocalFile() {
  const response = fetch('cars.csv')
   .then(response => response.text())
   .then(v => Papa.parse(v))
   .catch(err => console.log(err))
  response.then(v => console.log(v))
}

// Parses CSV Data, then Sends to parsedData Array
function getParsecsvdata(csvdata) {
    parsedData = [];
    let newLinebrk = csvdata.split("\n");
    for(let i = 0; i < newLinebrk.length; i++) {
        parsedData.push(newLinebrk[i].split(","))
    }
    setValueOfDataToDisplay();
}






