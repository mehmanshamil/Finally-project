let register = document.getElementById("loginGet");
let alertF = document.querySelector(".alertFalse");

// Register
let username = document.getElementById("username");
let newEmail = document.getElementById("email");
let newPassword = document.getElementById("password");
register.addEventListener("submit", getRegister)
function getRegister(e) {
    e.preventDefault();
    let data = {
        userName: username.value,
        email: newEmail.value,
        password: newPassword.value,
        price: 0
    }
    console.log(data);
    axios.post("https://65b7689c46324d531d548041.mockapi.io/account", data)
        .then(() => {
            register.reset();
            alertF.style.display = "block";
            alertF.style.backgroundColor = "green";
            alertF.innerHTML = `Succes <i class="fa-regular mx-1 fa-circle-check"></i>`;

        })
        .catch((err) => console.log(err))
}
