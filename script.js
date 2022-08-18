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

var cars = [];

function createCar(type, model, color, year) {
  const car = {type:type, model:model, color:color, year: year};
  cars.push(car);
}

createCar("Ford", "Escape", "black", 2010);
createCar("Toyota", "Prius", "silver", 2014);
createCar("Hyundai", "Sonata", "white", 2020);

function loopCars() {
  headRow = document.createElement('tr');
  headings = Object.keys(cars[0]);

  for (const item of headings) {
    var headTh = document.createElement('th');
    headTh.textContent = item;
    headRow.appendChild(headTh);
  }
  
  dynamicTableHead.appendChild(headRow);

  for (const object of cars) {
    var bodyRow = dynamicTableBody.insertRow(0);

    for (const key in object) {
      var cell = bodyRow.insertCell();
      cell.innerHTML = object[key];
    }
  }
}

dynamicTable.appendChild(dynamicTableHead);
dynamicTable.appendChild(dynamicTableBody);
dynamicTableDisplay.appendChild(dynamicTable);

loopCars();

////////////////////////////////////////////





