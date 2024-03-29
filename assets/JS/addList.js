let addSaveList = document.getElementById("addSaveList");

function getAddList() {
    addSaveList.innerHTML = ""
    let list = JSON.parse(localStorage.getItem("list")) || [];
    list.forEach((item, index) => {
        let div = document.createElement("div");
        div.className = "addBox";
        div.innerHTML = `
        <img src="${item.image}" alt="movie photo">
        <div class="content">
            <div class="text">
                <p onclick="getMovieApply(${item.id})" class="getMovie">${item.title}</p>
                <p>${item.description}</p>
                <p>Price : ${item.price} $</p>
                <p><i class="fa-regular fa-clock"></i> ${item.duration}</p>
            </div>
            <div class="option">
                <i onclick="removeSaveAdd(${index})" class="fa-solid removeAdd fa-x"></i>
                <i onclick="getMovieApply(${item.id})" class="fa-solid plays fa-play"></i>
            </div>
        </div>
        `
        addSaveList.appendChild(div);
    })
}
getAddList()
function removeSaveAdd(index) {
    let list = JSON.parse(localStorage.getItem("list")) || [];
    list.splice(index, 1);
    localStorage.setItem("list", JSON.stringify(list));
    getAddList()
}
// get Movie Product

function getMovieApply(movieid) {
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
        window.location.href = `../../assets/Page/searchMovie.html?userId=${userid}`
    } else {
        window.location.href = `../../assets/Page/searchMovie.html`
    }
}