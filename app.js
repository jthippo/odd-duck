// Sort out DOM Nodes
let productContainer = document.querySelector("section");
let image1 = document.querySelector("section img:first-child");
let image2 = document.querySelector("section img:nth-child(2)");
let image3 = document.querySelector("section img:last-child");

// Set up limiting number of votes available
let userVotes = 0;
let maxVotes = 25;

// Constructor to make Products
function Product(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.votes = 0;
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

// Function to choose a random Product
function getRandomProduct() {
  return Math.floor(Math.random() * allProducts.length);
}

// Function to render 3 random Products
function renderProducts() {
  // Define 3 new random products
  let randomProduct1 = getRandomProduct();
  let randomProduct2 = getRandomProduct();
  let randomProduct3 = getRandomProduct();

  // Stop Products being the same
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

// ENSURE PRODUCTS CANNOT REPEAT ON THE NEXT CLICK
//
// I spent a while on this and the idea was to:
//
// 1. At the end of renderProducts(), define the products on the page as variables and remove them from the array
// 2. After the randomProductx variables have been set from the remaining array entries, push the removed products back into the array for future selection
//
// It was working for a bit, unless one of the empty slots was selected and then it returned "undefined". I think defining the array as const rather than let means the number of array entries doesn't change even when actual entries are removed. Spent too long on it for now so moving onto the Chart.js portion.

// Function to collect votes
function handleProductVote(event) {
  // Need to add functionality that stops once the sum of all votes = 25
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

  // Loop through allProducts
  for (let i = 0; i < allProducts.length; i++) {
    // Check if the product name in the array matches the alt tag of our image, if so increase votes and stop loop
    if (votedProduct === allProducts[i].name) {
      allProducts[i].votes++;
      break;
    }
  }
}

// Add event listener to vote collection
productContainer.addEventListener("click", handleProductVote);

// Display the results - using an if statement to check if 25 total votes have been received, else the results are not viewable
function showResults() {
  if (userVotes >= 25) {
    // Generate list
    const results = document.getElementById("results");
    for (let i = 0; i < allProducts.length; i++) {
      const li = document.createElement("li");
      const product = allProducts[i];
      li.textContent = `${product.name} has ${product.views} views and ${product.votes} votes.`;
      results.appendChild(li);
    }

    const ctx = document.getElementById("resultsChart");
    const config = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Unspecificed Droid Bag",
          "Fraudulent Banana Slicer",
          "iWiper",
          "Salacious Yellow Boots",
          "Breakfast For Gnomes",
          "Meatball Bubblegum",
          "Unsettling Chair",
          "Cthulhu",
          "Duck Mask For Dogs",
          "Tinned Dragon Meat",
          "Cutlery Extensions For Biro",
          "Pet Sweep Cleaning System",
          "Pizza Scissors Version 2",
          "Terrifying Shark Sleeping Bag",
          "Baby Sweep Cleaning System",
          "Terrifying Tauntaun Sleeping Bag",
          "Tinned Unicorn Meat",
          "Infinite Watering Can",
          "Why?-n Glass",
        ],
        // I tried using labels: allProducts.name, but it didn't quite work. Not sure why not, Google suggests it should.
        datasets: [
          // I know there's a better way to do this with a for loop but I'm grouchy and tired today.
          {
            label: "Total votes",
            data: [
              allProducts[0].votes,
              allProducts[1].votes,
              allProducts[2].votes,
              allProducts[3].votes,
              allProducts[4].votes,
              allProducts[5].votes,
              allProducts[6].votes,
              allProducts[7].votes,
              allProducts[8].votes,
              allProducts[9].votes,
              allProducts[10].votes,
              allProducts[11].votes,
              allProducts[12].votes,
              allProducts[13].votes,
              allProducts[14].votes,
              allProducts[15].votes,
              allProducts[16].votes,
              allProducts[17].votes,
              allProducts[18].votes,
            ],
          },
          {
            label: "Total views",
            data: [
              allProducts[0].views,
              allProducts[1].views,
              allProducts[2].views,
              allProducts[3].views,
              allProducts[4].views,
              allProducts[5].views,
              allProducts[6].views,
              allProducts[7].views,
              allProducts[8].views,
              allProducts[9].views,
              allProducts[10].views,
              allProducts[11].views,
              allProducts[12].views,
              allProducts[13].views,
              allProducts[14].views,
              allProducts[15].views,
              allProducts[16].views,
              allProducts[17].views,
              allProducts[18].views,
            ],
          },
        ],
      },
    });
  } else {
    alert(
      "Results unavailable until 25 votes have been received. Attempting to view results before 25 votes have been received may result in redundancy."
    );
  }
}

// Run showResults when we click on the button
const viewResults = document.getElementById("button");
viewResults.addEventListener("click", showResults);

// RENDOR!!!!!
renderProducts();
