let displayData = document.getElementById("display");
const tbody = document.getElementById("tbody");

async function getProducts() {
    tbody.innerHTML = ''
    await axios.get("https://6589aaa6324d4171525951a6.mockapi.io/user/MovieCategory")
        .then((res) => {
            db = res.data;
            db.filter((item) => {
                let tr = document.createElement("tr");
                tr.innerHTML = `
                <td  data-cell="ID">${item.id}</td>
                <td  data-cell="Image"> 
                <div class="img">
                <img src="${item.image}" alt="${item.userName}">
                </div>
                </td>
                <td  data-cell="Content">${item.content}</td>
                <td  data-cell="Icon">${item.icon}</td>
                <td  data-cell="Option" class="option"><i <i onclick="changeFuncInfo(${item.id})" class="fa-solid pencil fa-pencil"></i><button onclick="deleteCategory(${item.id})" ><i class="fa-solid fa-trash"></i> Delete </button></td>
                `;
                tbody.appendChild(tr);
            })
        })
        .catch((err) => console.log(err))
}
getProducts()

async function deleteCategory(id) {
    try {
        await axios.delete(`https://6589aaa6324d4171525951a6.mockapi.io/user/MovieCategory/${id}`);
        getProducts();
    } catch (error) {
        console.error("err:", error);
    }
}

async function changeFuncInfo(id) {
    try {
        let detailInformation = document.getElementById("detailInformation")
        let person = await axios.get(`https://6589aaa6324d4171525951a6.mockapi.io/user/MovieCategory/${id}`)
        let thisCategory = person.data;
        detailInformation.style.display = "flex"
        detailInformation.innerHTML = `
        <div class="information">
        <i id="closed" onclick="infoDetailClose()"  class="fa-solid fa-x"></i>
        <form id="changePersonInfo" action="#">
            <label for="newContent">Content :</label>
            <input id="newContent" type="text" value="${thisCategory.content}">
            <label for="newIcon">Icon :</label>
            <img class="imgMovie" src="${thisCategory.icon}" alt="userProfile">
            <input id="newIcon" type="text" value="${thisCategory.icon}">
            <label for="username">image :</label>
            <img class="imgMovie" src="${thisCategory.image}" alt="userProfile">
            <input id="newImg" type="text" value="${thisCategory.image}">
            <button  onclick="saveNewInfo(${thisCategory.id})">Save</button>
        </form>
    </div>
        `

    } catch (err) {
        console.log(err);
    }
}
function saveNewInfo(id) {
    let newContent = document.getElementById("newContent");
    let newIcon = document.getElementById("newIcon");
    let newImage = document.getElementById("newImage");
    let data = {
        content: newContent.value,
        icon: newIcon.value,
        image: newImage.value,
    }
    axios.put(`https://6589aaa6324d4171525951a6.mockapi.io/user/MovieCategory/${id}`, data)
        .then(() => {
            getProducts();
            infoDetailClose();
        })
}
function infoDetailClose() {
    let detailInformation = document.getElementById("detailInformation");
    detailInformation.style.display = "none"
}

// create Category
let getCategory = document.getElementById("getCategory");
getCategory.addEventListener("submit", categoryCreate)

function categoryCreate(e) {
    e.preventDefault();
    let newpostContent = document.getElementById("newpostContent");
    let newIcoNs = document.getElementById("newIcoNs");
    let newPostimage = document.getElementById("newPostimage");
    let data = {
        content: newpostContent.value,
        icon: newIcoNs.value,
        image: newPostimage.value,
    }
    axios.post(`https://6589aaa6324d4171525951a6.mockapi.io/user/MovieCategory`, data)
        .then(() => {
            getProducts();
            infoDetailClose();
            getCategory.reset();
        })
}