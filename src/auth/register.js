let registerForm = document.getElementById('registerForm');
let registerUsername = document.getElementById('username');
let registerFullName = document.getElementById('fullName');
let registerEmail = document.getElementById('email');
let registerPassword = document.getElementById('password');
let registerConfirmPassword = document.getElementById('confirmPassword');

async function registerUser() {
  if (registerPassword.value !== registerConfirmPassword.value) {
    alert("Passwords don't match");
    return;
  }

  try {
    let response = await fetch("http://localhost:2000/user");
    let users = await response.json();

    let isTaken = users.some(user => user.username === registerUsername.value);
    if (isTaken) {
      alert("Username already taken");
      return;
    }

    let newUser = {
      username: registerUsername.value,
      fullName: registerFullName.value,
      email: registerEmail.value,
      password: registerPassword.value
    };

    let addUser = await fetch("http://localhost:2000/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    });

    if (addUser.ok) {
      alert("Registered successfully");
      registerForm.reset();
      setTimeout(() => {
        window.location.href = "./login.html";
      }, 0);
    } else {
      alert("Failed to register user");
    }
  } catch (error) {
    console.error("Registration error:", error);
    alert("Something went wrong.");
  }
}

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  registerUser();
});