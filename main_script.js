function showAdminLogin() {
    document.getElementById('adminLogin').classList.toggle('hidden');
}

document.getElementById('adminLoginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let adminUsername = document.getElementById('adminUsername').value;
    let adminPassword = document.getElementById('adminPassword').value;

    if (adminUsername === "admin" && adminPassword === "admin123") {
        alert("Admin Login Successful!");
        // Redirect to admin dashboard here
    } else {
        alert("Invalid Admin Credentials");
    }
});