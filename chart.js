// Create global array to track totals
const productsPersisting = [];

// Constructor to make Products and push to array
function Product(name, views, votes) {
  this.name = name;
  this.src = `./img/${name}.jpg`;
  this.views = views;
  this.votes = votes;
  productsPersisting.push(this);
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

// Function to generate chart on chart.html
function createChart() {
  // Declare variables for chart purposes
  const chartLabels = [];
  const chartViews = [];
  const chartVotes = [];

  // Populate chart variables with data
  for (let i = 0; i < productsPersisting.length; i++) {
    chartLabels.push(productsPersisting[i].name);
    chartViews.push(productsPersisting[i].views);
    chartVotes.push(productsPersisting[i].votes);
  }
  // Do a chart and add votes/views to local storage
  const ctx = document.getElementById("resultsChart");
  const config = new Chart(ctx, {
    type: "bar",
    data: {
      labels: chartLabels,
      datasets: [
        {
          label: "Total votes",
          data: chartVotes,
        },
        {
          label: "Total views",
          data: chartViews,
        },
      ],
    },
  });
}

// Invoke createChart on button click
const makeChart = document.getElementById("chartButton");
makeChart.addEventListener("click", createChart);

// Get local storage, restantiate
grabLocalStorage();
