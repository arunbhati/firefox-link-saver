
document.addEventListener("DOMContentLoaded", function(event) {
	getValuesFromStorageAndUpdateHtml();  

	var input = document.getElementById("search_link_box");
	new Awesomplete(input, {
		list: chrome.storage.local.get(null)
	});

	/*var input = document.getElementById("search_link_box");
	new Awesomplete(input, {
		list: localStorage.getItem("linkSaverIdList").split(",")
	});*/

	console.log("init finished");

 });

document.getElementById('saveLinkButton').addEventListener('click', saveLinkInfo);

function addEventListenerForDeleteButton(){

	chrome.storage.local.get(null,function(results) {
	    if(chrome.runtime.lastError) {
	    	console.log(chrome.runtime.lastError);
	    } else {
			
	    	var noteKeys = Object.keys(results);
			for(i = 0; i < noteKeys.length; i++) {
				var curKey = noteKeys[i];
				var curValue = results[curKey];
				document.getElementById('button_'+ i.toString() ).addEventListener('click', deleteAndUpdateHTML);
			}
	    }
	});


	/*for (var i = 0; i < localStorage.getItem("linkSaverIdList").split(",").length; i++) {
		document.getElementById('button_'+ i.toString() ).addEventListener('click', deleteAndUpdateHTML);
	};*/
};

function deleteAndUpdateHTML(){
	var linkId = this.id.replace("button_","link_");
	var key = document.getElementById(linkId).innerHTML;
	deleteRecord(key);
	getValuesFromStorageAndUpdateHtml();
}

function deleteRecord(deleteKey){
	console.log("Deleting Record..");
	chrome.storage.local.remove(deleteKey);
	/*localStorage.removeItem(deleteKey);
	var newKeyList =  [];
    (localStorage.getItem("linkSaverIdList").split(",")).forEach(function(key) {
		if(key != deleteKey){
			newKeyList.push(key) ;
		}
	});
	localStorage.setItem("linkSaverIdList",newKeyList.join(","));
	*/
}

function saveLinkInfo() {
	updateStorageWithKeyAndValue();
	getValuesFromStorageAndUpdateHtml(); 
};


function updateStorageWithKeyAndValue(){
	var tag = document.getElementById("tagInfo").value;
	var link = document.getElementById("linkInfo").value;

    if (typeof(Storage) !== "undefined" && isValid(tag) && isValid(link)) {

		chrome.storage.local.set({ [tag] : link }, function() {
			console.log("value added or updated.");
		});
		
    	/*if(!localStorage.getItem(tag)){
    	
	    	var idList = localStorage.getItem("linkSaverIdList");
	    	idList =  (!isValid(idList)) ? tag : (idList + "," + tag) ;
			localStorage.setItem("linkSaverIdList", idList);
		}

    	localStorage.setItem(tag, link);*/

  	} else {
  	  console.log("No storage found !!");
    }
};

function getValuesFromStorageAndUpdateHtml(){

  document.getElementById("links-content").innerHTML = '';	

  chrome.storage.local.get(null,function(results) {
    if(chrome.runtime.lastError) {
    	console.log(chrome.runtime.lastError);
    } else {

    	console.log("fetching values to show..");

    	document.getElementById("links-content").innerHTML = '<table style="width:100%"><tbody>';
    	var res =  '<table style="width:100%"><br/><tbody>';
    	
    	var noteKeys = Object.keys(results);
    	console.log(noteKeys.length);
		for(i = 0; i < noteKeys.length; i++) {
			var curKey = noteKeys[i];
			var curValue = results[curKey];
			console.log(curKey);
			console.log(curValue);
			var ln = '<tr><td><a id="link_'+ i +'" target="_blank" href="' + curValue + '">' + curKey + '</a></td><td> <button type="button" class="link_delete_button" id="button_'+i+'">delete</button> </td></tr>';
		  	res = res + ln;
		}
		res = res +  '</tbody></table>';
		document.getElementById("links-content").innerHTML = res;
    }

	/*	var idList = results["linkSaverIdList"];

		document.getElementById("links-content").innerHTML = '<table style="width:100%"><tbody>';
    	var res =  '<table style="width:100%"><br/><tbody>';
    	var count = 0;
    	(idList.split(",")).forEach(function(id) {
	    	var ln = '<tr><td><a id="link_'+ count +'" target="_blank" href="' + results[id] + '">' + id + '</a></td><td> <button type="button" class="link_delete_button" id="button_'+count+'">delete</button> </td></tr>';
		  	res = res + ln;
		  	count += 1;
		});
		res = res +  '</tbody></table>';
		document.getElementById("links-content").innerHTML = res;*/
    
  });
	
  addEventListenerForDeleteButton();

  
  /*if (typeof(Storage) !== "undefined" && isValid(localStorage.getItem("linkSaverIdList"))) {
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
	
  } else {
  	console.log("No storage found !!");
  }*/
	
};

function isValid(value) {
    return (value != null && value && value.length != 0);
};
