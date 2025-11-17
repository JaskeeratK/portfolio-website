// Toggle between light and dark mode
function toggleTheme() {
    const body = document.body;
    const button = document.querySelector(".theme-toggle");

    body.classList.toggle("dark-mode");

    // Change icon
    if (body.classList.contains("dark-mode")) {
        button.textContent = "☀️";     // Sun icon for light mode
        localStorage.setItem("theme", "dark");
    } else {
        button.textContent = "🌙";     // Moon icon for dark mode
        localStorage.setItem("theme", "light");
    }
}

// Load saved theme on page load
window.onload = function () {
    const savedTheme = localStorage.getItem("theme");
    const button = document.querySelector(".theme-toggle");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        button.textContent = "☀️";
    } else {
        button.textContent = "🌙";
    }
};
// IMAGE MODAL (click to view full image)
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("fullImg");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".project-img").forEach(img => {
    img.addEventListener("click", () => {
        modal.style.display = "block";
        modalImg.src = img.src;
    });
});

closeBtn.onclick = () => {
    modal.style.display = "none";
};

window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
