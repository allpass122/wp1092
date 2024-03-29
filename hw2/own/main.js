var source = document.getElementById("source");
var backBtn = document.getElementById("backBtn");
var nextBtn = document.getElementById("nextBtn");
var img = document.getElementById("display");
var imgName = document.getElementById("imgName");

var playlist = [
    {
        name:"Luffy",
        url:"https://ami.animecharactersdatabase.com/uploads/chars/thumbs/200/11076-782139445.jpg"
    },
    {
        name:"Nami",
        url:"https://ami.animecharactersdatabase.com/uploads/chars/thumbs/200/9180-484083125.jpg"
    },
    {
        name:"Zoro",
        url:"https://ami.animecharactersdatabase.com/uploads/chars/thumbs/200/5457-1977266515.jpg"
    }
];
playlist.num=1;

backBtn.addEventListener(
    "click",
    function() {
        playlist.num -= 1;
        nextBtn.disabled = false;
        nextBtn.className="image-viewer__button";
        img.src=playlist[playlist.num].url;
        source.textContent=playlist[playlist.num].url || "Unknow Error";
        imgName.textContent=playlist[playlist.num].name || "Unknow Error";
        if(playlist.num === 0){
            backBtn.disabled = true;
            backBtn.className="disabled";
        }
    }
);
nextBtn.addEventListener(
    "click",
    function() {
        playlist.num += 1;
        backBtn.disabled = false;
        backBtn.className="image-viewer__button";
        img.src=playlist[playlist.num].url;
        source.textContent=playlist[playlist.num].url || "Unknow Error";
        imgName.textContent=playlist[playlist.num].name || "Unknow Error";
        if(playlist.num === playlist.length-1){
            nextBtn.disabled = true;
            nextBtn.className="disabled";
        }
    }
);