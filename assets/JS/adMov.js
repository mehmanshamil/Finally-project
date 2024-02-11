let createMovie = document.getElementById("createMovie");
let movieName = document.getElementById("movieName");
let moviePrice = document.getElementById("moviePrice");
let movieImg = document.getElementById("movieImg");
let movFragman = document.getElementById("movFragman");
let movCategory = document.getElementById("movCategory");
let language = document.getElementById("language");
let uploadTime = document.getElementById("uploadTime");
let movieDes = document.getElementById("movieDes");
let imdb = document.getElementById("imdb");
let movieduration = document.getElementById("movieduration");
let videoLink = document.getElementById("videoLink");
let create = document.getElementById("create");

createMovie.addEventListener("submit", getCreateMovie)

function getCreateMovie(e) {
    e.preventDefault();
    let data = {
        title: movieName.value,
        price: moviePrice.value,
        image: movieImg.value,
        description: movieDes.value,
        language: language.value,
        imdb: imdb.value,
        category: movCategory.value,
        duration: movieduration.value,
        videoUrl: videoLink.value,
        uploadTime: uploadTime.value,
        fragman: movFragman.value,
    }
    axios.post("https://65b7689c46324d531d548041.mockapi.io/products",data)
    .then(() =>{
        create.style.backgroundColor="green";
        setTimeout(() => {
        create.style.backgroundColor="yellow";
        }, 1000);
        movieDetails()
    })
}

let tbody = document.getElementById("tbody");

async function movieDetails() {
    tbody.innerHTML="";
    await axios.get("https://65b7689c46324d531d548041.mockapi.io/products")
        .then((res) => {
            db = res.data;
            display(db);
        })
}
movieDetails()
async function deleteMovies(id) {
    try {
        await axios.delete(`https://65b7689c46324d531d548041.mockapi.io/products/${id}`);
        movieDetails();
    } catch (error) {
        console.error("err:", error);
    }
}

// Movie change and update function

async function changeFuncInfo(id) {
    try {
        let detailInformation = document.getElementById("detailInformation")
        let movies = await axios.get(`https://65b7689c46324d531d548041.mockapi.io/products/${id}`)
        let thisMovie = movies.data;
        detailInformation.style.display = "flex"
        detailInformation.innerHTML = `
        <div class="informationMovie">
        <i id="closed" onclick="infoDetailClose()"  class="fa-solid fa-x"></i>
        <form id="movieInfo" action="#">
        <div class="contentForm">
        <div class="formBox">
            <label for="movienewName">Movie name</label>
            <input required placeholder="Movie name" id="movienewName" value="${thisMovie.title}" type="text">
            <label for="movienewPrice">Movie price</label>
            <input required id="movienewPrice" placeholder="Movie price" value="${thisMovie.price}" type="number">
            <label for="movienewImg">Movie img</label>
            <img id="imgDetailMovie" src="${thisMovie.image}" alt="image Movie">
            <input id="movienewImg" value="${thisMovie.image}" required placeholder="Movie image" type="text">
            <label for="movienewDes">Movie description</label>
            <input type="text"id="movienewDes" value="${thisMovie.description}" placeholder="Movie description">
            <label for="movnewFragman">Fragman</label>
            <input id="movnewFragman" value="${thisMovie.fragman}" type="text" placeholder="Fragman">
        </div>
        <div class="formBox">
            <label for="movnewCategory">Category</label>
            <input required id="movnewCategory" value="${thisMovie.category}" placeholder="Category name" type="text">
            <label for="newimdb">imdb</label>
            <input id="newimdb" type="text" value="${thisMovie.imdb}" required placeholder="imdb">
            <label for="newuploadTime">uploadTime</label>
            <input required type="text" value="${thisMovie.uploadTime}" id="newuploadTime" placeholder="UploadTime">
            <label for="newlanguage">Language</label>
            <input required type="text" id="newlanguage" value="${thisMovie.language}" placeholder="Language">
            <label for="newvideoLink">videoLink</label>
            <input type="text" required id="newvideoLink" value="${thisMovie.videoUrl}" placeholder="videolink">
            <label for="newmovieduration">Movie duration</label>
            <input required placeholder="Movie duration" value="${thisMovie.duration}" id="newmovieduration" type="text">
            <button onclick="saveNewInfo(${thisMovie.id})" id="create" type="submit">Update</button>
        </div>
    </div>
        </form>
    </div>
        `

    } catch (err) {
        console.log(err);
    }
}
function saveNewInfo(id) {
    let movienewName = document.getElementById("movienewName");
    let movienewPrice = document.getElementById("movienewPrice");
    let movienewImg = document.getElementById("movienewImg");
    let movnewFragman = document.getElementById("movnewFragman");
    let movnewCategory = document.getElementById("movnewCategory");
    let newimdb = document.getElementById("newimdb");
    let newuploadTime = document.getElementById("newuploadTime");
    let newlanguage = document.getElementById("newlanguage");
    let newvideoLink = document.getElementById("newvideoLink");
    let newmovieduration = document.getElementById("newmovieduration");
    let movienewDes = document.getElementById("movienewDes");
    let data = {
        title: movienewName.value,
        price: movienewPrice.value,
        image: movienewImg.value,
        description: movienewDes.value,
        language: newlanguage.value,
        imdb: newimdb.value,
        category: movnewCategory.value,
        duration: newmovieduration.value,
        videoUrl: newvideoLink.value,
        uploadTime: newuploadTime.value,
        fragman: movnewFragman.value,
    }
    axios.put(`https://65b7689c46324d531d548041.mockapi.io/products/${id}`, data)
        .then(() => {
            movieDetails();
            infoDetailClose();
        })
}
function infoDetailClose() {
    let detailInformation = document.getElementById("detailInformation");
    detailInformation.style.display = "none"
}
let getMovie = document.getElementById("srcUser");
getMovie.addEventListener("submit", movieSearch);

async function movieSearch(e) {
    e.preventDefault();
    tbody.innerHTML = "";
    let inp = document.getElementById("inp");
    try {
        const response = await axios.get("https://65b7689c46324d531d548041.mockapi.io/products");
        const db = response.data;
        let data = db.filter((item) => item.title.toLowerCase().includes(inp.value.toLowerCase()));
        display(data)
    } catch (error) {
        console.error("err:", error);
    }
}
function display(data) {
    if (data.length > 0) {
        data.forEach((item) => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
                <td  data-cell="ID">${item.id}</td>
                <td  data-cell="Image"> 
                    <div class="img">
                        <img src="${item.image}" alt="${item.userName}">
                    </div>
                </td>
                <td  data-cell="title">${item.title}</td>
                <td  data-cell="Price">${item.price} $</td>
                <td  data-cell="Option" class="option">
                    <i onclick="changeFuncInfo(${item.id})" class="fa-solid pencil fa-pencil"></i>
                    <button onclick="deleteMovies(${item.id})">
                        <i class="fa-solid fa-trash"></i> Delete
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } else {
        let tr = document.createElement("tr");
        tr.innerHTML = "<td colspan='5'>No movies found!</td>";
        tbody.appendChild(tr);
    }
}
