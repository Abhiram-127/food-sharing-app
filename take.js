document.addEventListener("DOMContentLoaded", function () {
    const AIRTABLE_API_KEY = "pat251NHD3QbIJXer.ce1aab75d24e1428db9e419cdfc355d2cbd47d3373c6ef00c513c393b73cb926";  // Replace with your API Key
    const BASE_ID = "appiXgehtt9wTvoFZ";  
    const TABLE_NAME = "tblSh1UwkJMeFTL4J"; 
    const AIRTABLE_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

    const itemSelect = document.getElementById("itemSelect");
    const takeForm = document.getElementById("takeForm");
    const availableFoodList = document.getElementById("availableFood");
    const takeFoodButton = document.getElementById("takeFoodButton");

    function loadAvailableFood() {
        fetch(AIRTABLE_URL, {
            headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` }
        })
        .then(response => response.json())
        .then(data => {
            itemSelect.innerHTML = "<option value=''>Select an item</option>";
            availableFoodList.innerHTML = "";

            data.records.forEach(record => {
                let item = record.fields.Item;
                let quantity = record.fields.Quantity;
                let recordId = record.id;

                if (quantity > 0) {
                    let option = document.createElement("option");
                    option.value = recordId;
                    option.textContent = `${item} (${quantity} available)`;
                    itemSelect.appendChild(option);

                    let listItem = document.createElement("li");
                    listItem.textContent = `${item} - ${quantity} available`;
                    listItem.setAttribute("data-id", recordId);
                    availableFoodList.appendChild(listItem);
                }
            });
        })
        .catch(error => console.error("Error loading data:", error));
    }

    takeFoodButton.addEventListener("click", function () {
        const selectedRecordId = itemSelect.value;
        const takeQuantity = parseInt(document.getElementById("takeQuantity").value);

        if (!selectedRecordId || takeQuantity <= 0) {
            alert("Please select a valid item and quantity!");
            return;
        }

        // Store selected item and quantity in sessionStorage
        sessionStorage.setItem("selectedRecordId", selectedRecordId);
        sessionStorage.setItem("takeQuantity", takeQuantity);

        // Redirect to confirmation page
        window.location.href = "take_deleter.html";
    });

    loadAvailableFood();
});


