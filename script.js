function showTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll(".tab-content");
    tabs.forEach(tab => tab.classList.remove("active"));

    // Remove active class from buttons
    const buttons = document.querySelectorAll(".tab-btn");
    buttons.forEach(button => button.classList.remove("active"));

    // Show the selected tab and highlight the button
    document.getElementById(tabName).classList.add("active");
    event.target.classList.add("active");
}