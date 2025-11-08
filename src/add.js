// let name = document.getElementById("studentFullName").value;
// let age = document.getElementById("studentAge").value;
// let gender = document.getElementById("studentGender").value;
// let dob = document.getElementById("studentDOB").value;
// let phone = document.getElementById("studentPhone").value;
// let course = document.getElementById("studentCourse").value;
// let email = document.getElementById("studentEmail").value;
// let address = document.getElementById("studentAddress").value;
// let studentForm = document.getElementById('studentForm')
// let profileFile = document.getElementById("studentPicture").files[0];
// let reader = new FileReader();
// reader.readAsDataURL(profileFile);

// async function addStudent() {
//     let newStudnet = {

//     }
// }

document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("studentFullName").value;
    let age = document.getElementById("studentAge").value;
    let gender = document.getElementById("studentGender").value;
    let dob = document.getElementById("studentDob").value;
    let phone = document.getElementById("studentMobileNo").value;
    let course = document.getElementById("course").value;

    let email = document.getElementById("studentEmail").value;
    let address = document.getElementById("studentAddress").value;

    let profileFile = document.getElementById("studentPicture").files[0];

    let reader = new FileReader();
    reader.readAsDataURL(profileFile);

    reader.onload = function () {

        // Fetch all students to generate next ID
        fetch("http://localhost:4000/students")
            .then(res => res.json())
            .then(data => {

                let newId = data.length > 0 ? parseInt(data[data.length - 1].id) + 1 : 1;
                newId = String(newId).padStart(4, "0");

                let studentData = {
                    id: newId,
                    fullName: name,
                    age: age,
                    gender: gender,
                    dob: dob,
                    phone: phone,
                    course: course,
                    email: email,
                    address: address,
                    profileImage: reader.result // ✅ Base64 properly stored
                };

                fetch("http://localhost:4000/students", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(studentData)
                })
                    .then(() => {
                        alert("✅ Student Added Successfully!");
                        window.location.href = "../index.html";
                    });
            });
    };
});

