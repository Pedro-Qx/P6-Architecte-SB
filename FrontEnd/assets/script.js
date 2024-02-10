const reqstWorks = await fetch("http://localhost:5678/api/works");
const worksApi = await reqstWorks.json();

//***************Éléments généraux******************//
const modalContainer = document.getElementById("modalContainer");
//gallerie
const gallery = document.querySelector(".gallery");
const bckgrnd = document.getElementById("bckgrnd");
//Modale A
const modalA = document.querySelector(".modal"); //div modal
const modalSB = document.querySelector(".SB-works"); //div image container
    // Boutons
    const btnQuit = document.getElementById("quit"); //fermer la modale
    const btnAddPh = document.querySelector(".btnAdd"); //Ajouter une photo.

//Modale B  
const modalB = document.querySelector(".modalAdd");

    //Boutons
    const iconQuit = document.getElementById("quit2"); //fermer
    const iconBack = document.getElementById("back"); //revenir en arrière
    const btnAjoutPh = document.getElementById("btnAdd2"); //input > ceci ouvre le menu pour choisir un fichier.

    //formulaire
    const formUpload = document.getElementById("formUpload");
        //div container
        const containerAddPh = document.querySelector(".photoAdd");
            const iconAddPhoto = document.querySelector(".photoAdd i"); //icone photo
            const lablBtnAjoutPh = document.querySelector(".photoAdd label"); //+Ajouter photo
            const paraghAddPhoto = document.querySelector(".photoAdd p");// format photo
            //Photo temoin
            const picPh = document.querySelector(".photoAdd img");
            //champ titre photo 
            const phNameForm = document.getElementById("phName");
    //bouton submit.
    const btnValider = document.getElementById("valider");

//****************Gallerie traveaux Sophie B**************//
function gallerySB(worksApi) {
    for (let i = 0; i < worksApi.length; i++) {
      //création éléments
        const works = worksApi[i]
        const figureGal = document.createElement("figure");
        const imgWorkGal = document.createElement("img");        
        imgWorkGal.src = works.imageUrl;
        const ttlWorkGal = document.createElement("figcaption");
        ttlWorkGal.innerText = works.title;
      //rattachement DOM
      gallery.appendChild(figureGal);
      figureGal.appendChild(imgWorkGal);
      figureGal.appendChild(ttlWorkGal);
    }
  }
gallerySB (worksApi);


//***********************FILTRES****************************//
const catDynamik = await fetch("http://localhost:5678/api/categories");
const catDynAnsw = await catDynamik.json();
const catgTtls = catDynAnsw.map(cat => cat.name);

//création des boutons
function catgBtn(catgTtls) {
    
    catgTtls.unshift("Tous");
    for (let i = 0; i < catgTtls.length; i++) {
        const indexCatgTtls = catgTtls[i];
        const btnFilters = document.createElement("button");
        btnFilters.classList.add("btnBeigBckg");
        btnFilters.innerText = indexCatgTtls;
        const divFilters = document.getElementById("filters");
        divFilters.appendChild(btnFilters);
    }
}
//changement de couleurs
function filters() {
    const btnsCtg = document.querySelectorAll("button");
    
    btnsCtg.forEach((btn, index) => {
        btn.addEventListener("click", function () {
            btnsCtg.forEach(b => b.classList.remove("btnGreenBckg", "btnBeigBckg"));
            btnsCtg.forEach((b, i) => {
                if (i !== index) {
                    b.classList.add("btnBeigBckg");
                } else {
                    b.classList.add("btnGreenBckg");
                }
            });
//images qui s'affichent
            const filteredImages = worksApi.filter(function (worksApi) {
                return index === 0 || worksApi.category.id === index;
            });

            gallery.innerHTML = "";
            gallerySB(filteredImages);
        });
    });
}


