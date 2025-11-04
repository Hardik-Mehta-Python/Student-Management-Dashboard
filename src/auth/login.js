// //~ Login form elements
// let loginForm = document.getElementById('loginForm');
// let loginUsername = document.getElementById('loginUsername');
// let loginPassword = document.getElementById('loginPassword');
// //~ Login user
// async function loginUser() {
//   try {
//     let response = await fetch("http://localhost:2000/user");
//     let users = await response.json();

//     let matchedUser = users.find(user =>
//       user.username === loginUsername.value &&
//       user.password === loginPassword.value
//     );

//     if (matchedUser) {
//       alert("Login successful");
//       localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
//       window.location.href = "../../index.html";
//     } else {
//       alert("Invalid username or password");
//     }
//   } catch (error) {
//     console.error("Login error:", error);
//     alert("Something went wrong during login.");
//   }
// }

// //~ Event listeners
// if (registerForm) {
//   registerForm.addEventListener('submit', e => {
//     e.preventDefault();
//     registerUser();
//   });
// }

// if (loginForm) {
//   loginForm.addEventListener('submit', e => {
//     e.preventDefault();
//     loginUser();
//   });
// }

let loginForm = document.getElementById('loginForm');
let loginUsername = document.getElementById('loginUsername');
let loginPassword = document.getElementById('loginPassword');

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

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  loginUser();
});
