const answer = await fetch("http://localhost:5678/api/works");
const imgTtl = await answer.json();
console.log(imgTtl);

//***************Récupération - Éléments généraux******************//
const modalContainer = document.getElementById("modalContainer");
const bckgrnd = document.getElementById("bckgrnd");
const modalSB = document.querySelector(".modal");

//Modale - Supprimer photos 
const btnQuit = document.getElementById("quit");
const btnAddPh = document.querySelector(".btnAdd");
//Modale - Ajouter photos
const modalAdd = document.querySelector(".modalAdd");
const iconQuit = document.getElementById("quit2");
const iconBack = document.getElementById("back");
const btnUpload = document.getElementById("btnAdd2"); //input-file (photos)
const lblinputPh = document.querySelector(".photoAdd label"); //label-bouton réf input. 

//post
const formUpload = document.getElementById("formUpload");
const picAddPhoto = document.querySelector(".photoAdd");
const iconAddPhoto = document.querySelector(".photoAdd i");
const labelAddPhoto = document.querySelector(".photoAdd label");
const paraghAddPhoto = document.querySelector(".photoAdd p");
const btnValider = document.getElementById("valider");


//*************Galerie d'images****************/

function gallerySB(imgTtl) {
    for (let i = 0; i < imgTtl.length; i++) {
      //création éléments
        const works = imgTtl[i]
        const gallery = document.querySelector(".gallery");
        const sectionWork = document.createElement("figure");
        const imgWork = document.createElement("img");        
        imgWork.src = works.imageUrl;
        const ttlWork = document.createElement("figcaption");
        ttlWork.innerText = works.title;
      //rattachement DOM
      gallery.appendChild(sectionWork);
      sectionWork.appendChild(imgWork);
      sectionWork.appendChild(ttlWork);
    }
  }
gallerySB (imgTtl);

//******************Modale***************//

function modal(imgTtl) {
    // Elementos que se muestran en la modal
    //const gallery = document.querySelector(".gallery");
    const sbPhotos = document.querySelector(".SB-works");
        
    imgTtl.forEach((work) => {
        let sectionWork = document.createElement("figure");
        
        const imgWork = document.createElement("img");
        
        imgWork.src = work.imageUrl;
        // Configuramos el dataset para la imagen
        sectionWork.dataset.workId = work.id; //a figure le estoy agregando un dataset "work-id" que le digo que será igual al id del elemento actual.
        
        // Configuramos el dataset para el ícono
        const iconTrash = document.createElement("i");
        iconTrash.classList.add("fa-solid", "fa-trash");
        const divIcon = document.createElement("div");
        divIcon.classList.add("blackbg");
        divIcon.dataset.workId = work.id; // Para que se borren al mismo tiempo la imagen y el ícono.
        // Añadimos los elementos al DOM
        sectionWork.appendChild(imgWork);
        divIcon.appendChild(iconTrash);
        sectionWork.appendChild(divIcon);
        sbPhotos.appendChild(sectionWork);
    });
}

modal(imgTtl);

//***********************FILTRES****************************//
let catDynamik = await fetch("http://localhost:5678/api/categories");
let catDynAnsw = await catDynamik.json();
let catgTtls = catDynAnsw.map(cat => cat.name);

//création des boutons
function catgBtn(catgTtls) {
    
    catgTtls.unshift("Tous");
    for (let i = 0; i < catgTtls.length; i++) {
        const multpl = catgTtls[i];
        const btns = document.createElement("button");
        btns.classList.add("btnBeigBckg");
        btns.innerText = multpl;
        const filtersDiv = document.getElementById("filters");
        filtersDiv.appendChild(btns);
    }
}
//changement de couleurs
function filters() {
    const btnsCtg = document.querySelectorAll("button");
    const gallery = document.querySelector(".gallery");

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
//images qu'apparaissent
            const filteredImages = imgTtl.filter(function (imgTtl) {
                return index === 0 || imgTtl.category.id === index;
            });

            gallery.innerHTML = "";
            gallerySB(filteredImages);
        });
    });
}

//*********************Bouton edit************************//
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

