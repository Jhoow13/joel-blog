function myFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
      } else {
          li[i].style.display = "none";

      }
  }
}

function getPostList(){
  var searchInput = document.querySelector("#txtSearch").value;
  var list = document.getElementById('searchList');
  list.style.display = 'block';
  var xhttp = new XMLHttpRequest();

  function notFound(){
    console.log('Sem resultados');
  }

  xhttp.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200){
          var postList = JSON.parse(xhttp.response);

          // for(i = 0; i < postList.length; i++){
          //   if(postList[i].title.toLowerCase().indexOf(searchInput) > -1){
          //     console.log(postList[i]);
          //   }else{
          //     console.log(postList[i].title.toLowerCase().indexOf(searchInput));
          //     console.log("sem resultados");
          //   }
          // }

          postList.forEach(function(post){
          if(post.title.toLowerCase().indexOf(searchInput) > -1){
              list.innerHTML =
              `<li>${post.title}</li>`
              return
            }else{
              `<li>Sem resultados :(</li>`
            }
          });
      }
  };
  xhttp.open("GET", "../../search.json");
  xhttp.send();
}

var modal = document.getElementById('myModal');
var btn = document.getElementById("btnSearch");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

span.onclick = function() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";

}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}