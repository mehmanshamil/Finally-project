let categoryMovies = document.getElementById("categoryMovies");
let moviesProducts = document.getElementById("moviesProducts");
let categoryTrend = document.getElementById("categoryTrend");
let loadMore = document.getElementById("loadMore");

let db = [];

async function trendGet() {
    try {
        const response = await axios.get("https://65b7689c46324d531d548041.mockapi.io/products");
        db = response.data;
        let data = db.filter((item) => item.trending == true)
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

        data.forEach((item) => {
            categoryTrend.appendSlide(`
                <div class="swiper-slide swipperSlide">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="detailInfo">
                        <i onclick="addToWish(${item.id},this)" class="fa-regular wish fa-heart"></i>
                        <div class="content">
                            <div class="detailContent">
                            <p><a onclick="getMovieLocation(${item.id})" >${item.title}</a></p>
                                <div class="d-flex align-items-center gap-2">
                                    <i class="fa-regular fa-clock"></i>
                                    <span>${item.duration}</span>
                                </div>
                            </div>
                            <p><a onclick="getMovieLocation(${item.id})"> <i class="fa-solid plays fa-play"></i></a></p>
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
                            <p><a onclick="getMovieLocation(${item.id})">${item.title}</a></p>
                            <div class="d-flex align-items-center gap-2">
                                <i class="fa-regular fa-clock"></i>
                                <span>${item.duration}</span>
                            </div>
                        </div>
                        <p><a onclick="getMovieLocation(${item.id})"> <i class="fa-solid plays fa-play"></i></a></p>
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
}

function getMovieLocation(movieid) {
    let userid = new URLSearchParams(window.location.search).get('userId');
    if (userid) {
        window.location.href = `../../assets/Page/detaillMovie.html?userId=${userid}&movieId=${movieid}`
    } else {
        window.location.href = `../../assets/Page/detaillMovie.html?movieId=${movieid}`
    }
}
let srcPage = document.getElementById("srcPage");
srcPage.addEventListener("click", getSrc);
function getSrc(e) {
    e.preventDefault();
    let userid = new URLSearchParams(window.location.search).get('userId');
    if (userid) {
        window.location.href = `./assets/Page/searchMovie.html?userId=${userid}`
    } else {
        window.location.href = `./assets/Page/searchMovie.html`
    }
}
const playBtn = document.querySelector('.playBtn');
const addBtn = document.querySelector('.addBtn');
const play = document.querySelector('.play i');
const videoPlayFragman = document.querySelector('#videoPlayFragman');
const fragmanDescription = document.getElementById('fragmanDescription');
const movieName = document.getElementById('movieName');

playBtn.addEventListener('click', getMoviePlay);
play.addEventListener('click', getPlayFragman);

function extractVideoIdFromUrl(url) {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))([^"&?\/\s]{11})/);
    return match && match[1] ? match[1] : null;
}

async function getMoviePlay() {
    try {
        const response = await axios.get(`https://65b7689c46324d531d548041.mockapi.io/products`);
        const videos = response.data;
        const db = videos.sort((a, b) => b.id - a.id);
        const movieid = db[0].id;
        let userid = new URLSearchParams(window.location.search).get('userId');
        if (userid) {
            window.location.href = `../../assets/Page/detaillMovie.html?userId=${userid}&movieId=${movieid}`
        } else {
            window.location.href = `../../assets/Page/detaillMovie.html?movieId=${movieid}`
        }
    } catch (error) {
        console.error(error);
    }
}

async function getMovieDetails() {
    try {
        const response = await axios.get(`https://65b7689c46324d531d548041.mockapi.io/products`);
        const videos = response.data;
        const db = videos.sort((a, b) => b.id - a.id);
        const videoData = db[0];
        fragmanDescription.innerHTML = `${videoData.description}`;
        movieName.innerHTML = `${videoData.title}`;
    } catch (error) {
        console.error(error);
    }
}

getMovieDetails();
async function getPlayFragman() {
    videoPlayFragman.style.display = "flex";
    try {
        const response = await axios.get(`https://65b7689c46324d531d548041.mockapi.io/products`);
        const videos = response.data;
        const db = videos.sort((a, b) => b.id - a.id);
        const videoData = db[0];
        if (videoData && videoData.fragman) {
            const fragman = extractVideoIdFromUrl(videoData.fragman);
            console.log(fragman);
            if (fragman) {
                videoPlayFragman.innerHTML = `
                   <div class="containerFragman">
                       <i id="closed" onclick="closed()" class="fa-solid fa-x"></i>
                       <iframe width="560" height="315" src="https://www.youtube.com/embed/${fragman}" frameborder="0" allowfullscreen></iframe>
                   </div>
                `;
            } else {
                console.error("error.");
            }
        } else {
            console.error("error.");
        }
    } catch (error) {
        console.error(error);
    }
}


function closed() {
    videoPlayFragman.style.display = "none";
    const iframe = videoPlayFragman.querySelector('iframe');
    if (iframe) {
        const iframeSrc = iframe.src;
        iframe.src = iframeSrc;
    }
}

addBtn.addEventListener('click', function () {
    let userid = new URLSearchParams(window.location.search).get('userId');
    if (userid) {
        window.location.href = `../../assets/Page/addList.html?userId=${userid}`
    } else {
        window.location.href = `../../assets/Page/addList.html`
    }

});