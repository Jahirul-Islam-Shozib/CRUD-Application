"use scrict";

var container2 = document.querySelector(".container2");
var overlay = document.querySelector(".overlay");
var container1 = document.querySelector(".container1");

function openWindow() {
  container2.classList.remove("hidden");
  overlay.classList.remove("hidden");
  container1.classList.add("hidden");
}

var buttonCreate = document.querySelector(".emp-btn-cont");
buttonCreate.addEventListener("click", openWindow);

function closeWindow() {
  container2.classList.add("hidden");
  overlay.classList.add("hidden");
  container1.classList.remove("hidden");
}

var buttonClose = document.querySelector(".submit-btn");
buttonClose.addEventListener("click", closeWindow);

var returnMainPage = document.querySelector(".return-btn");
returnMainPage.addEventListener("click", returnfst);

function returnfst() {
  container2.classList.add("hidden");
  container1.classList.remove("hidden");
}

///////////////////////////////////////////////////////////////////////////////////

var selectedRow = null;
var mainArray = [];

var dataFormStorage = JSON.parse(window.localStorage.getItem("localData"));
if (dataFormStorage) {
  mainArray = dataFormStorage;
  debugger;
  insertLocalData(mainArray);
}
function onSubmitForm() {
  closeWindow();
  event.preventDefault();
  var formData = null;
  inputData = readFormData();
  formData = inputData;
  if (selectedRow == null) {
    insertFormData(formData);
    mainArray.push(inputData);
  } else {
    updateData(formData);
  }
  localStorage.setItem("localData", JSON.stringify(mainArray));
  resetData();
  return;
}
function readFormData() {
  var inputData = {};
  inputData.name = document.getElementById("name").value;
  inputData.position = document.getElementById("position").value;
  inputData.gender = document.getElementById("gender").value;
  inputData.mobile = document.getElementById("mobile").value;
  inputData.email = document.getElementById("email").value;

  return inputData;
}

function insertFormData(formData) {
  var table = document
    .getElementById("storeList")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.length);
  var cell1 = newRow.insertCell(0);
  cell1.innerHTML = formData.name;
  var cell2 = newRow.insertCell(1);
  cell2.innerHTML = formData.position;
  var cell3 = newRow.insertCell(2);
  cell3.innerHTML = formData.gender;
  var cell4 = newRow.insertCell(3);
  cell4.innerHTML = formData.mobile;
  var cell5 = newRow.insertCell(4);
  cell5.innerHTML = formData.email;
  var cell6 = newRow.insertCell(5);
  cell6.innerHTML = `<button onclick="onEdit(this)">Edit</button>
  <button onclick="onDelete(this)">Delete</button>`;
}

function insertLocalData(previousData) {
  for (let i = 0; i < previousData.length; i++) {
    var table = document
      .getElementById("storeList")
      .getElementsByTagName("tbody")[0];
    var newRow = table.insertRow(table.length);
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = previousData[i].name;
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = previousData[i].position;
    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = previousData[i].gender;
    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = previousData[i].mobile;
    var cell5 = newRow.insertCell(4);
    cell5.innerHTML = previousData[i].email;
    var cell6 = newRow.insertCell(5);
    cell6.innerHTML = `<button onclick="onEdit(this)">Edit</button>
    <button onclick="onDelete(this)">Delete</button>`;
  }
}

function onEdit(table) {
  openWindow();
  selectedRow = table.parentElement.parentElement;
  debugger;
  document.getElementById("name").value = selectedRow.cells[0].innerHTML;
  document.getElementById("position").value = selectedRow.cells[1].innerHTML;
  document.getElementById("gender").value = selectedRow.cells[2].innerHTML;
  document.getElementById("mobile").value = selectedRow.cells[3].innerHTML;
  document.getElementById("email").value = selectedRow.cells[4].innerHTML;
}

function updateData(inputData) {
  selectedRow.cells[0].innerHTML = inputData.name;
  selectedRow.cells[1].innerHTML = inputData.position;
  selectedRow.cells[2].innerHTML = inputData.gender;
  selectedRow.cells[3].innerHTML = inputData.mobile;
  selectedRow.cells[4].innerHTML = inputData.email;
  mainArray[selectedRow.sectionRowIndex - 1] = inputData;
  debugger;
}
function onDelete(table) {
  selectedRow = table.parentElement.parentElement;
  if (confirm("Do you want to delete this record?")) {
    var row = table.parentElement.parentElement;
    debugger;
    mainArray.splice(selectedRow.sectionRowIndex - 1, 1);
    localStorage.setItem("localData", JSON.stringify(mainArray));
    debugger;
    document.getElementById("storeList").deleteRow(row.rowIndex);
  }
  resetData();
}

function resetData() {
  document.getElementById("name").value = "";
  document.getElementById("position").value = "";
  document.getElementById("gender").value = "";
  document.getElementById("mobile").value = "";
  document.getElementById("email").value = "";
}

function searchMatch(str1, str2) {
  for (let j = 0; j < str1.length; j++) {
    debugger;
    if (str1[j] === str2[0]) {
      var flag = true;
      for (let k = 0; k < str2.length; k++) {
        if (str1[j + k] === str2[k]) {
        } else {
          flag = false;
          break;
        }
      }
      if (flag === true) {
        return true;
      }
    }
  }
  return false;
}

function searchData() {
  var str = prompt("Enter Search Value");
  for (let i = 0; i < mainArray.length; i++) {
    debugger;
    var flag = searchMatch(mainArray[i].name, str);
  }
  if (flag === true) {
    console.log("Search Found");
  } else if (flag === false) {
    console.log(prompt("No Search Found. Search Again"));
  }
}

var searchInfo = document.querySelector(".empTbl-btn-cont");
searchInfo.addEventListener("click", searchData);
