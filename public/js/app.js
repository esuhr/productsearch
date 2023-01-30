var socket = io();

var searchForm = document.getElementById('searchForm');
var searchInput = document.getElementById('autoComplete');
var searchResult = document.getElementById('searchResult');

var products;
var ingredients;

socket.on('init', (data) => {
  // preload data
  products = data;
  // initialize autocomplete
  var autoCompleteJS = new autoComplete({
    placeHolder: 'Search for products...',
    data: {
      src: products,
      keys: ['name']
    },
    resultItem: {
      highlight: true,
    },
    submit: true,
  });

  autoCompleteJS.input.addEventListener('selection', (e) => {
    const data = e.detail;
    // prep selected value
    const selection = data.selection.value[data.selection.key];
    // replace input field with selected value
    autoCompleteJS.input.value = selection;
  });
  
});

socket.on('searchResult', (data) => {
  // console.log(data)
  searchResult.innerHTML = '';
  createTable(data);
});

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('search', searchInput.value);
});


function createTable (data) {
  var table = document.createElement('table');
  var tableHeader = document.createElement('tr');
  var tableHeaderTH = document.createElement('TH');
  var tableHeaderText = document.createTextNode(data.product.name.toUpperCase() + ' INGREDIENT CHECK');
  tableHeaderTH.colSpan = 2;
  tableHeaderTH.appendChild(tableHeaderText);
  tableHeader.appendChild(tableHeaderTH);
  table.appendChild(tableHeader);
  var tr = document.createElement('tr');
  var col1 = document.createElement('td');
  var col2 = document.createElement('td');
  var col1text = document.createTextNode('INGREDIENTS');
  var col2text = document.createTextNode('ECZEMA');
  col1.appendChild(col1text);
  col2.appendChild(col2text);
  tr.appendChild(col1);
  tr.appendChild(col2);
  table.appendChild(tr);
  for(let i = 0; i < data.product.ingredients.length; i++) {
    var tr = document.createElement('tr');
    var tdIngredient = document.createElement('td');
    var tdMark = document.createElement('td');
    var tdIngredientText = document.createTextNode(data.product.ingredients[i].toUpperCase());
    var tdMarkText = document.createTextNode(data.condition[i].toUpperCase());
    tdIngredient.appendChild(tdIngredientText);
    tdMark.appendChild(tdMarkText);
    tr.appendChild(tdIngredient);
    tr.appendChild(tdMark);
    table.appendChild(tr);
  };
  searchResult.appendChild(table);
};