//*********************LAYOUT Page d'accueil************************//
//Création Bouton edit
function btnEditHp() {
    const linkEdit = document.createElement("a");
    linkEdit.classList.add("js-modal")
    linkEdit.href = "#modal";
    const iconEdit = document.createElement("i");
    iconEdit.classList.add("fa-regular");
    iconEdit.classList.add("fa-pen-to-square");
    const btnEdit = document.createElement("p");
    btnEdit.classList.add("btnEdit");
    btnEdit.innerText = "modifier";
    linkEdit.appendChild(iconEdit);
    linkEdit.appendChild(btnEdit);
    //DOM
    const ttlEdit = document.querySelector(".ttlEdit");
    ttlEdit.appendChild(linkEdit);
}

//****************Home page - Layout > Login et Logout*********************//
function homePageLayout() {
    const logIn = document.getElementById("logIn");
    const userConnected = localStorage.getItem("token");
    if (userConnected) {
        logIn.innerHTML = "logout";
        logIn.setAttribute("id", "logOut")
        btnEditHp();

    } else {
        catgBtn(catgTtls);
        filters();
    }
    const logOut = document.getElementById("logOut");
    logOut.addEventListener("click", () => {
        const confirmBox = confirm("Êtes-vous sûr(e) de vouloir vous déconnecter?")
        if (confirmBox) {
            localStorage.removeItem("token");
            window.location.href = "http://127.0.0.1:5500/index.html";
            logOut.innerHTML = "login";
            logOut.setAttribute("id", "logIn")
        }
    });
}
homePageLayout();

//******************************MODALES*************************//
//Éléments de la modale//
function mdlElements(worksApi) {
       
    const sbPhotos = document.querySelector(".SB-works");
        
    worksApi.forEach((work) => {
        let figureMdl = document.createElement("figure");
        
        const imgWorkMdl = document.createElement("img");
        
        imgWorkMdl.src = work.imageUrl;
        // Configuration dataset figure image
        figureMdl.dataset.workId = work.id;
        
        // Configuration dataset icône
        const iconTrash = document.createElement("i");
        iconTrash.classList.add("fa-solid", "fa-trash");
        const divIcon = document.createElement("div");
        divIcon.classList.add("blackbg");
        divIcon.dataset.workId = work.id; 
        // Ajout d'éléments au DOM
        figureMdl.appendChild(imgWorkMdl);
        divIcon.appendChild(iconTrash);
        figureMdl.appendChild(divIcon);
        sbPhotos.appendChild(figureMdl);
    });
}

mdlElements(worksApi);

//************* Modale A*********************//
//Ouvrir modale A
function openAModal() {
    const btnEdit = document.querySelector(".btnEdit");

    btnEdit.addEventListener("click", (e) => {
        console.log("modal A")
        e.preventDefault;
        bckgrnd.classList.remove("displayOff");
        delWorks();
        
    });
}
openAModal();

//Fermer modal A
function closeAModal() {
    btnQuit.addEventListener("click", () => {
        bckgrnd.classList.add("displayOff");
    });
    bckgrnd.addEventListener("click", () => {
        bckgrnd.classList.add("displayOff");
    });
    modalA.addEventListener("click", (e) => {
        e.stopPropagation();
    });
    btnAddPh.addEventListener("click", function () {
        modalA.classList.add("displayOff");
        });
}
closeAModal();

//************************** MODAL B *********************//

//créer une petite image sur la modal B
function newPicMdl () {
    btnAjoutPh.addEventListener("change", () => {
        let imgLocal = btnAjoutPh.files[0];
        console.log(imgLocal);
        const urlPhotos = URL.createObjectURL(imgLocal);
        const img = document.createElement("img");
        img.src = urlPhotos;
        containerAddPh.appendChild(img);
        if (containerAddPh.appendChild(img)) {
            iconAddPhoto.classList.add("displayOff");
            lablBtnAjoutPh.classList.add("displayOff");
            paraghAddPhoto.classList.add("displayOff");
            }
        });
    }
newPicMdl();

//retablir le layaout de la modale B
function clearBModal (){
    const picBModal = document.querySelector(".photoAdd img");
    if (picBModal){
    picBModal.remove();
    iconAddPhoto.classList.remove("displayOff");
    lablBtnAjoutPh.classList.remove("displayOff");
    paraghAddPhoto.classList.remove("displayOff");
    }
    phNameForm.value="";
}

