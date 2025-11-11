// ===================== AUTH CHECK =====================
let user = JSON.parse(localStorage.getItem("loggedInUser"));

let authButtons = document.getElementById("authButtons");
let userSection = document.getElementById("userSection");
let usernameText = document.getElementById("usernameText");
let logoutBtn = document.getElementById("logoutBtn");

let searchSection = document.getElementById("searchSection");
let loginMessage = document.getElementById("loginMessage");
let studentList = document.getElementById("studentList");
let studentListSection = document.querySelector("#studentList section");

let searchByName = document.getElementById("searchByName");
let courseSelect = document.getElementById("courses");

let allStudents = []; // ✅ store fetched data globally

// ===================== LOGIN STATUS =====================
if (user) {
  authButtons.classList.add("hidden");
  userSection.classList.remove("hidden");

  searchSection.classList.remove("hidden");
  loginMessage.classList.add("hidden");
  studentList.classList.remove("hidden");

  usernameText.textContent = user.username;
} else {
  authButtons.classList.remove("hidden");
  userSection.classList.add("hidden");

  searchSection.classList.add("hidden");
  loginMessage.classList.remove("hidden");
  studentList.classList.add("hidden");
}

// ===================== LOGOUT =====================
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "./src/auth/login.html";
  });
}

// ===================== LOAD STUDENTS (ASYNC) =====================
let loadStudents = async () => {
  try {
    let res = await fetch("http://localhost:4000/students");
    allStudents = await res.json(); // ✅ store all data in array
    displayStudents(allStudents);
  } catch (error) {
    console.log("Error loading data:", error);
  }
};

// ===================== DISPLAY STUDENTS =====================
let displayStudents = (students) => {
  studentListSection.innerHTML = `
      <div class="font-extrabold">ID</div>
      <div class="font-extrabold">Profile</div>
      <div class="font-extrabold">Name</div>
      <div class="font-extrabold">Phone No.</div>
      <div class="font-extrabold">Email</div>
      <div class="font-extrabold">Course</div>
      <div class="font-extrabold">Actions</div>
  `;

  if (students.length === 0) {
    studentListSection.innerHTML += `
      <div class="col-span-7 text-center text-lg text-gray-500">No matching students found.</div>
    `;
    return;
  }

  students.forEach((student) => {
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

          <a href="./src/update.html?id=${student.id}" 
              class="h-10 w-10 rounded-full bg-[#380361] flex justify-center items-center text-white">
              <i class="fa-solid fa-pen-to-square"></i>
          </a>

          <button data-id="${student.id}" 
              class="deleteBtn h-10 w-10 rounded-full bg-[#380361] flex justify-center items-center text-white">
              <i class="fa-solid fa-trash"></i>
          </button>
        </div>
    `;
  });

  addDeleteEvent();
};

// ===================== DELETE STUDENT =====================
let addDeleteEvent = () => {
  let deleteButtons = document.querySelectorAll(".deleteBtn");

  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      let id = btn.getAttribute("data-id");
      if (confirm("Are you sure you want to delete this student?")) {
        try {
          await fetch(`http://localhost:4000/students/${id}`, { method: "DELETE" });
          await loadStudents(); // refresh
          applyFilters(); // keep filters active
        } catch (error) {
          console.log("Error deleting student:", error);
        }
      }
    });
  });
};


// ===================== FILTER LOGIC =====================

// 🔍 SEARCH BY NAME OR ID (works independently)
searchByName.addEventListener("input", () => {
  let value = searchByName.value.trim().toLowerCase();

  if (value === "") {
    // if empty, show full list again
    displayStudents(allStudents);
    return;
  }

  let filtered = allStudents.filter((student) =>
    student.fullName.toLowerCase().includes(value) ||
    String(student.id).includes(value)
  );

  displayStudents(filtered);
});


// 🎓 FILTER BY COURSE (works independently)
courseSelect.addEventListener("change", () => {
  let selectedCourse = courseSelect.value.trim().toLowerCase();

  if (selectedCourse === "" || selectedCourse === "filter by course") {
    // if "Filter By Course" is selected → show all
    displayStudents(allStudents);
    return;
  }

  let filtered = allStudents.filter((student) =>
    student.course.toLowerCase().includes(selectedCourse)
  );

  displayStudents(filtered);
});


// ===================== INITIAL LOAD =====================
loadStudents();
