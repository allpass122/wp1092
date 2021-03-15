var images = ['http://img.komicolle.org/2021-01/16104207309044.jpg', 
    'https://media.gq.com.tw/photos/6006d2a5c54d82ce5fd0decc/master/pass/161078750567926_P11213288.jfif.jpg',
    'https://i.beauty321.com/816x/https://il.beauty321.com/gallery/gallery/38236/photo-6007c8094a14d.jpg',
    'http://img.komicolle.org/2021-01/16104207328792.jpg',
    'https://pbs.twimg.com/media/ErnI00mU0AEz-md.jpg'];
var index = 0;
var imd=document.getElementById("display");
var pre=document.getElementById("previous");
var nxt=document.getElementById("next");
var sc_a=document.getElementsByTagName("a")[0];
var sc_s=document.getElementsByTagName("span")[0];

var backg = function(){
    imd.style.backgroundImage = "url(images/loading.gif)";
    imd.style.backgroundRepeat = "no-repeat";
    imd.style.backgroundSize = "35%"
    imd.style.backgroundPosition = "center";
    imd.src="";
}
backg();

sc_s.innerHTML="Source: "
sc_a.setAttribute("id", "source");

var setsrc = function(){
    sc_a.href=images[index];
    sc_a.innerHTML=images[index];
}

var changeclass = function(){
    if(index==0){
        pre.className = "disabled";
    }else pre.className = "image-viewer__button";
    
    if(index==4){
        nxt.className = "disabled";
    }else nxt.className = "image-viewer__button";
}

setsrc();
changeclass();
imd.src=images[index];

pre.addEventListener(
    "click",
    function(){
        if(index!=0){
            imd.src="";
            index--;
            setTimeout(
                function(){
                    imd.src=images[index];
                }, 200);
        }
        setsrc();
        changeclass();
    }
)
nxt.addEventListener(
    "click",
    function(){
        if(index!=4){
            imd.src="";
            index++;
            setTimeout(
                function(){
                    imd.src=images[index];
                }, 200);
        }
        setsrc();
        changeclass();
    }
);
