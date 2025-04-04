document.addEventListener("DOMContentLoaded", function () {
    const AIRTABLE_API_KEY = "patyn6AkBXrpU3by8.2bbbfe6b9e034940ec92805b9ddceef2fc8a05d90c7672bb9c534702cc3073ea"; // Replace with your API Key (Move this to backend for security!)
    const BASE_ID = "appiXgehtt9wTvoFZ";  // Replace with your Base ID
    const TABLE_NAME = "tblSh1UwkJMeFTL4J"; // Replace with your Table Name
    const AIRTABLE_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;
    
    const confirmButton = document.getElementById("confirmButton");
    const returnButton = document.getElementById("returnButton");

    // Retrieve selected record ID and quantity from session storage
    const selectedRecordId = sessionStorage.getItem("selectedRecordId");
    const takeQuantity = parseInt(sessionStorage.getItem("takeQuantity"), 10);
    console.log("Selected Record ID:", selectedRecordId);  // ✅ Debugging log
    console.log("Selected Quantity:", takeQuantity);
    if (!selectedRecordId || isNaN(takeQuantity) || takeQuantity <= 0) {
        alert("Invalid item or quantity selected.");
        window.location.href = "take.html";
        return;
    }

    confirmButton.addEventListener("click", function () {
        fetch(`${AIRTABLE_URL}/${selectedRecordId}`, {
            headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` }
        })
        .then(response => response.json())
        .then(record => {
            console.log("Fetched Record:", record);  // Debugging
    
            if (!record || !record.fields) {
                throw new Error("Record not found.");
            }
    
            let currentQuantity = parseInt(record.fields.Quantity, 10);
            if (isNaN(currentQuantity)) {
                throw new Error("Quantity field is missing or not a number.");
            }
    
            let newQuantity = currentQuantity - takeQuantity;
            console.log(`Current: ${currentQuantity}, Take: ${takeQuantity}, New: ${newQuantity}`);
    
            if (newQuantity <= 0) {
                if (!confirm("Are you sure you want to remove this item completely?")) {
                    return;
                }
    
                fetch(`${AIRTABLE_URL}/${selectedRecordId}`, {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` }
                })
                .then(response => response.json())
                .then(() => {
                    alert(`Item removed completely.`);
                    sessionStorage.removeItem("selectedRecordId");
                    sessionStorage.removeItem("takeQuantity");
                    window.location.href = "take.html";
                })
                .catch(error => console.error("Error deleting record:", error));
            } else {
                if (!confirm(`Are you sure you want to take ${takeQuantity}? Remaining: ${newQuantity}`)) {
                    return;
                }
    
                fetch(`${AIRTABLE_URL}/${selectedRecordId}`, {
                    method: "PATCH",
                    headers: {
                        "Authorization": `Bearer ${AIRTABLE_API_KEY}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ fields: { Quantity: Number(newQuantity) } })
                })
                .then(response => response.json().then(data => ({ status: response.status, data })))
                .then(({ status, data }) => {
                    console.log("Response Status:", status);
                    console.log("Response Data:", data);
                    if (status !== 200) {
                        throw new Error(`Airtable update failed: ${JSON.stringify(data)}`);
                    }
                    alert(`Updated quantity: ${newQuantity} remaining.`);
                    sessionStorage.removeItem("selectedRecordId");
                    sessionStorage.removeItem("takeQuantity");
                    window.location.href = "take.html";
                })
                .catch(error => console.error("Error updating record:", error));
            }
        })
        .catch(error => console.error("Error fetching record:", error));
    });
    

    returnButton.addEventListener("click", function () {
        window.location.href = "take.html";
    });
});