//****************Home page - Login et Logout*********************//
function homePageAppearence() {
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
homePageAppearence();

//************* Modale - interface/layout*********************//
function openModal() {
    const btnEdit = document.querySelector(".btnEdit");

    btnEdit.addEventListener("click", () => {
        bckgrnd.classList.remove("displayOff");
    });
}
openModal();

//Modale permettant d'effacer les photos.
function ModalDel() {
    btnQuit.addEventListener("click", () => {
        bckgrnd.classList.add("displayOff");
    });
    bckgrnd.addEventListener("click", () => {
        bckgrnd.classList.add("displayOff");
    })
    modalSB.addEventListener("click", (e) => {
        e.stopPropagation();
    })
    btnAddPh.addEventListener("click", function () {
        modalSB.classList.add("displayOff");
    })

}
ModalDel();

//Retour à la première modale
function mdlMoveBack() {
    iconBack.addEventListener("click", function () {
        modalSB.classList.remove("displayOff");

    })
}
mdlMoveBack();

//Modale permettant d'ajouter des photos.
function mdlAddClose() {
    iconQuit.addEventListener("click", function () {
        bckgrnd.classList.add("displayOff");
        modalSB.classList.remove("displayOff");
    });
    bckgrnd.addEventListener("click", () => {
        bckgrnd.classList.add("displayOff");
        modalSB.classList.remove("displayOff");
    })
    modalAdd.addEventListener("click", (e) => {
        e.stopPropagation();
    })

    window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            bckgrnd.classList.add("displayOff");
            modalSB.classList.remove("displayOff");
        }
    });

}
mdlAddClose();

//Bouton - ajout des photos.
function addPhotoInput() {
    lblinputPh.addEventListener("click", function (event) {
        event.btnUpload;
    })
}
addPhotoInput();


//************************Requests API********************//
//DELETE//
const btnTrash = document.querySelectorAll(".blackbg");
for (let index = 0; index < btnTrash.length; index++) {
    const workId = btnTrash[index].dataset.workId;
    btnTrash[index].addEventListener("click", async function (event) {
        event.preventDefault()
        if (window.confirm("Êtes-vous sûr(e) de vouloir effacer cette image?")){
            const tokenLS = localStorage.getItem("token")
            localStorage.setItem("last-work-id-deleted", workId);
            const indxImgTtl = imgTtl.findIndex(item => item.id === workId); // index des éléments = workId
            imgTtl.splice(indxImgTtl, 1); //j'efface l'élément actuel du tableau.
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
        console.log(response);
        bckgrnd.classList.add("displayOff");
                                                
        if (response.ok){
            //j'efface les éléments de la modale
            const modalSB = document.querySelector(".SB-works");
            modalSB.innerHTML="";
            modal(imgTtl);
            //j'efface les éléments de la galerie 
            const gallery = document.querySelector(".gallery");
            gallery.innerHTML="";
            gallerySB(imgTtl);
                
        } else {
                alert("Une erreur est survenue. Veuillez réessayer.");
          };
        }
    });
}


//*******************POST******************************//
//Modale - ajout de photo
btnUpload.addEventListener("change", () => {
    let imgLocal = btnUpload.files[0];
    const urlPhotos = URL.createObjectURL(imgLocal);
    const img = document.createElement("img");
    img.src = urlPhotos;
    picAddPhoto.appendChild(img);
    if (picAddPhoto.appendChild(img)) {
        iconAddPhoto.classList.add("displayOff");
        labelAddPhoto.classList.add("displayOff");
        paraghAddPhoto.classList.add("displayOff");
    }
});

//
formUpload.addEventListener("submit", async function (event) {
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

    formData.append("category", catgId);
    formData.append("title", event.target.querySelector("[name=phName]").value)
    formData.append("image", event.target.querySelector("[name=file]").files[0])

    //J'efface la petite image de la photo à ajouter et j'efface le champ Titre.
    const picPh = document.querySelector(".photoAdd img");
    const phNameForm = document.getElementById("phName");
    phNameForm.value=""; 
    picPh.remove();
    
    //Je fais ré apparaître l'interface pour ajouter une photo.
    iconAddPhoto.classList.remove("displayOff");
    labelAddPhoto.classList.remove("displayOff");
    paraghAddPhoto.classList.remove("displayOff");
    
    const request = await fetch(`http://localhost:5678/api/works`, {
        method: "POST",
        body: formData,
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${tokenLS}`,
        }

    })
    bckgrnd.classList.add("displayOff");
    modalSB.classList.remove("displayOff");

    if (request.ok){
        const response = await request.json();
        imgTtl.push(response);
        const modalSB = document.querySelector(".SB-works");
        modalSB.innerHTML="";
        modal(imgTtl);
        const gallery = document.querySelector(".gallery");
        gallery.innerHTML="";
        gallerySB(imgTtl);
    }       
});