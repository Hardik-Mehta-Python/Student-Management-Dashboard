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

//~ Register form elements
// let registerForm = document.getElementById('registerForm');
// let registerUsername = document.getElementById('username');
// let registerFullName = document.getElementById('fullName');
// let registerEmail = document.getElementById('email');
// let registerPassword = document.getElementById('password');
// let registerConfirmPassword = document.getElementById('confirmPassword');



//~ Register user
// async function registerUser() {
//   if (registerPassword.value !== registerConfirmPassword.value) {
//     alert("Passwords don't match");
//     return;
//   }

//   try {
//     let response = await fetch("http://localhost:2000/user");
//     let users = await response.json();

//     let isTaken = users.some(user => user.username === registerUsername.value);
//     if (isTaken) {
//       alert("Username already taken");
//       return;
//     }

//     let newUser = {
//       username: registerUsername.value,
//       fullName: registerFullName.value,
//       email: registerEmail.value,
//       password: registerPassword.value
//     };

//     let addUser = await fetch("http://localhost:2000/user", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newUser)
//     });

//     if (addUser.ok) {
//       alert("Registered successfully");
//       registerForm.reset();
//       setTimeout(() => {
//         window.location.href = "./login.html";
//       }, 0);
//     } else {
//       alert("Failed to register user");
//     }
//   } catch (error) {
//     console.error("Registration error:", error);
//     alert("Something went wrong.");
//   }
// }


//~ Login form elements
let loginForm = document.getElementById('loginForm');
let loginUsername = document.getElementById('loginUsername');
let loginPassword = document.getElementById('loginPassword');
//~ Login user
async function loginUser() {
  try {
    let response = await fetch("http://localhost:2000/user");
    let users = await response.json();

    let matchedUser = users.find(user =>
      user.username === loginUsername.value &&
      user.password === loginPassword.value
    );

    if (matchedUser) {
      alert("Login successful");
      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
      window.location.href = "../../index.html";
    } else {
      alert("Invalid username or password");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong during login.");
  }
}

//~ Event listeners
if (registerForm) {
  registerForm.addEventListener('submit', e => {
    e.preventDefault();
    registerUser();
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    loginUser();
  });
}