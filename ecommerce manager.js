
  const ACCESS_TOKEN = "YOUR_SMARTSHEET_API_TOKEN"; // 🔑 Put your API token here
  const SHEET_ID = "YOUR_SHEET_ID"; // 📄 Replace with your Smartsheet sheet ID

  async function addRowToSmartsheet(rowData) {
    try {
      const response = await fetch(`https://api.smartsheet.com/2.0/sheets/${SHEET_ID}/rows`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          toTop: true, 
          cells: rowData
        })
      });

      if (!response.ok) {
        const err = await response.json();
        console.error("Error:", err);
      } else {
        console.log("Row added successfully!");
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  }

  // Handle Product Form
  document.getElementById("productForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const product = document.getElementById("product").value;
    const supplier = document.getElementById("supplier").value;
    const stock = document.getElementById("stock").value;
    const price = document.getElementById("price").value;
    const status = document.getElementById("status").value;

    // add row in HTML
    const table = document.querySelector("#productsTable tbody");
    const row = `<tr>
      <td>${product}</td>
      <td>${supplier}</td>
      <td>${stock}</td>
      <td>$${price}</td>
      <td>${status}</td>
    </tr>`;
    table.innerHTML += row;

    // add row in Smartsheet
    addRowToSmartsheet([
      { columnId: 1234567890, value: product },   // Replace columnId with actual Smartsheet column ID
      { columnId: 2234567890, value: supplier },
      { columnId: 3234567890, value: stock },
      { columnId: 4234567890, value: price },
      { columnId: 5234567890, value: status }
    ]);

    e.target.reset();
  });

  // Handle Expense Form
  document.getElementById("expenseForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const category = document.getElementById("category").value;
    const amount = document.getElementById("amount").value;
    const date = document.getElementById("date").value;

    // add row in HTML
    const table = document.querySelector("#expensesTable tbody");
    const row = `<tr>
      <td>${category}</td>
      <td>$${amount}</td>
      <td>${date}</td>
    </tr>`;
    table.innerHTML += row;

    // add row in Smartsheet
    addRowToSmartsheet([
      { columnId: 6234567890, value: category },
      { columnId: 7234567890, value: amount },
      { columnId: 8234567890, value: date }
    ]);

    e.target.reset();
  });

