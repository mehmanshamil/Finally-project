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
            if (password.value == item.password && username.value == item.userName || username.value == item.email) {
                found = true;
                if (item.userName.includes("admin") && item.password == password.value) {
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