const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

//Punto 2. Dar click agrega.
const but = document.getElementsByName("agregar");
but.onclick = agregarItem;
function agregarItem() {
    let valor = document.getElementById("num-items").value;
    console.log(valor);
    document.getElementById("num-items").innerHTML = valor++;
}

fetch(url)
  .then((res) => res.json())
  .then((res) => {
    // Obtención de los datos del JSON.
    let cards = document.getElementById("cards");
    res.forEach((element) => {
      element.products.forEach((product) => {
        let card = `<div class="col-3">
        <div class="card" style="width: 18rem;">
          <img class="card-img-top" src="${product.image}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text">Precio: ${product.price}</p>
            <a class="btn btn-primary" onclick="agregarItem()">Add To Car</a>
          </div>
        </div>
        </div>`;
        cards.innerHTML += card; //Se agregan los datos.
      });

      //Punto 2. Dar click agrega.
      //const but = document.getElementsByName("agregar");
      //but.onclick = agregarItem;
    });
  });


