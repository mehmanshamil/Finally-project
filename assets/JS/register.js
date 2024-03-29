let register = document.getElementById("loginGet");
let alertF = document.querySelector(".alertFalse");
const specialChars = /[!@#$%^&*(),.?":{}|<>]/;

// Register
let username = document.getElementById("username");
let newEmail = document.getElementById("email");
let newPassword = document.getElementById("password");
register.addEventListener("submit", getRegister)
async function getRegister(e) {
    e.preventDefault();
    await axios.get("https://65b7689c46324d531d548041.mockapi.io/account")
        .then((res) => {
            let userInfo = res.data;
            let result = userInfo.filter((item) => item.userName == username.value);
            if (result.length > 0 || username.value.includes("admin")) {
                alertF.style.display = "block";
                alertF.style.backgroundColor = "red";
                alertF.innerHTML = `the user is already available !`;
            } else if (newPassword.value.length < 6 || !specialChars.test(newPassword.value)) {
                alertF.style.display = "block";
                alertF.style.backgroundColor = "red";
                alertF.innerHTML = `Password must be at least 6 characters long and contain special characters !`;
            } else {
                let data = {
                    userName: username.value,
                    email: newEmail.value,
                    password: newPassword.value,
                    image: "https://www.shutterstock.com/image-vector/default-profile-picture-avatar-photo-600nw-1681253560.jpg",
                    money: 200
                }
                axios.post("https://65b7689c46324d531d548041.mockapi.io/account", data)
                    .then(() => {
                        register.reset();
                        alertF.style.display = "block";
                        alertF.style.backgroundColor = "green";
                        alertF.innerHTML = `Succes <i class="fa-regular mx-1 fa-circle-check"></i>`;

                    })
            }

        })

        .catch((err) => console.log(err))
}
