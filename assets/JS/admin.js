const content = document.getElementById("content");
const tbody = document.getElementById("tbody");

async function getUsers() {
    try {
        tbody.innerHTML = ''
        const response = await axios.get("https://65b7689c46324d531d548041.mockapi.io/account");
        const data = response.data;
        display(data)
    } catch (error) {
        console.error("err", error);
    }
}

getUsers();

let srcUser = document.getElementById("srcUser");
srcUser.addEventListener("submit", findUsers);

async function findUsers(e) {
    e.preventDefault();
    tbody.innerHTML = "";
    let inp = document.getElementById("inp");
    try {
        const response = await axios.get("https://65b7689c46324d531d548041.mockapi.io/account");
        const db = response.data;

        let data = db.filter((item) => item.userName.toLowerCase().includes(inp.value.toLowerCase()));
        display(data)
    } catch (error) {
        console.error("err:", error);
    }
}
function display(data){
    data.forEach((item) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.id}</td>
            <td> 
            <div class="img">
            <img src="${item.image}" alt="${item.userName}">
            </div>
            </td>
            <td>${item.userName}</td>
            <td>${item.email}</td>
            <td>${item.money} $</td>
            <td><i <i onclick="changeFuncInfo(${item.id})" class="fa-solid pencil fa-pencil"></i><button onclick="deleteAndUpdateUser(${item.id})" ><i class="fa-solid fa-trash"></i> Delete </button></td>
        `;
        tbody.appendChild(tr);
    });
} 

async function deleteAndUpdateUser(id) {
    try {
        await axios.delete(`https://65b7689c46324d531d548041.mockapi.io/account/${id}`);
        getUsers();
    } catch (error) {
        console.error("err:", error);
    }
}
// dashboard

async function changeFuncInfo(id) {
    try {
        let detailInformation = document.getElementById("detailInformation")
        let person = await axios.get(`https://65b7689c46324d531d548041.mockapi.io/account/${id}`)
        let thisPerson = person.data;
        if(thisPerson.image == undefined){
            thisPerson.image="https://www.shutterstock.com/image-vector/default-profile-picture-avatar-photo-600nw-1681253560.jpg"
        }
        detailInformation.style.display = "flex"
        detailInformation.innerHTML = `
        <div class="information">
        <i id="closed" onclick="infoDetailClose()"  class="fa-solid fa-x"></i>
        <form id="changePersonInfo" action="#">
            <label for="name">Username :</label>
            <input id="newName" type="text" value="${thisPerson.userName}">
            <label for="username">Password :</label>
            <input id="newPass" type="text" value="${thisPerson.password}">
            <label for="username">image :</label>
            <img class="imgProfile" src="${thisPerson.image}" alt="userProfile">
            <input id="newImg" type="text" value="${thisPerson.image}">
            <label for="email">Email :</label>
            <input id="newEmail" type="email" value="${thisPerson.email}">
            <label for="price">Money :</label>
            <input id="newMoney" type="text" value="${thisPerson.money}">
            <button  onclick="saveNewInfo(${thisPerson.id})"><i  class="fa-solid mx-2 fa-person-circle-check"></i>Save</button>
        </form>
    </div>
        `

    } catch (err) {
        console.log(err);
    }
}
function saveNewInfo(id){
    let newName = document.getElementById("newName");
    let newPass = document.getElementById("newPass");
    let newImage = document.getElementById("newImg");
    let newEmail = document.getElementById("newEmail");
    let newMoney = document.getElementById("newMoney");
    let data ={
        userName:newName.value,
        password:newPass.value,
        image:newImage.value,
        email:newEmail.value,
        money:newMoney.value,
    }
    axios.put(`https://65b7689c46324d531d548041.mockapi.io/account/${id}`,data)
    .then(() =>{
        getUsers();
        infoDetailClose();
    })
}

function infoDetailClose() {
    let detailInformation = document.getElementById("detailInformation");
    detailInformation.style.display = "none"
}