//Ouvrir modal B
function openBModal (){
    const btnMdlAjout = btnAddPh.addEventListener("click", ()=>{
        console.log("Modal B");
        clearBModal();

    })
}
openBModal();

AddWork();


//Retour à la modale A
function backToAMdl() {
    iconBack.addEventListener("click", function () {
        modalA.classList.remove("displayOff");
    });
}
backToAMdl();


//Fermer modal B
function closeBModal() {
    //ceci ferme la modale quand j'appuie sur l'icon x
    iconQuit.addEventListener("click", function () {
        bckgrnd.classList.add("displayOff");
        modalA.classList.remove("displayOff");
    });

    //ceci ferme la modale quand j'appuie sur le BG
    bckgrnd.addEventListener("click", () => {
        bckgrnd.classList.add("displayOff");
        modalA.classList.remove("displayOff");
   })
    //ceci evite que la modale se ferme quand j'appuie ailleurs que dans l'icone et le BG
    modalB.addEventListener("click", (e) => {
        e.stopPropagation();
    })
    //ceci ferme la modale quand j'appuie sur Esc.
    window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            bckgrnd.classList.add("displayOff");
            modalA.classList.remove("displayOff");
        }
    });

}
closeBModal();

//********************************* Requêtes API **************************//
//DELETE
function delWorks() {
    const btnTrash = document.querySelectorAll(".blackbg");
    btnTrash.forEach((btn)=> btn.addEventListener("click", async function (e){
        e.preventDefault();
        const workId = btn.dataset.workId;
    
        if (window.confirm("Êtes-vous sûr(e) de vouloir effacer cette image?")){
            const tokenLS = localStorage.getItem("token")
            localStorage.setItem("last-work-id-deleted", workId);
            const indxImgTtl = worksApi.findIndex(item => item.id == workId); // index des éléments = workId
            worksApi.splice(indxImgTtl, 1); //j'efface l'élément actuel du tableau.
            let request = new Request(`http://localhost:5678/api/works/${workId}`);
            let option = {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${tokenLS}`,
                    "Content-Type": "application/json",
                    "id": localStorage.getItem("last-work-id-deleted")
                }
            };
        let response = await fetch(request, option);
        bckgrnd.classList.add("displayOff");
                                                
        if (response.ok){
            //j'efface les éléments de la modale
            modalSB.innerHTML="";
            mdlElements(worksApi);
            //j'efface les éléments de la galerie 
            gallery.innerHTML="";
            gallerySB(worksApi);
                
        } else {
                alert("Une erreur est survenue. Veuillez réessayer.");
          };
        }
    }));
}

//POST
function AddWork() {
    formUpload.addEventListener("submit", async function (event) {
        console.log("addWork");
        event.preventDefault();
        const tokenLS = localStorage.getItem("token");
        const formData = new FormData();
        const catgVal = event.target.querySelector("[name=category]").value;
        let catgId = "";
        if (catgVal === "Objets") {
            catgId = "1";
        }
        else if (catgVal === "Appartements") {
            catgId = "2";
        } else if (catgVal === "Hotels & Restaurants") {
            catgId = "3";
        }
        let nameVal = event.target.querySelector("[name=phName]").value;

        formData.append("title", nameVal);
        formData.append("category", catgId);
        formData.append("image", event.target.querySelector("[name=file]").files[0])


        const request = await fetch(`http://localhost:5678/api/works`, {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${tokenLS}`,
            }

        })

        if (request.ok) {
            bckgrnd.classList.add("displayOff");
            modalA.classList.remove("displayOff");  
            const response = await request.json();
            worksApi.push(response);
            modalSB.innerHTML = "";
            mdlElements(worksApi);
            gallery.innerHTML = "";
            gallerySB(worksApi);
        }else if (request.status === 400){
            alert("Veillez donner un titre à l'image");       
            
        }else {
            console.error("Error:", request.status);
        }
        
    });
}