// ==========================================
// 1. HIỆU ỨNG TRÁI TIM BAY THEO CHUỘT
// ==========================================
var colours = ['#ff3366', '#ff6699', '#ff33cc', '#ff99cc', '#ff66b2', '#ff0066']; 
var minisize = 16; 
var maxisize = 28; 
var hearts = 66; 
var over_or_under = "over"; 

var x = ox = 400;
var y = oy = 300;
var swide = 800;
var shigh = 600;
var sleft = sdown = 0;
var herz = [];
var herzx = [];
var herzy = [];
var herzs = [];
var kiss = false;

if (typeof('addRVLoadEvent') != 'function') function addRVLoadEvent(funky) {
  var oldonload = window.onload;
  if (typeof(oldonload) != 'function') window.onload = funky;
  else window.onload = function() {
    if (oldonload) oldonload();
    funky();
  }
}

addRVLoadEvent(mwah);

function mwah() { if (document.getElementById) {
  var i, heart;
  for (i = 0; i < hearts; i++) {
    heart = createDiv("auto", "auto");
    heart.style.visibility = "hidden";
    heart.style.zIndex = (over_or_under == "over") ? "1001" : "0";
    heart.style.color = colours[i % colours.length];
    heart.style.pointerEvents = "none";
    heart.style.opacity = 0.75;
    heart.appendChild(document.createTextNode(String.fromCharCode(9829)));
    document.body.appendChild(heart);
    herz[i] = heart;
    herzy[i] = false;
  }
  set_scroll();
  set_width();
  herzle();
}}

function herzle() {
  var c;
  if (Math.abs(x - ox) > 1 || Math.abs(y - oy) > 1) {
    ox = x;
    oy = y;
    for (c = 0; c < hearts; c++) if (herzy[c] === false) {
      herz[c].firstChild.nodeValue = String.fromCharCode(9829);
      herz[c].style.left = (herzx[c] = x - minisize / 2) + "px";
      herz[c].style.top = (herzy[c] = y - minisize) + "px";
      herz[c].style.fontSize = minisize + "px";
      herz[c].style.fontWeight = 'normal';
      herz[c].style.visibility = 'visible';
      herzs[c] = minisize;
      break;
    }
  }
  for (c = 0; c < hearts; c++) if (herzy[c] !== false) blow_me_a_kiss(c);
  setTimeout(herzle, 40);
}

document.onmousedown = pucker;
document.onmouseup = function() { clearTimeout(kiss); };

function pucker() {
  ox = -1;
  oy = -1;
  kiss = setTimeout(pucker, 100);
}

function blow_me_a_kiss(i) {
  herzy[i] -= herzs[i] / minisize + i % 2;
  herzx[i] += (i % 5 - 2) / 5;
  if (herzy[i] < sdown - herzs[i] || herzx[i] < sleft - herzs[i] || herzx[i] > sleft + swide - herzs[i]) {
    herz[i].style.visibility = "hidden";
    herzy[i] = false;
  }
  else if (herzs[i] > minisize + 2 && Math.random() < .5 / hearts) break_my_heart(i);
  else {
    if (Math.random() < maxisize / herzy[i] && herzs[i] < maxisize) herz[i].style.fontSize = (++herzs[i]) + "px";
    herz[i].style.top = herzy[i] + "px";
    herz[i].style.left = herzx[i] + "px";
  }
}

function break_my_heart(i) {
  herz[i].firstChild.nodeValue = String.fromCharCode(9676);
  herz[i].style.fontWeight = 'bold';
  herzy[i] = false;
  setTimeout(() => herz[i].style.visibility = "hidden", 400);
}

document.onmousemove = mouse;
function mouse(e) {
  if (e) { y = e.pageY; x = e.pageX; }
  else { set_scroll(); y = event.y + sdown; x = event.x + sleft; }
}

window.onresize = set_width;
function set_width() {
  var sw_min = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  var sh_min = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  swide = sw_min;
  shigh = sh_min;
}

window.onscroll = set_scroll;
function set_scroll() {
  sdown = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  sleft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
}

function createDiv(height, width) {
  var div = document.createElement("div");
  div.style.position = "absolute";
  div.style.height = height;
  div.style.width = width;
  div.style.overflow = "hidden";
  div.style.backgroundColor = "transparent";
  return div;
}

// ==========================================
// 2. HIỆU ỨNG GÕ CHỮ & XỬ LÝ MỞ THƯ
// ==========================================
let datetxt = "28 April 2004";
let titleLetter = "To Mai Khanh";

