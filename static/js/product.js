let bookslist = document.getElementsByClassName("bkname");
let shoppingcard = document.getElementById("shopping-card");


// Sebetde default olaraq 2 eded kitab oldugu ucun onu qeyd edirik.
let badge = document.querySelector("#count");
badge.innerText = 2;

// like buttonuna click etdikde 180 derece rotate olur ve rengi deyisir:
document.querySelector("#btn-like").addEventListener("click", () => {
  let element = document.getElementById("icon-like");
  element.classList.toggle("fa-rotate-180");
  element.classList.toggle("gettingBlue");
});

// heart buttonuna click etdikde alert mesaji cixir ve rengi deyisir:
document.querySelector("#btn-heart").addEventListener("click", () => {
  let element = document.getElementById("icon-heart");
  element.classList.toggle("gettingRed");
  if (document.querySelector(".fa-heart").classList.contains("gettingRed")) {
    alert("Kitabı bəyəndiniz!");
  } else {
    alert("Bəyənməkdən imtina etdiniz!");
  }
});

// X buttonuna click etdikde movcud oldugu row-u silir ve sonda Total meblegi update edir:
function btnXRemoveRow() {
  document.querySelectorAll(".fa-times").forEach((element) => {
    element.addEventListener("click", () => {
      if (document.querySelector(".fa-times").classList.contains("incog")){
        document.getElementById("add-or-remove-basket").innerText = "Səbətə əlavə et";
        document.getElementById("add-or-remove-basket").classList.replace("btn-secondary", "btn-info");
        // Depoda qalan kitab sayini asagida gosteririk:
        depo.innerHTML = `Bu kitabdan cəmi 2 ədəd qalıb`;
        depo.classList.replace("alert-danger", "alert-warning");
        // Modal alert:
        let lmnt = document.getElementById("ModalText");
        lmnt.innerHTML = "Məhsul səbətdən çıxarıldı";
      }
      element.closest(".row").remove();
      UpdateTotal();
    });
  });
}

// Sebetdeki row-lari gezir price-lari toplayir ve Cemi:-ne innerText edir:
function UpdateTotal() {
  let prcs = document.getElementsByClassName("prc");
  let total = 0;
  for (let i = 0; i < prcs.length; i++) {
    total += parseFloat(prcs[i].innerText);
  }
  
  if (total != 0) {
    document.querySelector(".total-price").innerText = total + " " +  "AZN";
  }else{
    document.querySelector(".total-price").innerText = "Səbət boşdur";
  }
  // her defe rowlarin sayini badge-e beraber edirik, eger row yoxdursa(0) badge hide olur.
  console.log(prcs.length)
  badge.innerText = prcs.length-1;
  badge.style.display = "inline";
  if (prcs.length == 1) {
    badge.style.display = "none";
  }
}

// Sebete elave ederken kitabin adini ve qiymetini gotururuk:
let book_name = document.getElementById("incognito").innerText;
let book_price = document.getElementById("price").innerText;


// Sebete elave et butonu kliklenende sebetin ilk kitabi Incognito olmadiqda(if) / olduqda(else):
let element = document.getElementById("add-or-remove-basket");
let depo = document.getElementById("depo-alert");
element.addEventListener("click", () => {


  if(!(bookslist[0].innerText == book_name)){
    element.innerHTML = "Səbətdən çıxar";
    element.classList.replace("btn-info", "btn-secondary");
    // Depoda qalan kitab sayini asagida gosteririk:
    depo.innerHTML = `Bu kitabdan cəmi 1 ədəd qalıb`;
    depo.classList.replace("alert-warning", "alert-danger");
    // Modal alert:
    let lmnt = document.getElementById("ModalText");
    lmnt.innerHTML = "Məhsul səbətə əlavə edildi";
    // Yeni row yaradilir:
    let newrow = document.createElement("div");
    newrow.innerHTML = `<button class="btn col-2"><i class="text-danger fas fa-times incog"></i></button><span class="bkname col-5" >${book_name}</span><div class="col-5"><span class="prc">${book_price}</span> <span>&nbspAZN</span></div>`;
    newrow.classList.add("row", "mb-2", "incog");
    shoppingcard.prepend(newrow);
    btnXRemoveRow();  
    } else {
    element.innerHTML = "Səbətə əlavə et";
    element.classList.replace("btn-secondary", "btn-info");
    // Depoda qalan kitab sayini asagida gosteririk:
    depo.innerHTML = `Bu kitabdan cəmi 2 ədəd qalıb`;
    depo.classList.replace("alert-danger", "alert-warning");
    // Modal alert:
    let lmnt = document.getElementById("ModalText");
    lmnt.innerHTML = "Məhsul səbətdən çıxarıldı";
    // Yeni yaradilmis row silinir:
    shoppingcard.removeChild(shoppingcard.childNodes[0]);
  }
  // Sebete elave edildikden/silindikden sonra total price update edilir:
  btnXRemoveRow();
  UpdateTotal();
});


UpdateTotal();
btnXRemoveRow();





