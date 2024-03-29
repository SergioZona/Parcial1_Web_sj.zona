const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

//Punto 2. Dar click agrega.

let productsDict = {};

function readData(callback) {
  fetch(url)
    .then((res) => res.json())
    .then((res) => callback(res));
}

// Página de inicio
function iniciarPagina(data) {
  // Se obtiene la sección del HTML que será modificada dinámicamente.
  let cards = document.getElementById("cards");
  let title = document.getElementById("product-name");
  if (data[0].name == "Burguers") {
    title.innerHTML = "Burgers";
  } else {
    title.innerHTML = data[0].name;
  }

  data[0].products.forEach((product) => {
    let card = `<div class="col-3 d-flex align-items-stretch"">
            <div class="card " style="width: 18rem;">
              <img class="card-img-top" src="${product.image}" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title font-weight-bold">${product.name}</h5>
                <p class="card-text text-justify">${product.description}</p>
                <p class="card-text font-weight-bold">$${product.price}</p>
                <a class="btn btn-dark text-white carrito">Add To Car</a>
              </div>
            </div>
            </div>`;
    cards.innerHTML += card; //Se agregan los datos.
  });
}

readData(iniciarPagina);

// Funcionalidad 1.
function cambiarProducto(data, column) {
  let title = document.getElementById("product-name");
  title.innerHTML = column;
  if (column == "Burgers") {
    column = "Burguers";
  } else if (column == "Drinks &amp; Slides") {
    column = "Drinks and Sides";
  }

  let cards = document.getElementById("cards");
  cards.innerHTML = ""; //Se eliminan los productos anteriores.

  let total = document.getElementById("product-name");
  total.innerHTML = "";

  data.forEach((element) => {
    if (element.name == column) {
      element.products.forEach((product) => {
        let card = `<div class="col-3 d-flex align-items-stretch">
            <div class="card " style="width: 18rem;">
              <img class="card-img-top" src="${product.image}" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title font-weight-bold">${product.name}</h5>
                <p class="card-text text-justify">${product.description}</p>
                <p class="card-text font-weight-bold">$${product.price}</p>
                <a class="btn btn-dark text-white carrito">Add To Car</a>
              </div>
            </div>
            </div>`;
        cards.innerHTML += card; //Se agregan los datos.
      });
    }
  });
  let totalFactura = document.getElementById("total-factura");
  totalFactura.innerHTML = "";
  agregarItem();
}

function clickBanner(data) {
  let banner = document.getElementsByClassName("nav-link");
  for (let i = 0; i < banner.length; i++) {
    banner[i].addEventListener("click", function () {
      cambiarProducto(data, banner[i].innerHTML);
    });
  }
}
readData(clickBanner);

// Funcionalidad 2 y 3.
function agregarItem(data) {
  res=data;
  let addToCart = document.getElementsByClassName(
    "btn btn-dark text-white carrito"
  );

  for (let i = 0; i < addToCart.length; i++) {
    addToCart[i].addEventListener("click", function () {

      let items = document.getElementById("items");
      values = items.innerHTML.split(" ");
      items.innerHTML = `${values[0]} ${parseInt(values[1]) + 1}`; //Se eliminan los productos anteriores.

      // Se agregan los valores al diccionario si no existe. En caso de que exista se suma 1.
      let precioUnidad = parseFloat(
        addToCart[i].parentNode.childNodes[5].innerHTML.toString().trim().replace("$", ""));

      temp = new Array();
      if (
        productsDict[addToCart[i].parentNode.childNodes[1].innerHTML] == null
      ) {
        temp.push(1); // Cantidad. Se inicializa la cantidad inicial.
        temp.push(precioUnidad); // Precio unidad. Se inicializa el precio por unidad.
        temp.push(precioUnidad); // Monto producto. Se inicializa el precio de todas las unidades.
        productsDict[addToCart[i].parentNode.childNodes[1].innerHTML] = temp;
      } else {
        temp.push(
          productsDict[addToCart[i].parentNode.childNodes[1].innerHTML][0] + 1
        ); // Cantidad. Se agrega uno al valor existente.
        temp.push(precioUnidad); // Precio unidad. Permanece constante.
        temp.push(
          parseFloat(
            productsDict[addToCart[i].parentNode.childNodes[1].innerHTML][2]
          ) + precioUnidad
        ); // Monto producto. Se agrega el precio del producto al monto actual.
        productsDict[addToCart[i].parentNode.childNodes[1].innerHTML] = temp;
      }
    });
  }
}
readData(agregarItem);

