// ⚡ Replace with your actual Smartsheet API token and Sheet IDs
const API_TOKEN = "YOUR_SMARTSHEET_API_TOKEN";
const PRODUCT_SHEET_ID = "YOUR_PRODUCTS_SHEET_ID";
const EXPENSE_SHEET_ID = "YOUR_EXPENSES_SHEET_ID";

// 🔗 Generic function to send data to Smartsheet
async function addRowToSmartsheet(sheetId, rowData) {
  try {
    const response = await fetch(`https://api.smartsheet.com/2.0/sheets/${sheetId}/rows`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        toTop: true,
        rows: [
          {
            cells: rowData
          }
        ]
      })
    });

    const result = await response.json();
    console.log("✅ Row added to Smartsheet:", result);
  } catch (error) {
    console.error("❌ Error adding row to Smartsheet:", error);
  }
}

// ✅ Toggle form visibility
function toggleForm(id) {
  const form = document.getElementById(id);
  form.classList.toggle("hidden");
}

// ✅ Add product
document.getElementById("productForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const product = document.getElementById("product").value;
  const supplier = document.getElementById("supplier").value;
  const stock = document.getElementById("stock").value;
  const price = document.getElementById("price").value;
  const status = document.getElementById("status").value;

  // --- Smartsheet Row Data ---
  const rowData = [
    { columnId: 111111111111, value: product },
    { columnId: 222222222222, value: supplier },
    { columnId: 333333333333, value: stock },
    { columnId: 444444444444, value: price },
    { columnId: 555555555555, value: status }
  ];
  await addRowToSmartsheet(PRODUCT_SHEET_ID, rowData);

  // --- Update local table instantly ---
  const table = document.getElementById("productsTable").querySelector("tbody");
  const row = `<tr>
    <td>${product}</td>
    <td>${supplier}</td>
    <td>${stock}</td>
    <td>$${price}</td>
    <td>${status}</td>
  </tr>`;
  table.innerHTML += row;

  this.reset();
  this.classList.add("hidden");
});

// ✅ Add expense
document.getElementById("expenseForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const category = document.getElementById("category").value;
  const amount = document.getElementById("amount").value;
  const date = document.getElementById("date").value;

  // --- Smartsheet Row Data ---
  const rowData = [
    { columnId: 666666666666, value: category },
    { columnId: 777777777777, value: amount },
    { columnId: 888888888888, value: date }
  ];
  await addRowToSmartsheet(EXPENSE_SHEET_ID, rowData);

  // --- Update local table instantly ---
  const table = document.getElementById("expensesTable").querySelector("tbody");
  const row = `<tr>
    <td>${category}</td>
    <td>$${amount}</td>
    <td>${date}</td>
  </tr>`;
  table.innerHTML += row;

  this.reset();
  this.classList.add("hidden");
});
