const answer = await fetch("http://localhost:5678/api/works");
const imgTtl = await answer.json();


//Récupération - Éléments généraux
const modalContainer = document.getElementById("modalContainer");
const bckgrnd =document.getElementById("bckgrnd");
const modalSB = document.querySelector(".modal");

    //Modal - Supprimer photos 
const btnQuit = document.getElementById("quit");
const btnAddPh = document.querySelector(".btnAdd");
    //Modal - Ajouter photos
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

//Récuperation des images dynamiquement.
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

        //modal
        const arrayImages = [works.imageUrl];
        const sbPhotos = document.querySelector(".SB-works");

        arrayImages.forEach(element => {
            const iconTrash = document.createElement("i");
            iconTrash.classList.add("fa-solid", "fa-trash");
            const divIcon = document.createElement("div");
            divIcon.classList.add("blackbg");
            let workId = "";
            divIcon.dataset.workId = works.id//!!
            sectionWork.appendChild(divIcon);

            divIcon.appendChild(iconTrash);
        });

        let sectionWorkClon = sectionWork.cloneNode(true);
        sectionWorkClon.classList.add("clone");
        sectionWorkClon.dataset.workId = works.id;
        sbPhotos.appendChild(sectionWorkClon);
        sectionWorkClon.querySelector("figcaption").innerText = works.title;
        //pour éviter que les titres s'affiche dans la modal.
        if (document.querySelector(".SB-works")) {
            sectionWorkClon.querySelector("figcaption").remove();
        }
    }
}
gallerySB(imgTtl);


//***********************FILTRES****************************//
let catgTtls = ["Tous", "Objets", "Appartements", "Hôtels&Restaurants"];
//création des boutons
function catgBtn(catgTtls) {
    for (let i = 0; i < catgTtls.length; i++) {
        const multpl = catgTtls[i];
        const btns = document.createElement("button");
        btns.innerText = multpl;
        const filtersDiv = document.getElementById("filters");
        filtersDiv.appendChild(btns);
    }
}

function filters() {
    const btnsCtg = document.querySelectorAll("button");
    const gallery = document.querySelector(".gallery");

    btnsCtg[0].addEventListener("click", function () {
        const tousCatg = imgTtl.filter(function (imgTtl) {
            return imgTtl.id < imgTtl.length;
        })
        gallery.innerHTML = "";
        gallerySB(imgTtl);
    });

    btnsCtg[1].addEventListener("click", function () {
        const objCatg = imgTtl.filter(function (imgTtl) {
            return imgTtl.category.id === 1;
        });
        gallery.innerHTML = "";
        gallerySB(objCatg);
    });

    btnsCtg[2].addEventListener("click", function () {
        const appartCatg = imgTtl.filter(function (imgTtl) {
            return imgTtl.category.id === 2;
        });

        gallery.innerHTML = "";
        gallerySB(appartCatg);
    });

    btnsCtg[3].addEventListener("click", function () {
        const HtlCatg = imgTtl.filter(function (imgTtl) {
            return imgTtl.category.id === 3;
        });
        gallery.innerHTML = "";
        gallerySB(HtlCatg);
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
        logIn.innerHTML="logout";
        logIn.setAttribute("id", "logOut")
        btnEditHp();
                
    } else {
        catgBtn(catgTtls);
        filters();
    }
    const logOut =document.getElementById("logOut");
        logOut.addEventListener("click", () => {
        const confirmBox = confirm("Êtes-vous sûr(e) de vouloir vous déconnecter?")
        if(confirmBox){
        localStorage.removeItem("token");
        window.location.href="http://127.0.0.1:5500/FrontEnd/index.html";
        logOut.innerHTML="login";
        logOut.setAttribute("id", "logIn")
        }
    });
    
}
homePageAppearence();

//************* Modal - interface/layout*********************//
function openModal() {
    const btnEdit = document.querySelector(".btnEdit");
       
    btnEdit.addEventListener("click", () => {
        bckgrnd.classList.remove("displayOff");
    });
}
openModal();

//Modal permettant d'effacer les photos.
function ModalDel() {
    btnQuit.addEventListener("click", () => {
        bckgrnd.classList.add("displayOff");
    });
    bckgrnd.addEventListener("click", () =>{
        bckgrnd.classList.add("displayOff");
    })
    modalSB.addEventListener("click", (e) =>{
        e.stopPropagation();
    })
    btnAddPh.addEventListener("click", function () {
        modalSB.classList.add("displayOff");
    })
    
}
ModalDel();

//Retour à la première modal
function mdlMoveBack() {
    iconBack.addEventListener("click", function () {
        modalSB.classList.remove("displayOff");

    })
}
mdlMoveBack();

//Modal permettant d'ajouter des photos.
function mdlAddClose(){
    iconQuit.addEventListener("click", function () {
        bckgrnd.classList.add("displayOff");
        modalSB.classList.remove("displayOff");
    });
    bckgrnd.addEventListener("click", () =>{
        bckgrnd.classList.add("displayOff");
        modalSB.classList.remove("displayOff");
    })
    modalAdd.addEventListener("click", (e) =>{
        e.stopPropagation();
    })

    window.addEventListener('keydown', function(e){
    if(e.key === 'Escape' || e.key === 'Esc'){
        bckgrnd.classList.add("displayOff");
        modalSB.classList.remove("displayOff");
        }
    });

}
mdlAddClose();

//Bouton - ajout des photos.
function addPhotoInput(){
    lblinputPh.addEventListener("click", function(event) {
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
        event.preventDefault();
        try {
            const tokenLS = localStorage.getItem("token");
            localStorage.setItem("last-work-id-deleted", workId);
            let request = new Request(`http://localhost:5678/api/works/${workId}`);
            let option = {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${tokenLS}`,
                    "Content-Type": "application/json",
                    "id": localStorage.getItem("last-work-id-deleted")
                }
            }
                               
            let response = await fetch(request, option);
            if (response.ok);
                alert("Êtes-vous sûr(e) de vouloir effacer cette image?");
            }
            catch {
            alert("Une erreur innatendue vient de se produire");
        }
    });
};

//POST//
btnUpload.addEventListener("change", () => {
    let imgLocal = btnUpload.files[0];
    const urlPhotos = URL.createObjectURL(imgLocal);
    const img = document.createElement("img");
    img.src = urlPhotos;
    picAddPhoto.appendChild(img);
    if (picAddPhoto.appendChild(img)){
        iconAddPhoto.classList.add("displayOff");
        labelAddPhoto.classList.add("displayOff");
        paraghAddPhoto.classList.add("displayOff");
    }
});


formUpload.addEventListener("submit", async function (event) {
    event.preventDefault();
    const tokenLS = localStorage.getItem("token");
    const formData = new FormData();
    const catgVal = event.target.querySelector("[name=category]").value;
    let catgId="";
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
    
    
    const request = await fetch(`http://localhost:5678/api/works`, {
        method: "POST",
        body: formData,
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${tokenLS}`,
        }
    })
        .then(function (response) {
            return response.blob();
            
        })
        .then(function (blob) {
            const galSectWork = document.querySelector(".gallery figure");
            const urlObj = URL.createObjectURL(blob);
            const img = document.createElement("img");
            img.src = urlObj;
            galSectWork.appendChild(img);
        })
        .catch(function (error) {
            console.log(error);
        });
});