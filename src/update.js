let studentId = new URLSearchParams(window.location.search).get("id");

// Form Inputs
let fullName = document.getElementById("studentFullName");
let profilePic = document.getElementById("studentPicture");
let age = document.getElementById("studentAge");
let gender = document.getElementById("studentGender");
let dob = document.getElementById("studentDob");
let phone = document.getElementById("studentMobileNo");
let course = document.getElementById("course");
let email = document.getElementById("studentEmail");
let address = document.getElementById("studentAddress");
let updateForm = document.getElementById("updateForm");

let oldImage = ""; // store previous image

// ✅ Load Student Data
let loadStudent = async () => {
    try {
        let res = await fetch(`http://localhost:4000/students/${studentId}`);
        let data = await res.json();

        fullName.value = data.fullName;
        age.value = data.age;
        gender.value = data.gender;
        dob.value = data.dob;
        phone.value = data.phone;
        course.value = data.course;
        email.value = data.email;
        address.value = data.address;
        oldImage = data.profileImage;

    } catch (error) {
        console.log("Error loading student:", error);
    }
};

loadStudent();


// ✅ Convert Image to Base64
let toBase64 = (file) => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};


// ✅ Handle Form Submit
updateForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let profileImage = oldImage;

    if (profilePic.files.length > 0) {
        profileImage = await toBase64(profilePic.files[0]);
    }

    let updatedStudent = {
        id: studentId,
        fullName: fullName.value,
        age: age.value,
        gender: gender.value,
        dob: dob.value,
        phone: phone.value,
        course: course.value,
        email: email.value,
        address: address.value,
        profileImage: profileImage
    };

    try {
        await fetch(`http://localhost:4000/students/${studentId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedStudent)
        });

        alert("✅ Student Updated Successfully!");
        window.location.href = "../index.html"; // correct path because index.html is in same folder

    } catch (error) {
        console.log("Update Failed:", error);
    }
});
