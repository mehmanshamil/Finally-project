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
                        <i onclick="addToWish(${item.id},this)" class="fa-regular wish fa-heart"></i>
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
                </div>
            `);
        });
    } catch (error) {
        console.log(error);
    }
}


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
    // wishlistGet();
}

trendGet();

function getMovieLocation(movieid) {
    let userid = new URLSearchParams(window.location.search).get('userId');
    if (userid) {
        window.location.href = `../../assets/Page/detaillMovie.html?userId=${userid}&movieId=${movieid}`
    } else {
        window.location.href = `../../assets/Page/detaillMovie.html?movieId=${movieid}`
    }
}

let movieAnime = document.getElementById("movieAnime")

async function getPlayerMovie() {
    let loading = true;
    if (loading) {
        movieAnime.style.display = "flex"
    }
    let descripText = document.getElementById("descripText");
    let movieDetal = document.getElementById("movieDetal");
    let id = new URLSearchParams(window.location.search).get('movieId');
    await axios.get("https://65b7689c46324d531d548041.mockapi.io/products")
        .then((res) => {
            db = res.data;

            let thisMovie = db.find(value => value.id == id);
            if (!thisMovie) {
                window.location.href = "/";
            }
            movieDetal.innerHTML = `
             <img class="movieDetailPlay" src="${thisMovie.image}" alt="img">
            <div class="content mx-5">
            <div class="informationMovie">
                <h2>${thisMovie.title}</h2>
                <p>IMDB:<i class="fa-solid mx-2 starIMDB fa-star"></i><span>${thisMovie.imdb}</span> / 10</p>
                <p>Category: <span>${thisMovie.category}</span></p>
                <p>Date: <span>${thisMovie.uploadTime}</span></p>
                <p><i class="fa-regular fa-clock"></i> Time : <span>${thisMovie.duration}</span></p>
                <div class="d-flex align-items-center">
                <div><i onclick="addSaveFunc(${thisMovie.id},this)" class="fa-solid added fa-plus"></i> Add to List</div>
                <div class="mx-3 shared"><i class="fa-solid  fa-share-nodes"></i><span>Share</span>
                <div class="shareMovie">
                <a href="https://www.facebook.com">
                <i class="fa-brands fa-facebook-f"></i>
                </a>
                <a href="https://www.instagram.com">
                    <i class="fa-brands fa-instagram"></i>
                </a>
                <a href="https://www.linkedin.com/">
                    <i class="fa-brands fa-linkedin-in"></i>
                </a>
                <a href="https://twitter.com/">
                    <i class="fa-brands fa-twitter"></i>
                </a>
            </div>
                </div>
                </div>
                <p>Price : ${thisMovie.price} $</p>
                <p class="description">
                ${thisMovie.description}
                </p>
                <button onclick="getMoviePlays('${thisMovie.videoUrl}', ${thisMovie.price})"><i class="fa-solid mx-1 fa-play"></i> Watch Now</button>
            </div>
            <div class="play">
            <i onclick="playMovie('${thisMovie.fragman}')" class="fa-solid fa-play"></i>
            </div>
            </div>
        `
            let loading = false;
            if (!loading) {
                movieAnime.style.display = "none"
            }
            descripText.textContent = thisMovie.description;
        })
        .catch(err => console.log(err))
}
getPlayerMovie()


function addSaveFunc(id, element) {
    let list = JSON.parse(localStorage.getItem("list")) || [];
    let listItem = list.find((item) => item.id.toString() === id.toString());

    if (listItem) {
        element.classList.remove("fa-thumbs-up");
        element.classList.add("fa-plus");
        list = list.filter((item) => item.id.toString() !== id.toString());
        localStorage.setItem("list", JSON.stringify(list));
    } else {
        element.classList.remove("fa-plus");
        element.classList.add("fa-thumbs-up");
        list.push(db.find((item) => item.id.toString() === id.toString()));
        localStorage.setItem("list", JSON.stringify(list));
    }
}

// WATCHING

function extractVideoIdFromUrl(url) {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))([^"&?\/\s]{11})/);
    return match && match[1] ? match[1] : null;
}

function playMovie(url) {
    console.log(url);
    const videoId = extractVideoIdFromUrl(url);
    openVideo(videoId);
}


async function getMoviePlays(url, price) {
    let userId = new URLSearchParams(window.location.search).get('userId');
    let payment = document.getElementById("payment");
    payment.style.display = "flex"
    payment.innerHTML = `
            <i id="closePayment" onclick="closePay()" class="fa-solid fa-xmark"></i>
            <h3>Are you sure you will buy the movie?</h3>
            <div class="buttons">
                <button id="yesButton" class="yes">Yes</button>
                <button onclick="closePay()" class="no">No</button>
             </div> 
    `;
    let yesButton = document.getElementById("yesButton");
    yesButton.addEventListener("click", async function () {
        if (userId) {
            try {
                const response = await axios.get(`https://65b7689c46324d531d548041.mockapi.io/account/${userId}`);
                let userInfo = response.data;
                if (userInfo.money >= price) {
                    let resultPrice = userInfo.money - price;
                    console.log(resultPrice);
                    const videoId = extractVideoIdFromUrl(url);
                    openVideo(videoId);
                    closePay();
                    updatedMoney(resultPrice, userId);
                } else {
                    payment.style.display = "flex"
                    payment.innerHTML = `
                            <h3 class="moneyAlert">You don't have enough money !</h3>
                    `
                    setTimeout(() => {
                        payment.style.display = "none"
                    }, 3500);
                }
            } catch (error) {
                console.error('error', error);
            }
        } else {
            window.location.href = `../../assets/Page/login.html`
        }
    });
}

function updatedMoney(money, userid) {
    let data = {
        money: money
    }
    axios.put(`https://65b7689c46324d531d548041.mockapi.io/account/${userid}`, data)
        .then(() => {
            let id = new URLSearchParams(window.location.search).get('userId');
            getUserName(id)
        })
}

function closePay() {
    let payment = document.getElementById("payment");
    payment.style.display = "none";
}

function openVideo(videoId) {
    const popupContainer = document.getElementById('popup-container');
    const videoIframe = popupContainer.querySelector('iframe');
    videoIframe.src = `https://www.youtube.com/embed/${videoId}`;
    popupContainer.style.display = 'flex';
}

function closeVideo() {
    const popupContainer = document.getElementById('popup-container');
    const videoIframe = popupContainer.querySelector('iframe');
    videoIframe.src = '';
    popupContainer.style.display = 'none';
}

let srcPage = document.getElementById("srcPage");
srcPage.addEventListener("click", getSrc);
function getSrc(e) {
    e.preventDefault();
    let userid = new URLSearchParams(window.location.search).get('userId');
    if (userid) {
        window.location.href = `../../assets/Page/searchMovie.html?userId=${userid}`
    } else {
        window.location.href = `../../assets/Page/searchMovie.html`
    }
}
let homePage = document.getElementById("homePage");
let movieGet = document.getElementById("movieGet");
movieGet.addEventListener("click", getIndexToList);
homePage.addEventListener('click', getIndexToList);

function getIndexToList(e) {
    e.preventDefault();
    let userid = new URLSearchParams(window.location.search).get('userId');
    if (userid) {
        window.location.href = `../../index.html?userId=${userid}`;
    } else {
        window.location.href = "/"
    }
}