var carTableHead = document.getElementById('car-table-head');
var carTableBody = document.getElementById('car-table-body');

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
  
  carTableHead.appendChild(headRow);

  for (const object of cars) {
    var bodyRow = carTableBody.insertRow(0);

    for (const key in object) {
      var cell = bodyRow.insertCell();
      cell.innerHTML = object[key];
    }
  }
}

loopCars();



