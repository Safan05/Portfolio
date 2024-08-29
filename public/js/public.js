let xhr=new XMLHttpRequest;
xhr.open('GET',`http://localhost:3000/cookies`);
var cookies;

const promise1 = new Promise((ok, reject) => {
    xhr.onreadystatechange=()=>{
        if(xhr.readyState==4){
            if(xhr.status==200){
                cookies=JSON.parse(xhr.responseText);
            }
        }
        console.log(cookies)
        if(cookies.token)
            ok();
        else 
            reject();
    }
    xhr.send('');
  });
  
  promise1.then(() => {
    let icon= document.getElementsByClassName("work");
    icon[0].textContent="Sign Out";
    icon[0].href="/signout"
});
  promise1.catch(()=>{
    console.log("Not a user");
  })