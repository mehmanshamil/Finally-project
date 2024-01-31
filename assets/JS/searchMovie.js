let moviesProducts = document.getElementById("moviesProducts");
// const db = [];
async function moviesGet() {
    try {
        const response = await axios.get(`https://65b7689c46324d531d548041.mockapi.io/products`);
        db = response.data;
        // display(db)
        db.forEach((item) => {
            let div = document.createElement("div");
            div.className = "moiveProBox";
            div.innerHTML = `
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
            `;
            moviesProducts.appendChild(div);
        });
    } catch (err) {
        console.log(err);
    }
}
moviesGet()

// Search Movie
let srcMovie = document.getElementById("srcMovie");
let inp = document.getElementById("movieNameVal");
srcMovie.addEventListener("submit", searchMovie);
async function searchMovie(e) {
    e.preventDefault();
    moviesProducts.innerHTML = ""
    await axios.get("https://65b7689c46324d531d548041.mockapi.io/products")
        .then((res) => {
            db = res.data
            let data = db.filter((item) => item.title.toLowerCase().includes(inp.value.toLowerCase()));
            if (data.length == 0) {
                moviesProducts.style.height = "35rem";
                moviesProducts.innerHTML = `<p class="mt-1 alert">The information is not defined, please try again !</p>`
            } else {
                display(data);
            }

        })
        .catch((err) => console.log(err))

}
function display(data) {
    data.forEach((item) => {
        let div = document.createElement("div");
        div.className = "moiveProBox";
        div.innerHTML = `
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
        `;
        moviesProducts.appendChild(div);
    });
}