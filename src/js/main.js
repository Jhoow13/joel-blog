var searchInput = document.getElementById("txtSearch");
var modal = document.getElementById('modalPesquisa');
var list = document.getElementById('searchList');
var btn = document.querySelector(".btnSearch");
var span = document.querySelector(".close");
var header = document.querySelector(".smaller");
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

function resizeHeader(){
  if (window.pageYOffset > 332){
    header.classList.add('top0');
  }else{
    header.classList.remove('top0');
  }
}

window.addEventListener('scroll', resizeHeader)

function searchPosts(){
  modalStatus(false);
};

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