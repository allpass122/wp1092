// TODO:
var comment_input = document.getElementById("comment-input");
var cancel_button = document.getElementById("cancel-button");
var comment_button = document.getElementById("comment-button");
var div = document.getElementsByClassName("comment");
var pdiv = document.getElementById("comment-group");
var comment_num = document.getElementById("comment-num")
var rec=""
var cnt = Number(1)

cancel_button.style.visibility="hidden"
comment_button.style.visibility="hidden" 

comment_input.oninput = handleInput;
function handleInput(e) {
    if(e.target.value.length > 0 && e.target.value.trim()!=""  ){
        comment_button.disabled = false
        comment_button.style.backgroundColor = "#065fd4"
    }
    else{
        comment_button.disabled = true
        comment_button.style.backgroundColor = "#cccccc"
    }
  }
comment_input.addEventListener('focusin', (event) => {
    cancel_button.style.visibility="visible"
    comment_button.style.visibility="visible" 
  });
/*
  comment_input.addEventListener('focusout', (event) => {
    cancel_button.style.visibility="hidden"
    comment_button.style.visibility="hidden" 
  });  
*/

comment_input.addEventListener(
    "change",
    function(t) {        
        rec = t.target.value
        t.target.value=""
        comment_button.style.backgroundColor = "#cccccc"        
    }
);
cancel_button.addEventListener(
    "click",
    function() {        
        cancel_button.style.visibility="hidden"
        comment_button.style.visibility="hidden"           
    }
);
comment_button.addEventListener(
    "click",
    function() {      
        var clone = div[0].cloneNode(true);
        clone.childNodes[3].childNodes[3].textContent = rec
        console.log(clone.childNodes[3].childNodes[3].textContent)
        pdiv.appendChild(clone);
        cnt += 1
        comment_num.textContent=`${cnt}則留言`
    }
);