// Phân tách lời chúc và bài thơ
const wishText = "Chúc cho chương mới trong bản hòa tấu cuộc đời của em sẽ luôn tràn ngập những nốt thăng rực rỡ. Mong em luôn giữ được niềm đam mê và kéo lên những giai điệu tuyệt vời nhất!";
const poemText = "Tháng tư gió nhẹ thoảng la đà,\nThương tiếng vĩ cầm khúc thiết tha.\nMai thắm xuân nồng vương tiếng nhạc,\nKhanh khách cười duyên trổ ngọc ngà.";

let charArrDate = datetxt.split('');
let charArrTitle = titleLetter.split('');
let currentIndex = 0;
let currentIndexTitle = 0;
let currentIndexWish = 0;
let currentIndexPoem = 0;

let date__of__birth = document.querySelector(".date__of__birth span");
let text__letter = document.querySelector(".text__letter p");

var timeDatetxt;
var intervalTitle;
var intervalWish;
var intervalPoem;

// Hiệu ứng gõ ngày sinh
setTimeout(function(){
  timeDatetxt = setInterval(function(){
    if(currentIndex < charArrDate.length){
      date__of__birth.textContent += charArrDate[currentIndex];
      currentIndex++;
    } else {
      let i = document.createElement("i");
      i.className = "fa-solid fa-star";
      document.querySelector(".date__of__birth").prepend(i);
      document.querySelector(".date__of__birth").appendChild(i.cloneNode(true));
      clearInterval(timeDatetxt);
    }
  },100)
},12000);

// Hàm gõ lời chúc
function typeWriterEffect() {
  intervalWish = setInterval(function(){
    if(currentIndexWish < wishText.length){
      text__letter.innerHTML += wishText[currentIndexWish];
      currentIndexWish++;
    } else {
      clearInterval(intervalWish);
      // Nghỉ 1 giây rồi gõ tiếp bài thơ
      setTimeout(function(){
        text__letter.innerHTML += "<br><br>"; 
        typePoem();
      }, 1000);
    }
  }, 50);
}

// Hàm gõ bài thơ
function typePoem() {
  intervalPoem = setInterval(function(){
    if(currentIndexPoem < poemText.length){
      // Xử lý xuống dòng cho bài thơ
      if (poemText[currentIndexPoem] === "\n") {
        text__letter.innerHTML += "<br>";
      } else {
        text__letter.innerHTML += poemText[currentIndexPoem];
      }
      currentIndexPoem++;
    } else {
      clearInterval(intervalPoem);
    }
  }, 70); // Gõ bài thơ chậm hơn một chút
}

$("#btn__letter").on("click", function(){

  const music = document.getElementById('birthday-music');
  if (music) music.play().catch(error => console.log("Audio play failed:", error));

  $(".box__letter").slideDown();
  setTimeout(function(){
    $(".letter__border").slideDown();
  },1000);
  setTimeout(function(){
    intervalTitle = setInterval(function(){
      if(currentIndexTitle < charArrTitle.length){
        document.querySelector(".title__letter").textContent += charArrTitle[currentIndexTitle];
        let i = document.createElement("i");
        i.className = "fa-solid fa-heart";
        document.querySelector(".title__letter").appendChild(i);
        currentIndexTitle++;
      } else {
        clearInterval(intervalTitle);
      }
    },100);
  },2000);
  setTimeout(function(){
    document.querySelector("#heart__letter").classList.add("animationOp");
    document.querySelector(".love__img").classList.add("animationOp");
    document.querySelector("#mewmew").classList.add("animationOp");
  },2800);
  setTimeout(function(){
    document.querySelectorAll(".heart").forEach((item)=>{
      item.classList.add("animation");
    })
  },3500);
  setTimeout(function(){
    // Kích hoạt chuỗi hiệu ứng gõ chữ
    typeWriterEffect();
  },6000);
});

$(".close").on("click", function(){
  clearInterval(intervalWish);
  clearInterval(intervalPoem);
  document.querySelector(".title__letter").textContent = "";
  text__letter.innerHTML = ""; // Đổi thành innerHTML để reset các thẻ <br>
  currentIndexWish = 0;
  currentIndexPoem = 0;
  currentIndexTitle = 0;
  document.querySelector("#heart__letter").classList.remove("animationOp");
  document.querySelector(".love__img").classList.remove("animationOp");
  document.querySelector("#mewmew").classList.remove("animationOp");
  document.querySelectorAll(".heart").forEach((item)=>{
    item.classList.remove("animation");
  });
  $(".box__letter").slideUp();
  $(".letter__border").slideUp();
});