// Funcionalidad 3.
function mostrarResumenPedido(data) {
  res=data;
  let carrito = document.getElementById("carrito");
  carrito.addEventListener("click", function () {
    let title = document.getElementById("product-name");
    title.innerHTML = "Order detail";

    let tabla = document.getElementById("cards");
    let row = `<table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">Item</th>
        <th scope="col">Qty.</th>
        <th scope="col">Description</th>
        <th scope="col">Unit Price</th>
        <th scope="col">Amount</th>
        <th scope="col">Modify</th>
      </tr>
    </thead>
    <tbody id="table-factura"></tbody>`;
    tabla.innerHTML = row;

    total = 0;
    cont = 0;
    // Se genera la segunda tabla.
    for (const [key, value] of Object.entries(productsDict)) {
      let tablaFactura = document.getElementById("table-factura");
      let row = `<tr id="${key}">
                 <td class="font-weight-bold">${(cont += 1)}</td>
                 <td >${value[0]}</td>
                 <td >${key}</td>
                 <td >${parseFloat(value[1]).toFixed(2)}</td>
                 <td >${parseFloat(value[2]).toFixed(2)}</td>
                 <td ><button class="btn btn-dark text-white agregar">+</button>
                      <button class="btn btn-dark text-white quitar">-</button></td>
                 </tr>`;
      total += parseFloat(value[2]);
      tablaFactura.innerHTML += row; //Se agregan los datos de evento y correlación a la tabla.
    }

    let totalFactura = document.getElementById("total-factura");
    row = `
          <div class="row">
          <div class="col-9">
               <p class="font-weight-bold" id="value-total-factura">Total: $${parseFloat(total).toFixed(2)}</p>
          </div>
          <div class="col-1">
               <button class="btn btn-danger text-dark" id="cancelCompra" data-toggle="modal" data-target="#modal">Cancel</button>
          </div>
          <div class="col-2">
              <button class="btn btn-light text-dark btn-outline-dark" id="confirmCompra">Confirm order</button></td>
          </div>
          </div>`;
    totalFactura.innerHTML = row;
    readData(agregarItem);
    readData(modificarOrden);
    readData(cancelarCompra);
    readData(confirmarCompra);
  });
}

readData(mostrarResumenPedido);

// Funcionalidad 4.
function modificarOrden(data) {
  res=data;
  let botones_agregar = document.getElementsByClassName(
    "btn btn-dark text-white agregar"
  );
  let botones_quitar = document.getElementsByClassName(
    "btn btn-dark text-white quitar"
  );

  for (let i = 0; i < botones_agregar.length; i++) {
    botones_agregar[i].addEventListener("click", function () {
      let items = document.getElementById("items");
      values = items.innerHTML.split(" ");
      items.innerHTML = `${values[0]} ${parseInt(values[1]) + 1}`; //Se agrega un elemento al carrito de compras.

      let producto =
        botones_agregar[i].parentNode.parentNode.childNodes[5].innerHTML;
      let cantidad = productsDict[producto][0];
      let unidad = productsDict[producto][1];
      let monto = productsDict[producto][2];

      botones_agregar[i].parentNode.parentNode.childNodes[3].innerHTML =
        parseInt(cantidad) + 1;
      botones_agregar[i].parentNode.parentNode.childNodes[7].innerHTML =
        parseFloat(unidad).toFixed(2);
      botones_agregar[i].parentNode.parentNode.childNodes[9].innerHTML = (
        parseFloat(monto) + parseFloat(unidad)
      ).toFixed(2);

      let temp = Array();

      temp.push(parseInt(cantidad) + 1);
      temp.push(parseFloat(unidad).toFixed(2));
      temp.push((parseFloat(monto) + parseFloat(unidad)).toFixed(2));

      productsDict[producto] = temp;

      // Se actualiza el total.
      let arrayTemp = new Array();
      total = 0;
      for (const [key, value] of Object.entries(productsDict)) {
        arrayTemp[0] = key;
        total += parseFloat(value[2]);
      }
      totalFactura = document.getElementById("value-total-factura");
      totalFactura.innerHTML = `Total: $${parseFloat(total).toFixed(2)}`;
    });
  }

  for (let i = 0; i < botones_quitar.length; i++) {
    botones_quitar[i].addEventListener("click", function () {
      let items = document.getElementById("items");
      values = items.innerHTML.split(" ");
      let numItems = parseInt(values[1]) - 1 <= 0 ? 0 : parseInt(values[1]) - 1;
      items.innerHTML = `${values[0]} ${numItems}`; //Se eliminan un elemento en el carrito de compras.

      let producto =
        botones_agregar[i].parentNode.parentNode.childNodes[5].innerHTML;
      let cantidad = productsDict[producto][0];
      let unidad = productsDict[producto][1];
      let monto = productsDict[producto][2];

      let temp = Array();

      if (parseInt(cantidad) - 1 <= 0) {
        botones_agregar[i].parentNode.parentNode.childNodes[3].innerHTML = 0;
        botones_agregar[i].parentNode.parentNode.childNodes[7].innerHTML =
          parseFloat(unidad).toFixed(2);
        botones_agregar[i].parentNode.parentNode.childNodes[9].innerHTML =
          parseFloat(0).toFixed(2);

        temp.push(0);
        temp.push(parseFloat(unidad).toFixed(2));
        temp.push(parseFloat(0));
      } else {
        botones_agregar[i].parentNode.parentNode.childNodes[3].innerHTML =
          parseInt(cantidad) - 1;
        botones_agregar[i].parentNode.parentNode.childNodes[7].innerHTML =
          parseFloat(unidad).toFixed(2);
        botones_agregar[i].parentNode.parentNode.childNodes[9].innerHTML = (
          parseFloat(monto) - parseFloat(unidad)
        ).toFixed(2);

        temp.push(parseInt(cantidad) - 1);
        temp.push(parseFloat(unidad).toFixed(2));
        temp.push((parseFloat(monto) - parseFloat(unidad)).toFixed(2));
      }

      productsDict[producto] = temp;

      // Se actualiza el total.
      let arrayTemp = new Array();
      total = 0;
      for (const [key, value] of Object.entries(productsDict)) {
        arrayTemp[0] = key;
        total += parseFloat(value[2]);
      }
      totalFactura = document.getElementById("value-total-factura");
      totalFactura.innerHTML = `Total: $${parseFloat(total).toFixed(2)}`;
    });
  }
}

