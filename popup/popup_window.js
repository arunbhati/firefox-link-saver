
document.addEventListener("DOMContentLoaded", function(event) {
	getValuesFromStorageAndUpdateHtml();  

	chrome.storage.local.get(null,function(results) {
	    if(chrome.runtime.lastError) {
	    	console.log(chrome.runtime.lastError);
	    } else {

			var input = document.getElementById("search_link_box");
	    	var noteKeys = Object.keys(results);
	    	var listOfObjects = [];

	    	for(i = 0; i < noteKeys.length; i++) {
				var curKey = noteKeys[i];
				var curValue = results[curKey];
				var singleObj = {}
			    singleObj['label'] = curKey;
			    singleObj['value'] = curValue;
			    listOfObjects.push(singleObj);
			}

			new Awesomplete(input, {
				list: listOfObjects
			});
	    }
	});

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
    
  });
	
  addEventListenerForDeleteButton();
	
};

function isValid(value) {
    return (value != null && value && value.length != 0);
};

var copyTextareaBtn = document.querySelector('.js-textareacopybtn');

copyTextareaBtn.addEventListener('click', function(event) {

  var input = document.getElementById("search_link_box");
  input.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }
});


var openLink = document.querySelector('.js-openlink');
openLink.addEventListener('click', function(event) {

	var input = document.getElementById("search_link_box");

	var win = window.open(input.value, '_blank');

	if (win) {
	    //Browser has allowed it to be opened
	    win.focus();
	} else {
	    //Browser has blocked it
	    alert('Please allow popups for this website');
	}
});

