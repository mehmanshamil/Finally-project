const header = document.querySelector("header");
let wishLengtH = document.getElementById("wishLength");

document.addEventListener("scroll", () => {
    const scroolY = window.scrollY;
    if (scroolY > 200) {
        header.classList.add("headerFix")
    } else {
        header.classList.remove("headerFix")
    }
})
function addToWish(id, element) {
    let wish = JSON.parse(localStorage.getItem("wish")) || [];
    let wishItem = wish.find((item) => item.id == id);

    if (wishItem) {
        wishAlert.style.display = "block";
        setInterval(() => {
            wishAlert.style.display = "none";
        }, 5000);
    } else {
        element.classList.remove("fa-regular");
        element.classList.add("fa-solid");
        element.style.color = "yellow"
        wish.push(db.find((item) => item.id == id));
        localStorage.setItem("wish", JSON.stringify(wish));
    }
    wishLengthFunc();
    wishlistGet();
}
function wishLengthFunc() {
    let wish = JSON.parse(localStorage.getItem("wish")) || [];
    wishLengtH.innerHTML = wish.length
}
wishLengthFunc()

// Wishlist 
let wishListen = document.getElementById("wishListen");
let wish = document.querySelector(".wish");
let wishHead = document.querySelector(".wishHead");
wishHead.addEventListener("click", wishlistScreen)
let handle = true;

function wishlistGet() {
    wishListen.innerHTML = "";
    let wish = JSON.parse(localStorage.getItem("wish")) || [];
    wish.forEach((item, index) => {
        let div = document.createElement("div");
        div.className = "wishBox"
        div.innerHTML = `
        <img src="${item.image}" alt="${item.title} img">
        <div class="d-flex w-100 align-items-center justify-content-between">
            <div class="content">
                <span onclick="getMovie(${item.id})" class="movieName">${item.title}</span>
                <span><i class="fa-regular fa-clock"></i>${item.duration}</span>
                <span>Price: ${item.price}$</span>
            </div>
            <div class="addOption">
             <i onclick="removeWishFunc(${index})" class="fa-solid removeWish fa-x"></i>
            <i onclick="getMovie(${item.id})" class="fa-solid plays fa-play"></i>
            </div>
        </div>
        `
        wishListen.appendChild(div);
    })
}
wishlistGet()

// get Movie Product
function getMovie(id) {
    window.location.href = `../../assets/Page/detaillMovie.html?id=${id}`;
}

function removeWishFunc(index) {
    let wish = JSON.parse(localStorage.getItem("wish")) || [];
    wish.splice(index, 1);
    localStorage.setItem("wish", JSON.stringify(wish));
    wishlistGet();
    wishLengthFunc();
    wishlistScreen();
}

function wishlistScreen() {
    if (handle) {
        wish.style.display = "block"
    } else {
        wish.style.display = "none"
    }
    handle = !handle
}

window.onload = () => {
    let id = new URLSearchParams(window.location.search).get('userId');
    if (id) {
        getUserName(id)
    }
}

async function getUserName(id) {
    let user = document.querySelector(".logo");
    let profileUser = document.querySelector(".profileUser");
    let account = await axios.get(`https://65b7689c46324d531d548041.mockapi.io/account/${id}`)
    let myAccount = account.data;
    if (account) {
        profileUser.innerHTML = ''
        profileUser.innerHTML = `
        <img src="${myAccount.image}" alt="user photo">
        <span><i class="fa-solid mx-1 fa-wallet"></i> ${myAccount.money}$</span>
        <div class="accountSettinngs">
        <span onclick="getMySettings(${myAccount.id})" class="d-flex gap-2"> <i class="fa-solid fa-gear fa-spin"></i> Settings </span>
        <span onclick="logOut()" class="logOut gap-2"><i class="fa-solid fa-arrow-right-from-bracket"></i> Log out</span>
        </div>
        `
        let div = document.createElement("div");
        div.className = "welcome"
        div.innerHTML = ''
        div.innerHTML = `
         <div class="userNameAcc">
         <img src="${myAccount.image}" alt="image">
         <span> ${myAccount.userName}</span>
         </div>
         <span>Welcome ! </span>
        `
        let currentPage = window.location.href;
        if (currentPage.includes("detaillMovie.html")) {
        } else {
            user.appendChild(div)
            setTimeout(() => {
                user.removeChild(div)
            }, 3500)
        }

    } else {
        window.location.href = "/";
    }
}

