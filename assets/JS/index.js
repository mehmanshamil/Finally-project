let categoryMovies = document.getElementById("categoryMovies");
let moviesProducts = document.getElementById("moviesProducts");
let categoryTrend = document.getElementById("categoryTrend");
let loadMore = document.getElementById("loadMore");
let wishLength = document.getElementById("wishLength");

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
                                <p>${item.title}</p>
                                <div class="d-flex align-items-center gap-2">
                                    <i class="fa-regular fa-clock"></i>
                                    <span>${item.duration}</span>
                                </div>
                            </div>
                            <i class="fa-solid plays fa-play"></i>
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

async function categoryGet(){
    await axios.get("https://6589aaa6324d4171525951a6.mockapi.io/user/MovieCategory")
    .then((res) =>{
        db = res.data;
        console.log(db);
        db.forEach((item) =>{
        let div = document.createElement("div");
        div.className="col-xl-3 mt-2 col-md-6 col-sm-12"
        div.innerHTML=`
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
                    <i onclick="addToWish(${item.id})" class="fa-regular wish fa-heart"></i>
                    <div class="content">
                        <div class="detailContent">
                            <p>${item.title}</p>
                            <div class="d-flex align-items-center gap-2">
                                <i class="fa-regular fa-clock"></i>
                                <span>${item.duration}</span>
                            </div>
                        </div>
                        <i class="fa-solid plays fa-play"></i>
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
function addToWish(id) {
    let wish = JSON.parse(localStorage.getItem("wish")) || [];
    wish.push(db.find((item) => item.id == id));
    localStorage.setItem("wish", JSON.stringify(wish));
    console.log(wish);
    wishLengthFunc()
}
function wishLengthFunc(){
    let wish = JSON.parse(localStorage.getItem("wish")) || [];
    wishLength.innerHTML=wish.length
}
wishLengthFunc()