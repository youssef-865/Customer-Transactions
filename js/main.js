const customers = [
  { id: 1, name: "Ahmed Ali" },
  { id: 2, name: "Aya Elsayed" },
  { id: 3, name: "Mina Adel" },
  { id: 4, name: "Sarah Reda" },
  { id: 5, name: "Mohamed Sayed" }
];

const transactions = [
  { id: 1, customer_id: 1, date: "2022-01-01", amount: 1000 },
  { id: 2, customer_id: 1, date: "2022-01-02", amount: 2000 },
  { id: 3, customer_id: 2, date: "2022-01-01", amount: 550 },
  { id: 4, customer_id: 3, date: "2022-01-01", amount: 500 },
  { id: 5, customer_id: 2, date: "2022-01-02", amount: 1300 },
  { id: 6, customer_id: 4, date: "2022-01-01", amount: 750 },
  { id: 7, customer_id: 3, date: "2022-01-02", amount: 1250 },
  { id: 8, customer_id: 5, date: "2022-01-01", amount: 2500 },
  { id: 9, customer_id: 5, date: "2022-01-02", amount: 875 }
];





document.addEventListener('DOMContentLoaded', (event) => {
  displayTable(customers, transactions);
});





function displayTable(customers, transactions) {
  
  const customerTable = document.querySelector("#customerTable tbody");

  for (let i = 0; i < transactions.length; i++) {
    let customerName = '';
    for (let j = 0; j < customers.length; j++) {
      if (customers[j].id === transactions[i].customer_id) {
        customerName = customers[j].name;
        
      }
    }


    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${customerName}</td>
      <td>${transactions[i].date}</td>
      <td>${transactions[i].amount}</td>
    `;
    customerTable.appendChild(row);
  }
}


displayTable(customers, transactions);


// Aggregate transactions by customer


const transactionTotals = {};

for (let i = 0; i < transactions.length; i++) {

  const customerId = transactions[i].customer_id;

  if (!transactionTotals[customerId]) {
    transactionTotals[customerId] = 0;
  }
  
  transactionTotals[customerId] += transactions[i].amount;
}



// Create arrays for chart data
const xValues = customers.map(customer => customer.name);
const yValues = customers.map(customer => transactionTotals[customer.id] || 0);
const barColors = ["red", "green", "blue", "orange", "brown"];

new Chart("myChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    title: {
      display: true,
      text: "Customer Transaction Amounts"
    }
  }
});




// filter by name 



function filterByName() {
  const searchNameValue = document.getElementById("customerNameFilter").value.trim().toLowerCase();

  customerTable.innerHTML = ""; 

  for (let i = 0; i < transactions.length; i++) {
   
    const customer = customers.find(customer => customer.id === transactions[i].customer_id);
    
    if (customer && customer.name.toLowerCase().includes(searchNameValue )) {

      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${customer.name}</td>
        <td>${transactions[i].date}</td>
        <td>${transactions[i].amount}</td>
      `;
      customerTable.appendChild(row);
    }
  }
}

// filter by amount

function filterByAmount() {
  const searchAmountValue = parseInt(document.getElementById("amountFilter").value.trim(), 10); 
  
  customerTable.innerHTML = ""; 

  for (let i = 0; i < transactions.length; i++) {
    
    if (transactions[i].amount >= searchAmountValue) {
      const customer = customers.find(customer => customer.id === transactions[i].customer_id);
      
      
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${customer.name}</td>
          <td>${transactions[i].date}</td>
          <td>${transactions[i].amount}</td>
        `;
        customerTable.appendChild(row);
      }
    }
  }



