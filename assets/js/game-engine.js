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
		this.refreshGameLoop;
		this.canvasList = [];
		this.timeStart;
		this.monthList = ["mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre", "janvier", "février"];
		this.daysByMonth = [31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 31, 29];
		this.currentMonth = 0;//!(it's the array index);
		this.currentDay = 21;

		this.fruitsLegumesList = 
		[
			this.cassis = 
			{
				monthToEat: ["juillet, août"],
				img: createElem("img", "src", "assets/img/cassis.png")
			},
			this.cerise = 
			{
				monthToEat: ["juillet, août"],
				img: createElem("img", "src", "assets/img/cerise.png")			
			},
			this.groseille = 
			{
				monthToEat: ["juin", "juillet"],
				img: createElem("img", "src", "assets/img/groseille.png")			
			},
			this.myrtille = 
			{
				monthToEat: ["juillet, août"],
				img: createElem("img", "src", "assets/img/myrtille.png")			
			},
			this.pomme = 
			{
				monthToEat: ["mars", "septembre", "octobre", "novembre", "décembre", "janvier", "février"],
				img: createElem("img", "src", "assets/img/pomme.png")			
			},
			this.poire = 
			{
				monthToEat: ["mars", "septembre", "octobre", "novembre", "décembre", "janvier", "février"],
				img: createElem("img", "src", "assets/img/poire.png")			
			},
			this.carotte = 
			{
				monthToEat: ["juin", "juillet", "août", "septembre", "octobre"],
				img: createElem("img", "src", "assets/img/carotte.png")			
			},
			this.potiron = 
			{
				monthToEat: ["août", "septembre", "octobre", "novembre", "décembre", "janvier", "février"],
				img: createElem("img", "src", "assets/img/potiron.png")			
			}
		];
	}

	initCanvas(canvas, canvasName)
	{
		if (typeof canvasName == "string")
		{
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			canvasName = canvas.getContext("2d");
			this.canvasList.push(canvasName);
		}
		else
		{
			for (let i = canvas.length - 1; i >= 0; i--)
			{
				canvas[i].width = window.innerWidth;
				canvas[i].height = window.innerHeight;
				canvasName[i] = canvas[i].getContext("2d");
				this.canvasList.push(canvasName[i]);
			}
		}
	}

	choseRandFruitLegume()
	{
		let fruitLegumeContainer = document.getElementById("flsFruitLegumeContainer");
		if (fruitLegumeContainer.querySelectorAll("img").length == 0)
		{
			let lengthList = this.fruitsLegumesList.length;
			let randFruitLegume = Math.floor((Math.random() * lengthList) + 0);

			let currentImg = this.fruitsLegumesList[randFruitLegume].img;
			currentImg.setAttribute("id", "flsFruitLegumeImg");
			currentImg.setAttribute("class", "flsFruitLegumeImg");
			fruitLegumeContainer.appendChild(currentImg);
			//delete the pick from list
			this.fruitsLegumesList.splice(randFruitLegume, 1);
		}
	}

	updateDate()
	{
		if (this.currentDay == 29 && this.currentMonth == 11)
		{
			//fin de la partie
		}
		else
		{
			if (this.currentDay < this.daysByMonth[this.currentMonth])
			{
				this.currentDay += 1;
				document.getElementById("flsDateDay").innerText = this.currentDay;
			}
			else
			{
				this.currentDay = 1;
				this.currentMonth += 1;
				document.getElementById("flsDateDay").innerText = this.currentDay;
				document.getElementById("flsDateMonth").innerText = this.monthList[this.currentMonth];
			}			
		}
		if (this.currentDay == 21 && this.currentMonth % 3 == 0)
		{
			let flsSeason = document.getElementById("flsSeason");
			switch(this.currentMonth)
			{
			    case 0:
					flsSeason.innerText = "Printemps";
			        break;
			    case 3:
					flsSeason.innerText = "Été";
			        break;
			    case 6:
					flsSeason.innerText = "Automne";
			        break;
			    case 9:
					flsSeason.innerText = "Hiver";
			        break;
			} 
		}
	}

	countTime()
	{
		let currentTime = new Date().getTime();
		if ((currentTime - this.timeStart) >= 50 || typeof this.timeStart == "undefined")
		{
			this.updateDate();
			this.timeStart = new Date().getTime();
		}
	}

	refreshGame()
	{
		for (let i = this.canvasList.length - 1; i >= 0; i --)
		{
			this.canvasList[i].clearRect(0, 0, this.canvasList[i].width, this.canvasList[i].height);
		}
		this.countTime();
		this.choseRandFruitLegume();
	    this.refreshGameLoop = requestAnimationFrame(this.refreshGame.bind(this));
	}

	launch()
	{
		//create html content
		let flsContainer = document.getElementById("flsContainer");

		//Score
		let fruitlegsaisUi = createElem("div", "class", "flsUiContainer");
		let flsScoreContainer = createElem("div", "class", "flsScoreContainer");
		flsScoreContainer.innerText = "score: ";
		let flsScore = createElem("span", "id", "flsScore");
		flsScore.innerText = "0";

		flsScoreContainer.appendChild(flsScore);
		fruitlegsaisUi.appendChild(flsScoreContainer);
		flsContainer.appendChild(fruitlegsaisUi);

		//Date
		let flsDateContainer = createElem("div", ["id", "class"], ["flsDateContainer", "flsDateContainer"]);
		let flsDateDay = createElem("div", ["id", "class"], ["flsDateDay", "flsDateDay"]);
		let flsDateMonth = createElem("div", ["id", "class"], ["flsDateMonth", "flsDateMonth"]);
		let flsSeason = createElem("div", ["id", "class"], ["flsSeason", "flsSeason"]);

		flsDateDay.innerText = this.currentDay;
		flsDateMonth.innerText = this.monthList[this.currentMonth];
		flsSeason.innerText = "Printemps";

		flsDateContainer.appendChild(flsDateDay);
		flsDateContainer.appendChild(flsDateMonth);
		flsDateContainer.appendChild(flsSeason);
		fruitlegsaisUi.appendChild(flsDateContainer);

		//Current Fruit/Legume
		let flsFruitLegumeContainer = createElem("div", ["id", "class"], ["flsFruitLegumeContainer", "flsFruitLegumeContainer"]);
		flsContainer.appendChild(flsFruitLegumeContainer);

		//Canvas
		let flsCanvasContainer = createElem("div", ["id", "class"], ["flsCanvasContainer", "flsCanvasContainer"]);
		let flsCanvasMain = createElem("canvas", ["id", "class"], ["flsCanvasMain", "flsCanvasMain"]);

		flsCanvasContainer.appendChild(flsCanvasMain);
		flsContainer.appendChild(flsCanvasContainer);

		this.initCanvas(flsCanvasMain, "flsCtxMain");
		window.requestAnimationFrame(this.refreshGame.bind(this)); 
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