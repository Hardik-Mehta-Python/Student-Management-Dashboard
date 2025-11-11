// ----------------- GET STUDENT ID FROM URL -----------------
const params = new URLSearchParams(window.location.search);
const studentId = params.get("id");

// ----------------- SELECT ELEMENTS -----------------
const profileImage = document.getElementById("profileImage");
const studentName = document.getElementById("studentName");

const idInput = document.getElementById("userID");
const dobInput = document.getElementById("dob");
const ageInput = document.getElementById("age");
const genderInput = document.getElementById("gender");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const courseInput = document.getElementById("course");

const deleteConfirmBtn = document.getElementById("deleteConfirmBtn");

const url = `http://localhost:4000/students/${studentId}`;

// ----------------- FETCH STUDENT DATA -----------------
async function fetchStudentData() {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

    const student = await res.json();

    // ✅ Fill UI
    studentName.textContent = student.fullName;
    profileImage.src = student.profileImage || "https://cdn-icons-png.flaticon.com/512/4140/4140048.png";

    idInput.value = student.id;
    dobInput.value = student.dob;
    ageInput.value = student.age;
    genderInput.value = student.gender;
    phoneInput.value = student.phone;
    emailInput.value = student.email;
    courseInput.value = student.course;

  } catch (err) {
    console.error("Error fetching student:", err);
    alert("❌ Failed to load student data.");
  }
}

fetchStudentData();

// ----------------- DELETE STUDENT -----------------
deleteConfirmBtn.addEventListener("click", async () => {
  try {
    const res = await fetch(url, { method: "DELETE" });
    if (!res.ok) throw new Error(`Delete failed: ${res.status}`);

    alert("✅ Student Successfully Deleted!");
    window.location.href = "../index.html";
  } catch (err) {
    console.error("Delete Failed:", err);
    alert("❌ Unable to delete student. Please try again.");
  }
});

document.getElementById("updateLink").href = `./update.html?id=${studentId}`;

