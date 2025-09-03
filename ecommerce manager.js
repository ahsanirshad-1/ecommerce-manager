 
  // Handle Product Form
  document.getElementById("productForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const product = document.getElementById("product").value;
    const supplier = document.getElementById("supplier").value;
    const stock = document.getElementById("stock").value;
    const price = document.getElementById("price").value;
    const status = document.getElementById("status").value;

    const table = document.querySelector("#productsTable tbody");
    const row = `<tr>
      <td>${product}</td>
      <td>${supplier}</td>
      <td>${stock}</td>
      <td>$${price}</td>
      <td>${status}</td>
    </tr>`;
    table.innerHTML += row;

    e.target.reset();
  });

  // Handle Expense Form
  document.getElementById("expenseForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const category = document.getElementById("category").value;
    const amount = document.getElementById("amount").value;
    const date = document.getElementById("date").value;

    const table = document.querySelector("#expensesTable tbody");
    const row = `<tr>
      <td>${category}</td>
      <td>$${amount}</td>
      <td>${date}</td>
    </tr>`;
    table.innerHTML += row;

    e.target.reset();
  });
  