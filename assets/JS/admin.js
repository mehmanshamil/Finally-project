const content = document.getElementById("content");
const tbody = document.getElementById("tbody");

async function getUsers() {
    try {
        tbody.innerHTML=''
        const response = await axios.get("https://65b7689c46324d531d548041.mockapi.io/account");
        const users = response.data;
        users.forEach((item) => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${item.id}</td>
                <td>${item.userName}</td>
                <td>${item.email}</td>
                <td>${item.money} $</td>
                <td><i class="fa-solid pencil fa-pencil"></i><button onclick="deleteUser(${item.id})" ><i class="fa-solid fa-trash"></i> Delete </button></td>
            `;
            tbody.appendChild(tr);
        });
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

        data.forEach((item) => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${item.id}</td>
                <td>${item.userName}</td>
                <td>${item.email}</td>
                <td>${item.money} $</td>
                <td><i class="fa-solid pencil fa-pencil"></i><button><i class="fa-solid fa-trash"></i> Delete </button></td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error("err:", error);
    }
}

function deleteUser(id){
    axios.delete(`https://65b7689c46324d531d548041.mockapi.io/account/${id}`)
    .then(() =>{
        getUsers()
    })
}
// dashboard
