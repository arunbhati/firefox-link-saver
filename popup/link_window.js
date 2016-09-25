
document.addEventListener("click", function(e) {
  if (!e.target.classList.contains("page-choice")) {
    return;
  }

  //console.log(window.content.location.href);

  var chosenPage = "https://" + e.target.textContent;
  chrome.tabs.create({
    url: chosenPage
  });

});

document.addEventListener("DOMContentLoaded", function(event) {



  console.log("Html loading starts..");

  console.log("Calling storage to get values..");

  if (typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
    var idList = localStorage.getItem("linkSaverIdList");
    //localStorage.removeItem("linkSaverIdList");
    
    console.log(idList);

    var element = document.getElementById("links-content");

    var ids = idList.split(",");
    ids.forEach(function(id) {
	  console.log(id);
	  var value = localStorage.getItem(id);
	  console.log(value);

		/*var a = document.createElement('a');
		var linkText = document.createTextNode(id);
		a.appendChild(linkText);
		a.title = id;
		a.href = value;
		element.appendChild(a);*/

		document.getElementById("links-content").innerHTML += '<a target="_blank" href="' + value + '">' + id + '</a> <br/>';

		console.log("child created");

	});


  } else {
  	console.log("No storage found !!");
  }

  console.log("storage call successful.");

 });

function saveLinkInfo() {
    var link = document.getElementById("linkInfo").value;
    var tag = document.getElementById("tagInfo").value;

    if (typeof(Storage) !== "undefined") {
    	
    	var idList = localStorage.getItem("linkSaverIdList");

    	if( idList == null ){
    		idList = tag ;
    	}else{
    		idList = idList + "," + tag ;
    	}

    	localStorage.setItem("linkSaverIdList", idList);
    	localStorage.setItem(tag, link);

  	} else {
  	  console.log("No storage found !!");
    }
     
  };

document.getElementById('saveLinkButton').addEventListener('click', saveLinkInfo);
