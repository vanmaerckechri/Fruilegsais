let fruilegsais = 
{
	launched: false,
}

function initCanvas(canvas, canvasName)
{
	canvasName = canvas.getContext("2d");
}


// -- LAUNCH / STOP GAME --
let launchFruilegsaisGame = function()
{
	if (fruilegsais.launched == false)
	{
		//create html content
		let flsContainer = document.getElementById("flsContainer");
		let fruitlegsaisUi = document.createElement("div");
		fruitlegsaisUi.setAttribute("class", "flsUiContainer");

		let flsScoreContainer = document.createElement("div");
		flsScoreContainer.setAttribute("class", "flsScoreContainer");
		flsScoreContainer.innerText = "score: ";

		let flsScore = document.createElement("span");
		flsScore.setAttribute("id", "flsScore");
		flsScore.innerText = "0";

		flsScoreContainer.appendChild(flsScore);
		fruitlegsaisUi.appendChild(flsScoreContainer);
		flsContainer.appendChild(fruitlegsaisUi);

		let flsCanvasContainer = document.createElement("div");
		flsCanvasContainer.setAttribute("id", "flsCanvasContainer");
		flsCanvasContainer.setAttribute("class", "flsCanvasContainer");

		let flsCanvasMain = document.createElement("canvas");
		flsCanvasMain.setAttribute("id", "flsCanvasMain");
		flsCanvasMain.setAttribute("class", "flsCanvasMain");


		flsCanvasContainer.appendChild(flsCanvasMain);
		flsContainer.appendChild(flsCanvasContainer);

		initCanvas(flsCanvasMain, "flsCtxMain");
	}
}

let launchFruilegsaisHome = function()
{
	if (fruilegsais.launched == false)
	{
		let flsContainer = document.getElementById("flsContainer");
		let flsTuto = document.createElement("div");
		flsTuto.setAttribute("class", "flsTuto");

		let flsTutoTitle = document.createElement("div");
		flsTutoTitle.setAttribute("class", "flsTutoTitle");
		flsTutoTitle.innerText = "Partie Bonus";

		let flsTutoContent = document.createElement("div");
		flsTutoContent.setAttribute("class", "flsTutoContent");
		flsTutoContent.innerHTML = "Bonjour,</br> Un petit Tuto illustré sera présent sur cette page.";

		let flsLaunchGameButton = document.createElement("button");
		flsLaunchGameButton.setAttribute("class", "flsButton flsLaunchGameButton");
		flsLaunchGameButton.setAttribute("id", "flsLaunchGameButton");
		flsLaunchGameButton.innerText = "commencer"

		flsTuto.appendChild(flsTutoTitle);
		flsTuto.appendChild(flsTutoContent);
		flsTuto.appendChild(flsLaunchGameButton);
		flsContainer.appendChild(flsTuto);
		flsLaunchGameButton.onclick = function()
		{
			flsTuto.remove();
			launchFruilegsaisGame();
		}
	}
}

function closeGame()
{
	let flsContainerChilds = document.querySelectorAll("#flsContainer div");
	for (let i = flsContainerChilds.length - 1; i >= 0; i--)
	{
		flsContainerChilds[i].remove();
	}
}

window.addEventListener("load", function()
{
	launchFruilegsaisHome();
});