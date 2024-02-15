let password = document.getElementById("password");
let login = document.getElementById("loginGet");
let username = document.getElementById("username");
let alertF = document.querySelector(".alertFalse");

// Login
login.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        let res = await axios.get("https://65b7689c46324d531d548041.mockapi.io/account");
        let db = res.data;
        let found = false;
        db.forEach((item) => {
            if (password.value === item.password && username.value === item.userName || username.value === item.email) {
                found = true;
                if (item.userName.includes("admin") && item.password === password.value) {
                    window.location.href = `../../assets/Page/adminPage.html`
                } else {
                    userLogin(item.id)
                }
                return;
            }
        });

        if (found) {
            alertF.style.display = "block";
            alertF.style.backgroundColor = "green";
            alertF.innerHTML = `Succes <i class="fa-regular mx-1 fa-circle-check"></i>`;

        } else {
            alertF.style.display = "block";
            alertF.style.backgroundColor = "red";
            alertF.innerHTML = "Your password or username is wrong, please try again !";
        }
    } catch (err) {
        console.log(err);
    }
});

function userLogin(id) {
    window.location.href = `../../index.html?userId=${id}`;
}
// Remember Me Functionality
let rememberMeCheckbox = document.getElementById("rememberMe");

let savedUsername = localStorage.getItem("rememberedUsername");
if (savedUsername) {
    username.value = savedUsername;
    rememberMeCheckbox.checked = true;
}

rememberMeCheckbox.addEventListener("change", function () {
    if (this.checked) {
        localStorage.setItem("rememberedUsername", username.value);
    } else {
        localStorage.removeItem("rememberedUsername");
    }
});
let rememberMeCheck = document.querySelector(".remmeber");
rememberMeCheck.addEventListener("click", checkForm)
let checkToggle = true;
console.log(rememberMeCheck);
function checkForm() {
    console.log("adsas");
    if (checkToggle) {
        rememberMeCheck.innerHTML = `
        <i class="fa-regular checkk fa-circle-check"></i>
        <input id="rememberMe" type="checkbox">
                        <label for="rememberMe">Remember Me </label>
        `
    } else {
        rememberMeCheck.innerHTML = `
        <input id="rememberMe" type="checkbox">
                        <label for="rememberMe">Remember Me </label>
        `
    }
    checkToggle = !checkToggle
}