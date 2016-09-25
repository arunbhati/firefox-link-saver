document.addEventListener("DOMContentLoaded", function(event) {
	getValuesFromStorageAndUpdateHtml();  
 });

document.getElementById('saveLinkButton').addEventListener('click', saveLinkInfo);

function addEventListenerForDeleteButton(){
	for (var i = 0; i < localStorage.getItem("linkSaverIdList").split(",").length; i++) {
		document.getElementById('button_'+ i.toString() ).addEventListener('click', deleteAndUpdateHTML);
	};
};

function deleteAndUpdateHTML(){
	var linkId = this.id.replace("button_","link_");
	var key = document.getElementById(linkId).innerHTML;
	deleteRecord(key);
	getValuesFromStorageAndUpdateHtml();
}

function deleteRecord(deleteKey){
	console.log("Deleting Record..");
	localStorage.removeItem(deleteKey);
	var newKeyList =  [];
    (localStorage.getItem("linkSaverIdList").split(",")).forEach(function(key) {
		if(key != deleteKey){
			newKeyList.push(key) ;
		}
	});
	localStorage.setItem("linkSaverIdList",newKeyList.join(","));
}

function saveLinkInfo() {
	updateStorageWithKeyAndValue();
	getValuesFromStorageAndUpdateHtml(); 
};


function updateStorageWithKeyAndValue(){
	var tag = document.getElementById("tagInfo").value;
	var link = document.getElementById("linkInfo").value;

    if (typeof(Storage) !== "undefined" && isValid(tag) && isValid(link)) {

    	if(!localStorage.getItem(tag)){
    	
	    	var idList = localStorage.getItem("linkSaverIdList");
	    	idList =  (!isValid(idList)) ? tag : (idList + "," + tag) ;
			localStorage.setItem("linkSaverIdList", idList);
		}

    	localStorage.setItem(tag, link);

  	} else {
  	  console.log("No storage found !!");
    }
};


function getValuesFromStorageAndUpdateHtml(){

  document.getElementById("links-content").innerHTML = '';	
  
  if (typeof(Storage) !== "undefined" && isValid(localStorage.getItem("linkSaverIdList"))) {
    var idList = localStorage.getItem("linkSaverIdList");

    document.getElementById("links-content").innerHTML = '<table style="width:100%"><tbody>';
    var res =  '<table style="width:100%"><br/><tbody>';
    var count = 0;
    (idList.split(",")).forEach(function(id) {
    	var ln = '<tr><td><a id="link_'+ count +'" target="_blank" href="' + localStorage.getItem(id) + '">' + id + '</a></td><td> <button type="button" class="link_delete_button" id="button_'+count+'">delete</button> </td></tr>';
	  	res = res + ln;
	  	count += 1;
	});

	res = res +  '</tbody></table>';
	document.getElementById("links-content").innerHTML = res;
	console.log(document.getElementById("links-content").innerHTML);

  } else {
  	console.log("No storage found !!");
  }

  addEventListenerForDeleteButton();
};

function isValid(value) {
    return (value != null && value && value.length != 0);
};
