// -- TOOLS --
let createElem = function(createType, attributeType, attributeValue)
{
	let element = document.createElement(createType);
	if (Array.isArray(attributeType) && Array.isArray(attributeValue))
	{
		if (attributeType.length == attributeValue.length)
		{
			for (let i = attributeType.length - 1; i >= 0; i--)
			{
				element.setAttribute(attributeType[i], attributeValue[i]);
			}
			return element;
		}
		else
		{
			console.log("attributeType.length != attributeValue.length");
			return;
		}
	}
	if (typeof attributeType == "string" && typeof attributeValue == "string")
	{
		element.setAttribute(attributeType, attributeValue);
		return element;		
	}
	else
	{
		console.log("attributeType = "+ typeof attributeType);
		console.log("attributeValue = "+typeof attributeValue);				
	}
};

// -- GAME OBJECT --
let Fruilegsais = class
{
	constructor()
	{
		this.launched = false;
	}

	initCanvas(canvas, canvasName)
	{
		if (typeof canvasName == "string")
		{
			canvasName = canvas.getContext("2d");
		}
		else
		{
			for (let i = canvas.length - 1; i >= 0; i--)
			{
				canvasName[i] = canvas[i].getContext("2d");
			}
		}
	}

	launch()
	{
		//create html content
		let flsContainer = document.getElementById("flsContainer");

		let fruitlegsaisUi = createElem("div", "class", "flsUiContainer");
		let flsScoreContainer = createElem("div", "class", "flsScoreContainer");
		flsScoreContainer.innerText = "score: ";
		let flsScore = createElem("span", "id", "flsScore");
		flsScore.innerText = "0";

		flsScoreContainer.appendChild(flsScore);
		fruitlegsaisUi.appendChild(flsScoreContainer);
		flsContainer.appendChild(fruitlegsaisUi);

		let flsCanvasContainer = createElem("div", ["id", "class"], ["flsCanvasContainer", "flsCanvasContainer"]);
		let flsCanvasMain = createElem("canvas", ["id", "class"], ["flsCanvasMain", "flsCanvasMain"]);

		flsCanvasContainer.appendChild(flsCanvasMain);
		flsContainer.appendChild(flsCanvasContainer);

		this.initCanvas(flsCanvasMain, "flsCtxMain");
	}

	launchMainMenu()
	{
		let flsContainer = document.getElementById("flsContainer");

		let flsTutoContainer = createElem("div", "class", "flsTutoContainer");
		let flsTutoTitle = createElem("h2", "class", "flsTutoTitle");
		flsTutoTitle.innerText = "Partie Bonus";
		let flsTutoContent = createElem("p", "class", "flsTutoContent");
		flsTutoContent.innerHTML = "Bonjour,</br> Un petit Tuto illustré sera présent sur cette page.";
		let flsLaunchGameButton = createElem("button", ["id", "class"], ["flsLaunchGameButton", "flsButton flsLaunchGameButton"]);
		flsLaunchGameButton.innerText = "commencer"

		flsTutoContainer.appendChild(flsTutoTitle);
		flsTutoContainer.appendChild(flsTutoContent);
		flsTutoContainer.appendChild(flsLaunchGameButton);
		flsContainer.appendChild(flsTutoContainer);

		flsLaunchGameButton.onclick = function()
		{
			flsTutoContainer.remove();
			fruitlegsais.launch();
		}
	}

	closeGame()
	{
		let flsContainerChilds = document.querySelectorAll("#flsContainer div");
		for (let i = flsContainerChilds.length - 1; i >= 0; i--)
		{
			flsContainerChilds[i].remove();
			fruitlegsais = null;
		}
	}
};

window.addEventListener("load", function()
{
		fruitlegsais = new Fruilegsais();
		fruitlegsais.launchMainMenu();
});