
const form = document.getElementById("regForm");

const fields = ["name", "roll", "email", "password", "course", "file"];

function showError(id, message) {
    document.getElementById(id + "Error").textContent = message;
}

function clearErrors() {
    fields.forEach(id => showError(id, ""));
    document.getElementById("success").textContent = "";
}

function checkPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])\S{8,}$/.test(password);
}

// Show or hide password
document.getElementById("togglePassword").addEventListener("click", function () {
    const password = document.getElementById("password");
    const isHidden = password.type === "password";

    password.type = isHidden ? "text" : "password";
    this.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");
});

// Live password strength indicator
document.getElementById("password").addEventListener("input", function () {
    const value = this.value;
    const bar = document.getElementById("strengthBar");
    const text = document.getElementById("strengthText");

    let score = 0;

    if (value.length >= 8) score++;
    if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++;
    if (/\d/.test(value)) score++;
    if (/[^A-Za-z0-9\s]/.test(value)) score++;

    const labels = ["", "Weak", "Fair", "Good", "Strong"];
    const colors = ["transparent", "#ff5364", "#ffb84d", "#42c9ff", "#38e6a5"];

    bar.style.width = (score * 25) + "%";
    bar.style.background = colors[score];
    text.textContent = value ? "Password strength: " + labels[score] : "";
});

// Form validation
form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();

    let valid = true;

    const name = document.getElementById("name").value.trim();
    const roll = document.getElementById("roll").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const course = document.getElementById("course").value;
    const file = document.getElementById("file").files[0];

    if (!name) {
        showError("name", "Student name is required.");
        valid = false;
    } else if (!/^[\p{L}][\p{L}\s.'-]*$/u.test(name)) {
        showError("name", "Enter a valid name.");
        valid = false;
    }

    if (!roll) {
        showError("roll", "Roll number is required.");
        valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        showError("email", "Enter a valid email address.");
        valid = false;
    }

    if (!checkPassword(password)) {
        showError(
            "password",
            "Use 8+ characters, uppercase, lowercase, number and symbol (no spaces)."
        );
        valid = false;
    }

    if (!course) {
        showError("course", "Please select a course.");
        valid = false;
    }

    if (!file) {
        showError("file", "Please upload a document.");
        valid = false;
    } else {
        const allowedTypes = [
            "application/pdf",
            "image/jpeg",
            "image/png"
        ];

        if (!allowedTypes.includes(file.type)) {
            showError("file", "Only PDF, JPG and PNG files are allowed.");
            valid = false;
        } else if (file.size > 5 * 1024 * 1024) {
            showError("file", "File size must be 5 MB or less.");
            valid = false;
        }
    }

    if (valid) {
        document.getElementById("success").textContent =
            "✓ All validations passed! Registration form is ready.";

        // Demo only: no data is saved to a server.
        form.reset();

        document.getElementById("strengthBar").style.width = "0";
        document.getElementById("strengthText").textContent = "";
    }
});
