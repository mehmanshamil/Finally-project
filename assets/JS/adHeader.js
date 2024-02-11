let minMenu = document.getElementById("minMenu");
let commondPanel = document.querySelector(".commondPanel");
minMenu.addEventListener("click", minMenuFunc)
let menuToggle = true;

function minMenuFunc() {
    if (menuToggle) {
        commondPanel.style.display = "flex"
    } else {
        commondPanel.style.display = "none"
    }
    menuToggle = !menuToggle
}