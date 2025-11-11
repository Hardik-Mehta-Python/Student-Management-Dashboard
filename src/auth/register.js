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

    // ✅ Check username already exists
    let isTaken = users.some(user => user.username === registerUsername.value);
    if (isTaken) {
      alert("Username already taken");
      return;
    }

    // ✅ Get all used IDs
    let usedIDs = users.map(user => Number(user.id));

    // ✅ Find smallest available ID between 1 - 999
    let newIdNum = 1;
    while (usedIDs.includes(newIdNum) && newIdNum <= 999) {
      newIdNum++;
    }

    if (newIdNum > 999) {
      alert("User limit reached (Max 999 users)");
      return;
    }

    // ✅ Convert to 3-digit ID
    let newId = String(newIdNum).padStart(3, '0');

    // ✅ Create new user object with ID
    let newUser = {
      id: newId,
      username: registerUsername.value,
      fullName: registerFullName.value,
      email: registerEmail.value,
      password: registerPassword.value
    };

    // ✅ Save user
    let addUser = await fetch("http://localhost:2000/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    });

    if (addUser.ok) {
      // alert(`Registered Successfully!`);
      registerForm.reset();
      console.log("done");
      // setTimeout(() => {
        window.location.href = "./login.html";
      // }, 100);


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
