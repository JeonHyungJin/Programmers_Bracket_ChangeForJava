let bodyText = "";
let changedText;
let result = "";

chrome.extension.onMessage.addListener(function (request, sender) {
	if (request.action == "getSource") {
		bodyText = request.source;

		changedText = changeBracket(bodyText);
		for (var i = 0; i < changedText.length; i++) {
			tempStr = replaceAll(changedText[i], "[", "{");
			result = result + replaceAll(tempStr, "]", "}") + "<br/>";
		}
		document.body.innerHTML = result;
	}
});

function replaceAll(str, searchStr, replaceStr) {
	return str.split(searchStr).join(replaceStr);
}

function onWindowLoad() {
	chrome.tabs.executeScript(
		null,
		{
			file: "getSource.js",
		},
		function () {
			if (chrome.extension.lastError) {
				document.body.innerText = "Error...!";
			}
		}
	);
}

window.onload = onWindowLoad;

function changeBracket(beforeChange) {
	forChange = beforeChange.split("\n");
	forChange = forChange.slice(1);

	return forChange;
}
