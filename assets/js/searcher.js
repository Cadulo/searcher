const item = document.getElementById("product");
const buttonFilter = document.getElementById("filter");
const searchBar = document.getElementById("text");
let productsTotal = [];
let start = () => {
  loadProducts();
  buttonFilter.addEventListener("click", search);
};

let loadProducts = () => {
  fetch(
    "https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.json"
  )
    .then((response) => response.json())
    .then((products) => {
      display(products);
      productsTotal = productsTotal.concat(products);
      console.log(productsTotal);
    })
    .catch((error) => console.log(error));

  fetch(
    "https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.xml"
  )
    .then((response) => response.text())
    .then((result) => {
      let xml = new DOMParser().parseFromString(result, "application/xml");
      productsXml = xml.getElementsByTagName("product");
      let products = Array.from(productsXml).map((product) => {
        return {
          name: product.querySelector("name").innerHTML,
          price: product.querySelector("price").innerHTML,
          src: product.getElementsByTagName("src")[0].innerHTML,
          type: product.getElementsByTagName("type")[0].innerHTML,
        };
      });
      display(products);
      productsTotal = productsTotal.concat(products);
      console.log(productsTotal);
    })
    .catch((error) => console.log(error));
};

let display = (products) => {
  products.forEach((product) => {
    let template = ` <div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
            <div class="card card-blog card-plain">
              <div class="card-header p-0 mt-n4 mx-3">
                <a class="d-block shadow-xl border-radius-xl">
                  <img src="${product.src}" alt="${product.name}" class="img-fluid shadow border-radius-xl">
                </a>
              </div>
              <div class="card-body p-3">
                <p class="mb-0 text-sm">${product.type}</p>
                <a href="javascript:;">
                  <h5>
                    ${product.name}
                  </h5>
                </a>
                <p class="mb-4 text-sm">
                  <b>Price: </b> $ ${product.price}
                </p>
              </div>
            </div>
          </div>`;
    item.innerHTML += template;
  });
};

let search = () => {
  const searchString = searchBar.value.toLowerCase();
  const filteredProducts = productsTotal.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchString) ||
      product.type.toLowerCase().includes(searchString)
    );
  });
  console.log(filteredProducts);
  item.innerHTML = " ";
  display(filteredProducts);
};

window.addEventListener("DOMContentLoaded", start);
