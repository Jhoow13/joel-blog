var searchInput = document.querySelector("#txtSearch");
var modal = document.getElementById('modalPesquisa');
var btn = document.getElementById("btnSearch");
var span = document.querySelector(".close");
var list = document.getElementById('searchList');
var postList;

function getPostList(){
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200){
          postList = JSON.parse(xhttp.response);
      }
  };
  xhttp.open("GET", "../../search.json");
  xhttp.send();
}

searchInput.addEventListener('input', function(e){
  var listItems = "";
  var hasItems = false;

  postList.forEach(function(post){
    if(post.title.toLowerCase().indexOf(searchInput.value.toLowerCase()) > -1){
      listItems += `<li><a href="${post.url}">${post.title}</a></li>`;
      hasItems = true;
    }
  });

  if(hasItems){
    list.innerHTML = listItems;
  }else{
    list.innerHTML = `<li>Sem resultados :(</li>`
  }

  if(!searchInput.value){list.innerHTML = ""};

});

function modalStatus(isOpen){
  if(!isOpen){
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    list.style.display = "block";
    getPostList();
  }else{
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

btn.addEventListener('click',function(e){
  modalStatus(false);
});

span.addEventListener('click', function(e){
  modalStatus(true)
});

window.onclick = function(event){
  if(event.target == modal){
    modalStatus(true);
  }
}

document.addEventListener('keyup', function(e){
  if(e.keyCode == '27'){
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  };
})