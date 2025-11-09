// let user = JSON.parse(localStorage.getItem("loggedInUser"));

// let authButtons = document.getElementById("authButtons");
// let userSection = document.getElementById("userSection");
// let usernameText = document.getElementById("usernameText");
// let logoutBtn = document.getElementById("logoutBtn");

// let searchSection = document.getElementById("searchSection");
// let loginMessage = document.getElementById("loginMessage");

// if (user) {
//     authButtons.classList.add("hidden");
//     userSection.classList.remove("hidden");

//     searchSection.classList.remove("hidden");
//     loginMessage.classList.add("hidden");

//     usernameText.textContent = user.username.slice(0, 8) + "...";
// } else {
//     authButtons.classList.remove("hidden");
//     userSection.classList.add("hidden");

//     searchSection.classList.add("hidden");
//     loginMessage.classList.remove("hidden");
// }

// if (logoutBtn) {
//     logoutBtn.addEventListener("click", () => {
//         localStorage.removeItem("loggedInUser");
//         window.location.href = "./src/auth/login.html";
//     });
// }


let user = JSON.parse(localStorage.getItem("loggedInUser"));

let authButtons = document.getElementById("authButtons");
let userSection = document.getElementById("userSection");
let usernameText = document.getElementById("usernameText");
let logoutBtn = document.getElementById("logoutBtn");

let searchSection = document.getElementById("searchSection");
let loginMessage = document.getElementById("loginMessage");
let studentList = document.getElementById("studentList"); // ✅ Student List Section

// ===================== CHECK LOGIN =====================
if (user) {
    // Hide Login & Register Buttons
    authButtons.classList.add("hidden");
    userSection.classList.remove("hidden");

    // Show Search Bar & Student List
    searchSection.classList.remove("hidden");
    loginMessage.classList.add("hidden");
    studentList.classList.remove("hidden"); // ✅ SHOW After Login

    // Set Username
    usernameText.textContent = user.username.slice(0, 8) + "...";
} else {
    // Show Login & Register Buttons
    authButtons.classList.remove("hidden");
    userSection.classList.add("hidden");

    // Hide Search Bar & Student List
    searchSection.classList.add("hidden");
    loginMessage.classList.remove("hidden");
    studentList.classList.add("hidden"); // ✅ HIDE Before Login
}

// ===================== LOGOUT =====================
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        window.location.href = "./src/auth/login.html";
    });
}
let studentListSection = document.querySelector("#studentList section");

// Fetch Data from JSON Server
function loadStudents() {
    fetch("http://localhost:4000/students")
        .then(res => res.json())
        .then(data => {
            studentListSection.innerHTML = `
                <div class="font-extrabold">ID</div>
                <div class="font-extrabold">Profile</div>
                <div class="font-extrabold">Name</div>
                <div class="font-extrabold">Phone No.</div>
                <div class="font-extrabold">Email</div>
                <div class="font-extrabold">Course</div>
                <div class="font-extrabold">Actions</div>
            `;

            data.forEach(student => {
                studentListSection.innerHTML += `
                    <div>${student.id}</div>
                    <div><img src="${student.profileImage}" class="w-10 h-10 rounded-full" /></div>
                    <div>${student.fullName}</div>
                    <div>${student.phone}</div>
                    <div>${student.email}</div>
                    <div>${student.course}</div>

                    <div class="flex justify-start items-center gap-2">

                        <a href="./src/profile.html?id=${student.id}" 
                            class="h-10 w-10 rounded-full bg-[#380361] flex justify-center items-center text-white">
                            <i class="fa-solid fa-eye"></i>
                        </a>

                        <!-- Update Student -->
                        <a href="./src/update.html?id=${student.id}" 
                            class="h-10 w-10 rounded-full bg-[#380361] flex justify-center items-center text-white">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </a>

                        <!-- Delete Student -->
                        <button data-id="${student.id}" 
                                class="deleteBtn h-10 w-10 rounded-full bg-[#380361] flex justify-center items-center text-white">
                                <i class="fa-solid fa-trash"></i>
                        </button>

                    </div>
                `;
            });

            addDeleteEvent();
        })
        .catch(err => console.log(err));
}

// Delete Student
function addDeleteEvent() {
    let deleteButtons = document.querySelectorAll(".deleteBtn");
    deleteButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            let id = btn.getAttribute("data-id");
            fetch(`http://localhost:4000/students/${id}`, {
                method: "DELETE"
            }).then(() => loadStudents());
        });
    });
}

// Load when page opens
loadStudents();
