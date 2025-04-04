document.addEventListener("DOMContentLoaded", function () {
    const addBtn = document.getElementById("addBtn");
    const takeBtn = document.getElementById("takeBtn");
    const content = document.getElementById("content");

    addBtn.addEventListener("click", function () {
        content.innerHTML = "<h2>Add Expired Food</h2><p>Sell expired food at discounted prices.</p>";
    });

    takeBtn.addEventListener("click", function () {
        content.innerHTML = "<h2>Take Expired Food</h2><p>Find discounted expired food from supermarkets.</p>";
    });
});
