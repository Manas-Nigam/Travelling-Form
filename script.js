document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Validation
    let first_name = document.getElementById("fname").value;
    let last_name = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (!first_name || !last_name || !email || !password || !username) {
        alert("Please fill in all fields.");
        return;
    }

    // Form data
    let formData = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        username: username,
        password: password
    };

    fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then(response => response.json())
        .then(data => {
            console.log("Response from server:", data);
        })
        .catch(error => {
            console.error("Error:", error);
        });
});
