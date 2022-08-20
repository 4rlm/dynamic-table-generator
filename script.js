// Create Elements and Set Attributes Dynamically 
var dynamicTableDisplay = document.getElementById('dynamic-table-display');
var dynamicTable = createAndSetEl('table', 'dynamic-table');
var dynamicTableHead = createAndSetEl('thead', 'dynamic-table-head');
var dynamicTableBody = createAndSetEl('tbody', 'dynamic-table-body');
var body = document.body;
var header = document.createElement('header');
var headerH1 = createAndSetEl('h1', 'heading');
var headerP = document.createElement('p');
var uploadDisplay = createAndSetEl('div', 'upload-display');
var uploadDisplayLabel = document.createElement('label');
uploadDisplayLabel.setAttribute('for', 'fileSelect');
var uploadDisplayButton = createAndSetEl('input', 'fileSelect');
uploadDisplayButton.setAttribute('type', 'file');
uploadDisplayButton.setAttribute('accept', '.csv');
var dynamicTableDisplay = createAndSetEl('div', 'dynamic-table-display');
var footer = document.createElement('footer');
var footerP = document.createElement('p')

// Display Remote CSV Buttons
var csv1Btn = createAndSetEl('button', 'csv1-btn');
var csv2Btn = createAndSetEl('button', 'csv2-btn');
var csv3Btn = createAndSetEl('button', 'csv3-btn');

// AOS Animation Settings
headerH1.setAttribute('data-aos', 'fade-up');
headerP.setAttribute('data-aos', 'fade-right');
csv1Btn.setAttribute('data-aos', 'fade-left');
csv2Btn.setAttribute('data-aos-delay', '400');
csv2Btn.setAttribute('data-aos', 'fade-left');
csv2Btn.setAttribute('data-aos-delay', '600');
csv3Btn.setAttribute('data-aos', 'fade-left');
csv3Btn.setAttribute('data-aos-delay', '800');

// Append Child to Elements
header.appendChild(headerH1);
header.appendChild(headerP);
body.appendChild(header);
uploadDisplay.appendChild(uploadDisplayLabel);
uploadDisplay.appendChild(uploadDisplayButton);
uploadDisplay.appendChild(csv1Btn);
uploadDisplay.appendChild(csv2Btn);
uploadDisplay.appendChild(csv3Btn);
body.appendChild(uploadDisplay);
body.appendChild(dynamicTableDisplay);
footer.appendChild(footerP);
body.appendChild(footer);

// Assign Text Content
headerH1.textContent = 'Dynamic Table Generator';
uploadDisplayLabel.textContent = 'Choose CSV to Upload & Display';
headerP.textContent = 'Upload .CSV file to display data and table dynamically.';
footerP.textContent = 'Testing';

csv1Btn.textContent = 'Cars CSV';
csv2Btn.textContent = 'People CSV';
csv3Btn.textContent = 'Sales CSV';

let dataToDisplay = [];
var remoteCSVpath = "csv/cars.csv";

// Helper Method to Create Element and Set Attribute
function createAndSetEl(docId, setId) {
  var newElement = document.createElement(docId);
  newElement.setAttribute('id', setId);
  return newElement;
}

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
function fetchRemoteCSV(func) {
  var file = remoteCSVpath;
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

// Calls fetchRemoteCSV on Load
window.onload = fetchRemoteCSV();

// Calls fetchRemoteCSV on Each of 3 Buttons
csv1Btn.onclick = function() {
  remoteCSVpath = "csv/cars.csv"
  fetchRemoteCSV();
};

csv2Btn.onclick = function() {
  remoteCSVpath = "csv/people.csv"
  fetchRemoteCSV();
};

csv3Btn.onclick = function() {
  remoteCSVpath = "csv/sales.csv"
  fetchRemoteCSV();
};


