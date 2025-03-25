document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if (username === "" || password === "") {
        alert("Please fill in both fields");
    } else {
        alert("Login Successful!");
        // Here, you can add actual login handling logic
    }
});