readData(modificarOrden);

// Funcionalidad 5.
function cancelarCompra(data) {
  res=data;
  let cancel = document.getElementById("cancelCompra");

  cancel.addEventListener("click", function () {
    $("#modal").modal();

    // Ejecución dentro del modal.
    let confirm2 = document.getElementById("confirm-button-modal");
    confirm2.addEventListener("click", function () {
      productsDict = {};
      generarTabla(productsDict);
      $("#modal").modal("hide");
    });
  });
}

// Funcionalidad 6.
function confirmarCompra(data) {
  res=data;
  let confirm = document.getElementById("confirmCompra");
  confirm.addEventListener("click", function () {
    let cont = 0;
    let array = new Array();
    for (const [key, value] of Object.entries(productsDict)) {
      if (value[0] != 0) {
        let set = {};
        set["item"] = cont;
        set["quantity"] = value[0];
        set["description"] = key;
        set["unitPrice"] = value[2];
        array[cont] = set;
        cont = cont + 1;
      }
    }
    console.log(array);
  });
}

function generarTabla(productsDict) {
  eliminarProducto(productsDict);

  total = 0;
  cont = 0;
  let tablaFactura = document.getElementById("table-factura");
  tablaFactura.innerHTML = "";

  // Se genera la segunda tabla.
  for (const [key, value] of Object.entries(productsDict)) {
    let tablaFactura = document.getElementById("table-factura");
    tablaFactura.innerHTML = "";

    let row = `<tr id="${key}">
               <td class="font-weight-bold">${(cont += 1)}</td>
               <td >${value[0]}</td>
               <td >${key}</td>
               <td >${parseFloat(value[1]).toFixed(2)}</td>
               <td >${parseFloat(value[2]).toFixed(2)}</td>
               <td ><button class="btn btn-dark text-white agregar">+</button>
                    <button class="btn btn-dark text-white quitar">-</button></td>
               </tr>`;
    total += parseFloat(value[2]);
    tablaFactura.innerHTML += row; //Se agregan los datos de evento y correlación a la tabla.
  }

  let totalFactura = document.getElementById("total-factura");
  row = `
        <div class="row">
        <div class="col-9">
             <p class="font-weight-bold" id="value-total-factura">Total: $${parseFloat(total).toFixed(2)}</p>
        </div>
        <div class="col-1">
             <button class="btn btn-danger text-dark" id="cancel-button-factura" data-toggle="modal" data-target="#modal">Cancel</button>
        </div>
        <div class="col-2">
            <button class="btn btn-light text-dark btn-outline-dark" id="confirm-button-factura" data-toggle="modal" data-target="#modal">Confirm order</button></td>
        </div>
        </div>`;
  totalFactura.innerHTML = row;
  modificarOrden();
}

function eliminarProducto(productsDict) {
  for (const [key, value] of Object.entries(productsDict)) {
    if (parseInt(value[0]) == 0) {
      delete productsDict[key];
    }
  }
}
