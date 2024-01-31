 const header = document.querySelector("header");

document.addEventListener("scroll",() =>{
    const scroolY = window.scrollY;
    if(scroolY > 200){
        header.classList.add("headerFix")
    }else{
        header.classList.remove("headerFix")
    }
})
function wishLengthFunc(){
    let wish = JSON.parse(localStorage.getItem("wish")) || [];
    wishLength.innerHTML=wish.length
}
wishLengthFunc()