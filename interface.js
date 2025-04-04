document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("sharingBtn").addEventListener("click", function () {
        window.location.href = "sharing.html"; // Navigate to Sharing Page
    });

    document.getElementById("expiredBtn").addEventListener("click", function () {
        window.location.href = "waste.html"; // Navigate to Expired Food Page
    });
});

