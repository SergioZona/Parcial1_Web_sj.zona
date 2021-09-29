const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

//Punto 2. Dar click agrega.
const but = document.getElementsByName("agregar");
let visualizer = "";

but.onclick = agregarItem;
function agregarItem() {
  let valor = document.getElementById("num-items").value;
  console.log(valor);
  document.getElementById("num-items").innerHTML = valor++;
}

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
  if(data[0].name=="Burguers"){
    title.innerHTML = "Burgers";
  }
  else{
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
                <a class="btn btn-dark text-white">Add To Car</a>
              </div>
            </div>
            </div>`;
    cards.innerHTML += card; //Se agregan los datos.
  });
}

readData(iniciarPagina);

// Funcionalidad 1.
function cambiarProducto(data, column){
  let title = document.getElementById("product-name");
  title.innerHTML = column;
  if(column=="Burgers"){
    column = "Burguers";
  }
  else if(column == "Drinks &amp; Slides")
  {
    column = "Drinks and Sides";
  }
  
  let cards = document.getElementById("cards");
  cards.innerHTML = ""; //Se eliminan los productos anteriores.

  data.forEach((element) => {
    if(element.name == column){
      element.products.forEach((product) => {
        let card = `<div class="col-3 d-flex align-items-stretch"">
            <div class="card " style="width: 18rem;">
              <img class="card-img-top" src="${product.image}" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title font-weight-bold">${product.name}</h5>
                <p class="card-text text-justify">${product.description}</p>
                <p class="card-text font-weight-bold">$${product.price}</p>
                <a class="btn btn-dark text-white">Add To Car</a>
              </div>
            </div>
            </div>`;
        cards.innerHTML += card; //Se agregan los datos.
      });
    }    
  });  
}

function clickBanner(data){
  let headers = document.getElementsByClassName("nav-link");
  for (let i = 0; i < headers.length; i++) {
      headers[i].addEventListener('click', function(){
        cambiarProducto(data, headers[i].innerHTML);
      });
  }
}

readData(clickBanner);
   
// Funcionalidad 2s.
