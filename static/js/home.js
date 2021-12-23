// Base
const books_in_base = [
  ["1984", "George Orwell", "/static/images/1984.jpg", "psy"],
  ["Cinayət və Cəza", "Fyodor Dostoyevski", "/static/images/dostoyevski.jpg", "rom"],
  [
    "İncognito (Beyinin Gizli Həyatı)",
    "David Eagleman",
    "/static/images/incognito.jpeg",
    "sci",
  ],
  ["Səfillər", "Victor Hugo", "/static/images/sefiller.jpg", "psy"],
  [
    "A brief history of time",
    "Stephen Hawking",
    "/static/images/stephen_hawking.jpg",
    "rom",
  ],
  ["The Ego and The ID", "Sigmund Freud", "/static/images/zig_freud.jpg", "sci"],
];

let Name,
  author,
  source,
  genre,
  books_in_display = []; // bu liste ekranda gorsenen kitablarin indeksleri yigilacaq.

$("#plus").click(function addFunction() {
  if (books_in_display.length < books_in_base.length) {
    random = Math.floor(Math.random() * books_in_base.length);
    if ($.inArray(random, books_in_display) == -1) {
      // 6dan artiq kitab elave etmek olmaz ve elave olunmali kitab artiq varsa o da olmaz
      Name = books_in_base[random][0];
      author = books_in_base[random][1];
      source = books_in_base[random][2];
      genre = books_in_base[random][3];
      $("#books-container").append(
        `<div class="${genre} card col-12 book" style="width: 16rem;"><img class="card-img-top" src="${source}"><div class="card-body d-flex flex-column justify-content-between"><h5 class="card-title">${Name}</h5><p class="card-text">${author}</p><a href="#" class="btn btn-info text-white" style="width: 50%">Ətraflı</a></div></div>`
      );
      books_in_display.push(random);
      $("#bookcount").text(books_in_display.length);
    } else {
      addFunction();
    }
  }
});

$("#minus").click(function () {
  if (books_in_display.length > 0) {
    // kitab sayi 0-dan asagi duse bilmez
    $("#books-container").children().last().remove(); //sonuncu elave olunmus kitabi silir
    books_in_display.pop(random);
    $("#bookcount").text(books_in_display.length);
  }
});

// JAMBATRON ///////////////////////////////////

$("#basla_button").click(function () {
  let start = $("#calculatorcard"); // inputlarin, alertin yerlesdiyi umumi div
  if ($(this).text() == "Başla") {
    // Duymeninin icerisindeki yazini yoxlayiriq eger basla yazilibsa calculator divi show eliyirik ve duymenin icindeki yazini deyisirik
    start.css("display", "inline");
    $(this)
      .text("Bitir")
      .removeClass("btn-warning text-dark")
      .addClass("btn-danger text-white");
  } else {
    //defaulta qaytarir
    start.css("display", "none");
    $(this)
      .text("Başla")
      .removeClass("btn-danger text-white")
      .addClass("btn-warning text-dark");
    location.reload(); // refresh etmeden yeniden basla clickledikde kohne hesablama neticelerinin silinmesi ucun reload edirik amma yuxaridakilarda refresh oldugu ucun ele etmek lazimdiki butun sehife yox tekce bu div load olsun.
  }
});

$("#dailybookscountcard").click(function () {
  alert($(this).text());
});

$("#hesabla").click(function () {
  //hesabla duymesine klik etdikde
  let dayvalue1 = $("#day").val(), //gunlerin sayi input
    pagevalue1 = $("#page").val(), // kitabin sehife sayi input
    dayvalue = parseFloat($("#day").val()), //gunlerin sayi float
    pagevalue = parseFloat($("#page").val()), // kitabin sehife sayi float
    dailybookcount = Math.ceil(pagevalue / dayvalue), // 1 gune oxunmali kitab sayinin tam eded olmasi ucun kesr hisse varsa ozunden boyuk en yaxin tam edede ceviririk
    dailybookscountcard = $("#dailybookscountcard"); // Gundelik oxunmali kitab sayini gosteren alert buttonu
  if (
    !(
      dayvalue == 0 ||
      isNaN(dailybookcount) ||
      pagevalue == 0 ||
      isNaN(dayvalue1) ||
      isNaN(pagevalue1)
    )
  ) {
    // inputlarin 0-dan ferqli reqem olmasini/int olmasini/bos olmamasini yoxlayiriq
    dailybookscountcard
      .text(`Hər gün ${dailybookcount} səhifə oxumalısınız!`)
      .addClass("bg-light text-dark");
  } else {
    dailybookscountcard
      .text("Hesablamada xəta baş verdi!")
      .removeClass("bg-light")
      .addClass("bg-danger");
  }
  dailybookscountcard.css("display", "inline"); // alert butonu show olur
});

// day15

$(".psybutton").click(function () {
  // psixologiya butonuna clickledikde
  $(".book").each(function () {
    // klasi book olan butun kitablari gezsin
    $(this).hide(); // hamisini hide etsin
    $(".psy").show(); // klasi psy olanlari show etsin
  });
});

$(".rombutton").click(function () {
  $(".book").each(function () {
    $(this).hide();
    $(".rom").show();
  });
});

$(".scibutton").click(function () {
  $(".book").each(function () {
    $(this).hide();
    $(".sci").show();
  });
});

$(".allbutton").click(function () {
  $(".book").each(function () {
    $(this).show();
  });
});
