const content = document.getElementById("content");
const tbody = document.getElementById("tbody");

async function getProducts() {
    try {
        tbody.innerHTML = '';
        const response = await axios.get("https://65b7689c46324d531d548041.mockapi.io/products");
        let data = response.data;
        const trueTrending = data.filter(item => item.trending === true);
        const falseTrending = data.filter(item => item.trending === false);
        data = [...trueTrending, ...falseTrending];
        display(data);
    } catch (error) {
        console.error("err", error);
    }
}

getProducts();

let srcMovie = document.getElementById("srcMovie");
srcMovie.addEventListener("submit", findMovie);

async function findMovie(e) {
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
    if (data.length === 0) {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.setAttribute("colspan", "6");
        td.textContent = "Data not available";
        tr.appendChild(td);
        tbody.appendChild(tr);
    } else {
        data.forEach((item) => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
                <td data-cell="ID">${item.id}</td>
                <td data-cell="Image"> 
                    <div class="img">
                        <img src="${item.image}" alt="${item.userName}">
                    </div>
                </td>
                <td data-cell="Category">${item.category}</td>
                <td data-cell="Title">${item.title}</td>
                <td data-cell="Price">${item.price} $</td>
                <td data-cell="Option">
                    <div class="trendBtn"><button class="handleBtn" onclick="trendOn(${item.id}, this)" ><i class="fa-regular fa-thumbs-up fa-rotate-180"></i></button></div>
                </td>
            `;
            if (item.trending) {
                let button = tr.querySelector('.handleBtn');
                let icon = button.querySelector('i');
                icon.classList.remove('fa-rotate-180');
                button.style.backgroundColor = 'green';
                icon.classList.add('activeTrend');
            }
            tbody.appendChild(tr);
        });
    }
}



// trendOn
function trendOn(id, button) {
    let icon = button.querySelector('i');
    let toggle = button.getAttribute('data-toggle') === 'true'; 

    if (toggle) {
        icon.classList.remove('fa-rotate-180');
        icon.classList.add("activeTrend");
        icon.parentElement.style.backgroundColor = 'green';
    } else {
        icon.classList.add('fa-rotate-180');
        icon.classList.remove("activeTrend");
        icon.parentElement.style.backgroundColor = 'red';
        icon.parentElement.style.color = 'white';
    }
    
    let data = {
        trending: toggle,
    };

    axios.put(`https://65b7689c46324d531d548041.mockapi.io/products/${id}`, data)
    button.setAttribute('data-toggle', !toggle);
}



function saveNewInfo(id) {
    let newName = document.getElementById("newName");
    let newPass = document.getElementById("newPass");
    let newImage = document.getElementById("newImg");
    let newEmail = document.getElementById("newEmail");
    let newMoney = document.getElementById("newMoney");
    let data = {
        userName: newName.value,
        password: newPass.value,
        image: newImage.value,
        email: newEmail.value,
        money: newMoney.value,
    }
    axios.put(`https://65b7689c46324d531d548041.mockapi.io/products/${id}`, data)
        .then(() => {
            getProducts();
            infoDetailClose();
        })
}
