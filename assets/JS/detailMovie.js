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

async function getPlayerMovie() {
    let descripText = document.getElementById("descripText");
    let movieDetal = document.getElementById("movieDetal");
    let id = new URLSearchParams(window.location.search).get('id');
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
                <p><i onclick="addSaveFunc(${thisMovie.id},this)" class="fa-solid added fa-plus"></i> Add to List</p>
                <p>Price : ${thisMovie.price} $</p>
                <p>
                ${thisMovie.description}
                </p>
                <button><i class="fa-solid mx-1 fa-play"></i> Watch Now</button>
            </div>
            <div class="play">
            <i onclick="myfunc('${thisMovie.videoUrl}')" class="fa-solid fa-play"></i>
            </div>
            </div>
        `
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

function myfunc(url) {
    console.log(url);
    const videoId = extractVideoIdFromUrl(url);
    openVideo(videoId);
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