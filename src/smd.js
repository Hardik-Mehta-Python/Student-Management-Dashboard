let user = JSON.parse(localStorage.getItem("loggedInUser"));

        const authButtons = document.getElementById("authButtons");
        const userSection = document.getElementById("userSection");
        const usernameText = document.getElementById("usernameText");
        const logoutBtn = document.getElementById("logoutBtn");

        if (user) {
            authButtons.classList.add("hidden");
            userSection.classList.remove("hidden");
            usernameText.textContent = user.username.slice(0, 8) + "...";
        }

        if (logoutBtn) {
            logoutBtn.addEventListener("click", () => {
                localStorage.removeItem("loggedInUser");
                window.location.reload();
                window.location.href = "./auth/login.html"
            });
        }