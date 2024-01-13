const formLogin = document.querySelector("form");

function loginSend () {
    formLogin.addEventListener("submit", async function (event){
    event.preventDefault();
    //valeurs des champs email et pass
    const dataLogin = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value,
    };
            
       const dataSendApi = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"content-Type": "application/json"},
        body: JSON.stringify(dataLogin)
    });
    const answr = await dataSendApi.json();
   
   if (answr.token){
    localStorage.setItem("token", answr.token);
    window.location.href = "../index.html";
                
    }else if (answr.message === 'user not found'){
        alert("Veuillez vous enregistrer");
    }else if (answr.error){
        alert("Utilisateur ou mot de pass incorrect");
    }
    });
}
loginSend ();



