let sign=document.getElementById("signup")
sign.addEventListener("click",()=>{
    sign.classList.add("clicked");
    setTimeout(()=>{
        sign.classList.remove("clicked");
    },250)
})