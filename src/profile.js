// ----------------- GET STUDENT ID FROM URL -----------------
let params = new URLSearchParams(window.location.search);
let studentId = params.get("id");

// if (!studentId) {
//     alert("Invalid Request: Student ID Missing!");
//     window.location.href = "../index.html";
// }

// ----------------- SELECT ELEMENTS -----------------
let profileImage = document.querySelector("img[alt='avatar']");
let studentName = document.querySelector(".text-xl.font-bold.text-white.mb-4.mt-2");

let idInput = document.getElementById("userID");
let dobInput = document.querySelectorAll("input")[1];
let ageInput = document.querySelectorAll("input")[2];
let genderInput = document.querySelectorAll("input")[3];

let phoneInput = document.querySelectorAll("input")[4];
let emailInput = document.querySelectorAll("input")[5];
let courseInput = document.querySelectorAll("input")[6];

let deleteConfirmBtn = document.querySelector("#modal button.bg-red-600");

// ----------------- FETCH STUDENT DATA -----------------
let url = `http://localhost:4000/students/${studentId}`;

fetch(url)
    .then(function (res) {
        return res.json();
    })
    .then(function (student) {

        // ✅ Fill all UI fields
        studentName.textContent = student.fullName;
        profileImage.src = student.profileImage;

        idInput.value = student.id;
        dobInput.value = student.dob;
        ageInput.value = student.age;
        genderInput.value = student.gender;

        phoneInput.value = student.phone;
        emailInput.value = student.email;
        courseInput.value = student.course;

    })
    .catch(function (err) {
        console.error("Error fetching student:", err);
    });

// ----------------- DELETE STUDENT -----------------
deleteConfirmBtn.addEventListener("click", function () {

    fetch(url, { method: "DELETE" })
        .then(function () {
            alert("✅ Student Successfully Deleted!");
            window.location.href = "../index.html";
        })
        .catch(function (err) {
            console.error("Delete Failed:", err);
        });

});
