let password = document.getElementById("password");
// let seenPass = document.getElementById("seenPass");
let login = document.getElementById("loginGet");
let username = document.getElementById("username");
let alertF = document.querySelector(".alertFalse");
// let toogle = true;

login.addEventListener("submit", async function (e) {
    e.preventDefault();
    try {
        let res = await axios.get("https://65b7689c46324d531d548041.mockapi.io/account");
        let db = res.data;
        let found = false;

        db.forEach((item) => {
            if (password.value == item.password && username.value == item.userName) {
                found = true;
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

// seenPass.addEventListener("click", paswwordSeen);

// function paswwordSeen() {
//     if (toogle) {
//         password.setAttribute("type", "text");
//         seenPass.classList.remove("fa-eye");
//         seenPass.classList.add("fa-eye-slash");
//     } else {
//         password.setAttribute("type", "password");
//         seenPass.classList.remove("fa-eye-slash");
//         seenPass.classList.add("fa-eye");
//     }
//     toogle = !toogle;
// }
