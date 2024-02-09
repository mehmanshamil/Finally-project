let moviesProducts = document.getElementById("moviesProducts");
// const db = [];
let movieAnime = document.getElementById("movieAnime")

async function moviesGet() {
    let loading = true;
    if (loading) {
        movieAnime.style.display = "flex"
    }
    try {
        const response = await axios.get(`https://65b7689c46324d531d548041.mockapi.io/products`);
        db = response.data;
        display(db)
        loading = false;
        if (!loading) {
            movieAnime.style.display = "none"
        }
    } catch (err) {
        console.log(err);
    }
}
moviesGet()

// Search Movie
let srcMovie = document.getElementById("srcMovie");
let inp = document.getElementById("movieNameVal");
srcMovie.addEventListener("input", searchMovie);


async function searchMovie(e) {
    e.preventDefault()
    moviesProducts.innerHTML = ""
    await axios.get("https://65b7689c46324d531d548041.mockapi.io/products")
        .then((res) => {
            db = res.data
            let data = db.filter((item) => item.title.toLowerCase().includes(inp.value.toLowerCase()));
            if (data.length <= 0) {
                moviesProducts.style.height = "35rem";
                moviesProducts.innerHTML = `<div class="mt-1 alert"><p>The information is not defined, please try again !</p></div>`
            } else {
                display(data);
            }
            // srcMovie.reset();
        })
        .catch((err) => console.log(err))

}
// Sort
let PriceHighToLow = document.getElementById("PriceHighToLow");
let PriceLowToHigh = document.getElementById("PriceLowToHigh");
let AlphabeticalAscending = document.getElementById("AlphabeticalAscending");
let AlphabeticalDescending = document.getElementById("AlphabeticalDescending");
let defaultt = document.getElementById("default");

let inputs = [
    PriceHighToLow,
    PriceLowToHigh,
    AlphabeticalAscending,
    AlphabeticalDescending,
    defaultt
];

function showOnly(inputToShow) {
    inputs.forEach(input => {
        if (input === inputToShow) {
            input.style.display = "block";
            input.classList.add("active")
        } else {
            input.style.display = "none";
        }
    });
}

PriceHighToLow.addEventListener("click", () => getExpencive());
PriceLowToHigh.addEventListener("click", () => getCheap());
AlphabeticalAscending.addEventListener("click", () => alphanetAfromz());
AlphabeticalDescending.addEventListener("click", () => alphanetZfroma());
defaultt.addEventListener("click", () => moviesGet());

async function getExpencive() {
    await axios.get("https://65b7689c46324d531d548041.mockapi.io/products")
    .then((res) =>{
        db = res.data;
        let data = db.sort((a,b) => b.price - a.price);
        showOnly(PriceHighToLow); 
        display(data);
    })
    .catch((err) => console.log(err))
}

async function getCheap() {
    await axios.get("https://65b7689c46324d531d548041.mockapi.io/products")
    .then((res) =>{
        db = res.data;
        let data = db.sort((a,b) => a.price - b.price);
        showOnly(PriceLowToHigh); 
        display(data);
    })
    .catch((err) => console.log(err))
}

async function alphanetAfromz() {
    await axios.get("https://65b7689c46324d531d548041.mockapi.io/products")
    .then((res) =>{
        db = res.data;
        let data = db.sort((a,b) => a.title.localeCompare(b.title));
        showOnly(AlphabeticalAscending); 
        display(data);
    })
    .catch((err) => console.log(err))
}

async function alphanetZfroma() {
    await axios.get("https://65b7689c46324d531d548041.mockapi.io/products")
    .then((res) =>{
        db = res.data;
        let data = db.sort((a,b) => b.title.localeCompare(a.title));
        showOnly(AlphabeticalDescending); 
        display(data);
    })
    .catch((err) => console.log(err))
}

let filter = document.getElementById("filter");
let filterIcon = document.getElementById("filterIcon");
filter.addEventListener("click", filterOpern);
let content = document.querySelector(".content");
let access = true;
function filterOpern() {
    if (access) {
        filterIcon.style.rotate="180deg"
        filterIcon.style.transition="1s"
        content.style.display = "flex"
    } else {
        filterIcon.style.rotate="0deg"
        content.style.display = "none"
    }
    access = !access

}

function display(data) {
    moviesProducts.innerHTML = ''
    data.forEach((item) => {
        let div = document.createElement("div");
        div.className = "moiveProBox";
        div.innerHTML = `
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
        `;
        moviesProducts.appendChild(div);
    });
}

function getMovieLocation(movieid) {
    let userid = new URLSearchParams(window.location.search).get('userId');
    if (userid) {
        window.location.href = `../../assets/Page/detaillMovie.html?userId=${userid}&movieId=${movieid}`
    } else {
        window.location.href = `../../assets/Page/detaillMovie.html?movieId=${movieid}`
    }
}

