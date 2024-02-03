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
