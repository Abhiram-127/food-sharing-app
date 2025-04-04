document.addEventListener("DOMContentLoaded", function () {
    const AIRTABLE_API_KEY = "pat7WrPcoJhfdw94c.df43076ed37d18f28abe5e634207a579dc84d372aa44885965fc2616c181b3fc";
    const BASE_ID = "appiXgehtt9wTvoFZ";
    const TABLE_NAME = "tblSh1UwkJMeFTL4J";
    const AIRTABLE_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

    const giveForm = document.getElementById("giveForm");
    const foodList = document.getElementById("foodList");
    
    giveForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let item = document.getElementById("item").value;
        let quantity = document.getElementById("quantity").value;
        let expiry_date = document.getElementById("expirydate").value;

        if (item && quantity && expiry_date) {
            // Display in Food List
            let listItem = document.createElement("li");
            listItem.textContent = `${item} - ${quantity} (Expires on: ${expiry_date})`;
            foodList.appendChild(listItem);

            // Prepare Data for Airtable
            let data = {
                fields: {
                    "Supplier": "",  // Set empty if not used
                    "Item": item,
                    "Quantity": quantity,
                    "Taker": "",  // Set empty if not used
                    "Expiry_date": expiry_date
                }
            };

            // Send Data to Airtable
            fetch(AIRTABLE_URL, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${AIRTABLE_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(responseData => {
                console.log("Airtable Response:", responseData);
                if (responseData.error) {
                    console.error("Airtable Error:", responseData.error);
                    alert(`Failed to upload: ${responseData.error.message}`);
                } else {
                    alert("Data successfully uploaded to Airtable!");
                }
            })
            .catch(error => {
                console.error("Fetch Error:", error);
                alert("Network error: Check your internet connection.");
            });

            // Clear Form
            giveForm.reset();
        } else {
            alert("Please fill in all fields.");
        }
    });
});

