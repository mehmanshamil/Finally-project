let categoryMovies = document.getElementById("categoryMovies");
let moviesProducts = document.getElementById("moviesProducts");
let categoryTrend = document.getElementById("categoryTrend");
let loadMore = document.getElementById("loadMore");

let db = [];

async function trendGet() {
    try {
        const response = await axios.get("https://65b7689c46324d531d548041.mockapi.io/products");
        db = response.data;
        const categoryTrend = new Swiper('#categoryTrend', {
            slidesPerView: 3,
            centeredSlides: true,
            spaceBetween: 30,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });

        db.forEach((item) => {
            categoryTrend.appendSlide(`
                <div class="swiper-slide swipperSlide">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="detailInfo">
                        <i onclick="addToWish(${item.id})" class="fa-regular wish fa-heart"></i>
                        <div class="content">
                            <div class="detailContent">
                            <p><a href="../../assets/Page/detaillMovie.html?id=${item.id}">${item.title}</a></p>
                                <div class="d-flex align-items-center gap-2">
                                    <i class="fa-regular fa-clock"></i>
                                    <span>${item.duration}</span>
                                </div>
                            </div>
                            <p><a href="../../assets/Page/detaillMovie.html?id=${item.id}"> <i class="fa-solid plays fa-play"></i></a></p>
                        </div>
                    </div>
                </div>
            `);
        });
    } catch (error) {
        console.log(error);
    }
}

trendGet();

async function categoryGet() {
    await axios.get("https://6589aaa6324d4171525951a6.mockapi.io/user/MovieCategory")
        .then((res) => {
            db = res.data;
            db.forEach((item) => {
                let div = document.createElement("div");
                div.className = "col-xl-3 mt-2 col-md-6 col-sm-12"
                div.innerHTML = `
        <div class="categoryBox">
            <img class="imgCat" src="${item.image}" alt="${item.title}">
            <p class="textCategory">
                ${item.content}
            </p>
            <div class="action">
                <img src="${item.icon}"
                    alt="logo">
                <p>Movies</p>
            </div>
        </div>
        `
                categoryMovies.appendChild(div)
            })
        })
        .catch(err => console.log(err))
}
categoryGet()

let page = 1;
let limit = 8;
loadMore.addEventListener("click", moviesGet);

async function moviesGet() {
    try {
        const response = await axios.get(`https://65b7689c46324d531d548041.mockapi.io/products?page=${page}&limit=${limit}`);
        db = response.data;
        db.forEach((item) => {
            let div = document.createElement("div");
            div.className = "moiveProBox";
            div.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="detailInfo">
                    <i onclick="addToWish(${item.id},this)" class="wish fa-regular wishItem fa-heart"></i>
                    <div class="content">
                        <div class="detailContent">
                            <p><a href="../../assets/Page/detaillMovie.html?id=${item.id}">${item.title}</a></p>
                            <div class="d-flex align-items-center gap-2">
                                <i class="fa-regular fa-clock"></i>
                                <span>${item.duration}</span>
                            </div>
                        </div>
                        <p><a href="../../assets/Page/detaillMovie.html?id=${item.id}"> <i class="fa-solid plays fa-play"></i></a></p>
                    </div>
                </div>
            `;
            moviesProducts.appendChild(div);
        });
        page++;
    } catch (err) {
        console.log(err);
    }
}
moviesGet()

let wishAlert = document.getElementById("wishAlert");

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


window.onload = () => {
    let id = new URLSearchParams(window.location.search).get('id');
    if (id) {
        getUserName(id)
    }
}

async function getUserName(id) {
    let user = document.querySelector(".logo");
    let account = await axios.get(`https://65b7689c46324d531d548041.mockapi.io/account/${id}`)
    let myAccount = account.data;
    if (account) {
        let div = document.createElement("div");
        div.className = "profileUser"
        div.innerHTML = `
        <img src="${myAccount.image}" alt="user photo">
        <span><i class="fa-solid mx-1 fa-wallet"></i> ${myAccount.price}$</span>
        <div class="accountSettinngs">
        <span onclick="getMySettings(${myAccount.id})" class="d-flex gap-2"> <i class="fa-solid fa-gear fa-spin"></i> Settings </span>
        <span onclick="logOut()" class="logOut gap-2"><i class="fa-solid fa-arrow-right-from-bracket"></i> Log out</span>
        </div>
    `
        user.appendChild(div)

        let div2 = document.createElement("div");
        div2.className = "welcome"
        div2.innerHTML = `
         <div class="userNameAcc">
         <img src="${myAccount.image}" alt="image">
         <span> ${myAccount.userName}</span>
         </div>
         <span>Welcome ! </span>
        `
        user.appendChild(div2)
        setTimeout(() => {
            user.removeChild(div2)
        }, 3500)

    } else {
        window.location.href = "/";
    }
}

function logOut() {
    window.location.href = "/";
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
        <label>My Cash: ${myAccount.price}$</label>
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
            closedSetting();
            console.log(data);
        })
}


function closedSetting() {
    let settAcc = document.getElementById("settAcc");
    settAcc.style.display = "none";
}
