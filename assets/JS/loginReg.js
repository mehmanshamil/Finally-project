let seeNPass = document.getElementById("seenPass");
let passWord = document.getElementById("password");
let tooggle = true;

seeNPass.addEventListener("click", passwordToggle);

function passwordToggle() {
    if (tooggle) {
        passWord.setAttribute("type", "text");
        seeNPass.classList.remove("fa-eye");
        seeNPass.classList.add("fa-eye-slash");
    } else {
        passWord.setAttribute("type", "password");
        seeNPass.classList.remove("fa-eye-slash");
        seeNPass.classList.add("fa-eye");
    }
    tooggle = !tooggle;
}