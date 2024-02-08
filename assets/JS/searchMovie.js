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
                moviesProducts.innerHTML = `<p class="mt-1 alert">The information is not defined, please try again !</p>`
            } else {
                display(data);
            }
            // srcMovie.reset();
        })
        .catch((err) => console.log(err))

}

function display(data) {
    moviesProducts.innerHTML=''
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

