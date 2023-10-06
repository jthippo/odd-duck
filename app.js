// Sort out DOM Nodes
let productContainer = document.querySelector("section");
let image1 = document.querySelector("section img:first-child");
let image2 = document.querySelector("section img:nth-child(2)");
let image3 = document.querySelector("section img:last-child");

// Set up limiting number of votes available
let userVotes = 0;
let maxVotes = 25;

// Create global array to track totals
const productsPersisting = [];

// Store products we've just seen
let previousProducts = [];

// Constructor to make Products and push to array
function Product(name, views, votes) {
  this.name = name;
  this.src = `./img/${name}.jpg`;
  this.views = views;
  this.votes = votes;
  productsPersisting.push(this);
}

// Function to add all products to local storage
function addToLocalStorage() {
  const productsStringified = JSON.stringify(productsPersisting);
  localStorage.setItem("productsPersisting", productsStringified);
}

// Grab products in local storage, parse into objects and loop through to add to array;
function grabLocalStorage() {
  const productsFromLocalStorage = JSON.parse(
    localStorage.getItem("productsPersisting")
  );
  for (let i = 0; i < productsFromLocalStorage.length; i++) {
    new Product(
      productsFromLocalStorage[i].name,
      productsFromLocalStorage[i].views,
      productsFromLocalStorage[i].votes
    );
  }
}

// Function to check if local storage exists; if not, populate with products. If so, grab it!
function checkLocalStorage() {
  if (localStorage.length === 0) {
    new Product("bag", 0, 0);
    new Product("banana", 0, 0);
    new Product("bathroom", 0, 0);
    new Product("boots", 0, 0);
    new Product("breakfast", 0, 0);
    new Product("bubblegum", 0, 0);
    new Product("chair", 0, 0);
    new Product("cthulhu", 0, 0);
    new Product("dog-duck", 0, 0);
    new Product("dragon", 0, 0);
    new Product("pen", 0, 0);
    new Product("pet-sweep", 0, 0);
    new Product("scissors", 0, 0);
    new Product("shark", 0, 0);
    new Product("sweep", 0, 0);
    new Product("tauntaun", 0, 0);
    new Product("unicorn", 0, 0);
    new Product("water-can", 0, 0);
    new Product("wine-glass", 0, 0);
  } else {
    grabLocalStorage();
  }
}

// Function to choose a random Product
function getRandomProduct() {
  return Math.floor(Math.random() * productsPersisting.length);
}

// Function to render 3 random Products
function renderProducts() {
  // Define 3 new random products
  let randomProduct1 = getRandomProduct();
  let randomProduct2 = getRandomProduct();
  let randomProduct3 = getRandomProduct();

  // Stop Products being the same, stop Products repeating
  while (
    randomProduct1 === randomProduct2 ||
    randomProduct1 === randomProduct3 ||
    randomProduct2 === randomProduct3 ||
    previousProducts.includes(randomProduct1) ||
    previousProducts.includes(randomProduct2) ||
    previousProducts.includes(randomProduct3)
  ) {
    randomProduct1 = getRandomProduct();
    randomProduct2 = getRandomProduct();
    randomProduct3 = getRandomProduct();
  }

  // Empty previousProducts array
  previousProducts = [];

  // Add seen Products to previousProducts
  previousProducts.push(randomProduct1, randomProduct2, randomProduct3);

  // Change details of 3 images
  image1.src = productsPersisting[randomProduct1].src;
  image2.src = productsPersisting[randomProduct2].src;
  image3.src = productsPersisting[randomProduct3].src;

  image1.alt = productsPersisting[randomProduct1].name;
  image2.alt = productsPersisting[randomProduct2].name;
  image3.alt = productsPersisting[randomProduct3].name;

  // Increase views of selected images
  productsPersisting[randomProduct1].views++;
  productsPersisting[randomProduct2].views++;
  productsPersisting[randomProduct3].views++;
}

// Function to collect votes
function handleProductVote(event) {
  // Add functionality that stops once the sum of all votes = 25
  if (userVotes >= maxVotes) {
    alert(
      "25 votes have been registered. Results are now available by clicking the SHOW RESULTS button below."
    );
    return;
  }
  // Increase votes on successful click
  userVotes++;
  // Get the name of the voted product
  let votedProduct = event.target.alt;

  // Check if the click is on a valid image
  if (event.target === productContainer) {
    alert(
      "Not a valid selection. Kindly vote for a product or face redundancy."
    );
  } else {
    renderProducts();
  }

  // Loop through productsPersisting
  for (let i = 0; i < productsPersisting.length; i++) {
    // Check if the product name in the array matches the alt tag of our image, if so increase votes and stop loop
    if (votedProduct === productsPersisting[i].name) {
      productsPersisting[i].votes++;
      break;
    }
  }
}

// Add event listener to vote collection
productContainer.addEventListener("click", handleProductVote);

// Function to display the results, checking if 25 total votes have been received
function showResults() {
  if (userVotes >= 25) {
    // Generate list of results and render
    const results = document.getElementById("results");
    for (let i = 0; i < productsPersisting.length; i++) {
      const li = document.createElement("li");
      const product = productsPersisting[i];
      li.textContent = `${product.name} has ${product.views} views and ${product.votes} votes.`;
      results.appendChild(li);
    }
    addToLocalStorage();
  } else {
    alert(
      "Results unavailable until 25 votes have been received. Attempting to view results before 25 votes have been received may result in redundancy."
    );
  }
}

// Invoke showResults on button click
const viewResults = document.getElementById("showResults");
viewResults.addEventListener("click", showResults);

// Check and render!
checkLocalStorage();
renderProducts();
