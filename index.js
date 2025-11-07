let user = JSON.parse(localStorage.getItem("loggedInUser"));

const authButtons = document.getElementById("authButtons");
const userSection = document.getElementById("userSection");
const usernameText = document.getElementById("usernameText");
const logoutBtn = document.getElementById("logoutBtn");

const searchSection = document.getElementById("searchSection");
const loginMessage = document.getElementById("loginMessage");

if (user) {
    authButtons.classList.add("hidden");
    userSection.classList.remove("hidden");

    searchSection.classList.remove("hidden");
    loginMessage.classList.add("hidden");

    usernameText.textContent = user.username.slice(0, 8) + "...";
} else {
    authButtons.classList.remove("hidden");
    userSection.classList.add("hidden");

    searchSection.classList.add("hidden");
    loginMessage.classList.remove("hidden");
}

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        window.location.href = "./src/auth/login.html";
    });
}
