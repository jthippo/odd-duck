// Sort out DOM Nodes
let productContainer = document.querySelector("section");
let image1 = document.querySelector("section img:first-child");
let image2 = document.querySelector("section img:nth-child(2)");
let image3 = document.querySelector("section img:last-child");

// Constructor to make Products
function Product(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.votes = 0;
}

// Function to choose a random Product
function getRandomProduct() {
  return Math.floor(Math.random() * allProducts.length);
}

// Make all Products in array
const allProducts = [
  new Product("Unspecificed Droid Bag", "./img/bag.jpg"),
  new Product("Fraudulent Banana Slicer", "./img/banana.jpg"),
  new Product("iWiper", "./img/bathroom.jpg"),
  new Product("Salacious Yellow Boots", "./img/boots.jpg"),
  new Product("Breakfast For Gnomes", "./img/breakfast.jpg"),
  new Product("Meatball Bubblegum", "./img/bubblegum.jpg"),
  new Product("Unsettling Chair", "./img/chair.jpg"),
  new Product("Cthulhu", "./img/cthulhu.jpg"),
  new Product("Duck Mask For Dogs", "./img/dog-duck.jpg"),
  new Product("Tinned Dragon Meat", "./img/dragon.jpg"),
  new Product("Cutlery Extensions For Biro", "./img/pen.jpg"),
  new Product("Pet Sweep Cleaning System", "./img/pet-sweep.jpg"),
  new Product("Pizza Scissors Version 2", "./img/scissors.jpg"),
  new Product("Terrifying Shark Sleeping Bag", "./img/shark.jpg"),
  new Product("Baby Sweep Cleaning System", "./img/sweep.png"),
  new Product("Terrifying Tauntaun Sleeping Bag", "./img/tauntaun.jpg"),
  new Product("Tinned Unicorn Meat", "./img/unicorn.jpg"),
  new Product("Infinite Watering Can", "./img/water-can.jpg"),
  new Product("Why?-n Glass", "./img/wine-glass.jpg"),
];

// Function to render 3 random Products
function renderProducts() {
  let randomProduct1 = getRandomProduct();
  let randomProduct2 = getRandomProduct();
  let randomProduct3 = getRandomProduct();

  // Stop products being the same
  while (
    randomProduct1 === randomProduct2 ||
    randomProduct1 === randomProduct3 ||
    randomProduct2 === randomProduct3
  ) {
    randomProduct2 = getRandomProduct();
    randomProduct3 = getRandomProduct();
  }

  // Change details of 3 images
  image1.src = allProducts[randomProduct1].src;
  image2.src = allProducts[randomProduct2].src;
  image3.src = allProducts[randomProduct3].src;

  image1.alt = allProducts[randomProduct1].name;
  image2.alt = allProducts[randomProduct2].name;
  image3.alt = allProducts[randomProduct3].name;

  // Increase views of selected images
  allProducts[randomProduct1].views++;
  allProducts[randomProduct2].views++;
  allProducts[randomProduct3].views++;
}

// Functoin to collect votes
function handleProductVote(event) {
  // Get the name of the voted product
  let votedProduct = event.target.alt;

  // Check if the click is on a valid image
  if (event.target === productContainer) {
    alert("You must vote for a product or face redundancy.");
  } else {
    renderProducts();
  }

  // Loop through allProducts
  for (let i = 0; i < allProducts.length; i++) {
    // Check if the product name in the array matches the alt tag of our image, if so increase votes and stop loop
    if (votedProduct === allProducts[i].name) {
      allProducts[i].votes++;
      break;
    }
  }
}

// Add event listener
productContainer.addEventListener("click", handleProductVote);

// RENDOR!!!!!
renderProducts();

// Need to add functionality that stops once the sum of all votes = 25