function logOut() {
    window.location.href = "/";
}

function closedSetting() {
    let settAcc = document.getElementById("settAcc");
    settAcc.style.display = "none";
}

let newImage = document.getElementById("newImage");

async function getMySettings(id) {
    let account = await axios.get(`https://65b7689c46324d531d548041.mockapi.io/account/${id}`)
    let myAccount = account.data;
    let header = document.querySelector("header");
    let div = document.createElement("div");
    div.className = "accountSettingsInf";
    div.id = "settAcc"
    div.innerHTML = `
    <form id="SettingsChange" action="#" method="post">
    <i onclick="closedSetting()" id="closeSett" class="fa fa-xmark"></i>
    <div class="image">
        <img src="${myAccount.image}" alt="photo">
        <input id="newImage" type="text" placeholder="Url image">
    </div>
    <div class="contentSet">
        <label>My Cash: ${myAccount.money}$</label>
        <label for="newName">Name:</label>
        <input required id="newName" value="${myAccount.userName}" type="text">
        <label for="newsurname">Surname:</label>
        <input required placeholder="surname" id="newsurname" type="text">
        <label for="newemail">Email:</label>
        <input required id="newemail" value="${myAccount.email}" type="email">
        <label for="newPass">Password:</label>
        <input required id="newPass" value="${myAccount.password}" type="password">
        <button type="button" onclick="saveChanges(${myAccount.id})">Save</button>
    </div> 
        </form>
    `
    header.appendChild(div);
    let settAcc = document.getElementById("settAcc");
    settAcc.style.display = "flex";
}

function saveChanges(id) {
    let userName = document.getElementById("newName");
    let image = document.getElementById("newImage");
    let newsurname = document.getElementById("newsurname");
    let newemail = document.getElementById("newemail");
    let newPass = document.getElementById("newPass");
    let photoDefault = "https://www.shutterstock.com/image-vector/default-profile-picture-avatar-photo-600nw-1681253560.jpg"
    image.value = image.value === "" ? photoDefault : image.value;

    let data = {
        userName: userName.value,
        image: image.value,
        userSurname: newsurname.value,
        email: newemail.value,
        passWord: newPass.value
    };
    axios.put(`https://65b7689c46324d531d548041.mockapi.io/account/${id}`, data)
        .then(() => {
            let id = new URLSearchParams(window.location.search).get('userId');
            getUserName(id)
            closedSetting();
            console.log(data);
        })
}
document.getElementById("menuList").addEventListener("click", function (event) {
    event.preventDefault();

    let userid = new URLSearchParams(window.location.search).get('userId');

    if (event.target.id === "homePage" || event.target.parentNode.id === "homePage") {
        if (userid) {
            window.location.href = `../../index.html?userId=${userid}`;
        } else {
            window.location.href = "/"
        }
    } else if (event.target.id === "addList" || event.target.parentNode.id === "addList") {
        if (userid) {
            window.location.href = `./assets/Page/addList.html?userId=${userid}`;
        } else {
            window.location.href = "../../assets/Page/addList.html"
        }
    } else {
        window.location.href = "/"
    }
});

let burgerIcon = document.getElementById("burgerIcon");
burgerIcon.addEventListener("click", menuBurgerGet);
let handlee = true;
let addlist = document.querySelector(".add-list")
let nav = document.querySelector("nav")
function menuBurgerGet() {

    if (handle) {
        addlist.style.display = "flex"
        nav.style.display = "flex"
        // addlist.style.animation="menuAnime 2s ease forwards"
        // nav.style.animation="menuAnime 2s ease forwards"
    } else {
        addlist.style.display = "none"
        nav.style.display = "none"
        // addlist.style.animation="menuAnimeHide 2s ease forwards"
        // nav.style.animation="menuAnimeHide 2s ease forwards"
    }
    handle = !handle
}
