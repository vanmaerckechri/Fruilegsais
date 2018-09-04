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
		this.currentFruiLeg;

		this.fruitsLegumesList = 
		[
			this.cassis = 
			{
				monthToEat: ["juillet, août"],
				img: createElem("img", "src", "assets/img/cassis.png"),
				alt: "cassis"
			},
			this.cerises = 
			{
				monthToEat: ["juillet, août"],
				img: createElem("img", "src", "assets/img/cerise.png"),
				alt: "cerises"
			},
			this.groseilles = 
			{
				monthToEat: ["juin", "juillet"],
				img: createElem("img", "src", "assets/img/groseille.png"),
				alt: "groseilles"		
			},
			this.myrtilles = 
			{
				monthToEat: ["juillet, août"],
				img: createElem("img", "src", "assets/img/myrtille.png"),
				alt: "myrtilles"				
			},
			this.pomme = 
			{
				monthToEat: ["mars", "septembre", "octobre", "novembre", "décembre", "janvier", "février"],
				img: createElem("img", "src", "assets/img/pomme.png"),
				alt: "pomme"						
			},
			this.poire = 
			{
				monthToEat: ["mars", "septembre", "octobre", "novembre", "décembre", "janvier", "février"],
				img: createElem("img", "src", "assets/img/poire.png"),
				alt: "poire"								
			},
			this.carotte = 
			{
				monthToEat: ["juin", "juillet", "août", "septembre", "octobre"],
				img: createElem("img", "src", "assets/img/carotte.png"),
				alt: "carotte"							
			},
			this.petitspois = 
			{
				monthToEat: ["juin", "juillet"],
				img: createElem("img", "src", "assets/img/petitpois.png"),
				alt: "petits pois"							
			},
			this.potiron = 
			{
				monthToEat: ["août", "septembre", "octobre", "novembre", "décembre", "janvier", "février"],
				img: createElem("img", "src", "assets/img/potiron.png"),
				alt: "potiron"							
			},
			this.tomate = 
			{
				monthToEat: ["mai", "juin", "juillet", "août", "septembre", "octobre"],
				img: createElem("img", "src", "assets/img/tomate.png"),
				alt: "tomate"							
			},
			this.pdt = 
			{
				monthToEat: ["mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "décembre", "janvier", "février"],
				img: createElem("img", "src", "assets/img/pdt.png"),
				alt: "pommes de terre"							
			},
			this.radi = 
			{
				monthToEat: ["avril", "mai", "juin", "juillet", "août", "septembre"],
				img: createElem("img", "src", "assets/img/radirose.png"),
				alt: "radis roses"							
			}
		];
		this.badAnswerImg = createElem("img", ["id", "class", "src"], ["flsAnswerImg", "flsAnswerImg", "assets/img/answer_inco.svg"]);
		this.goodAnswerImg = createElem("img", ["id", "class", "src"], ["flsAnswerImg", "flsAnswerImg", "assets/img/answer_co.svg"]);

		this.restFruitsLegumesList = this.fruitsLegumesList;
		this.finalResult = [[],[]];
		this.score = 0;
		this.endOfGame = false;
		this.numberDaysRemaining = 0;
	}

	choseRandFruitLegume()
	{
		if (document.getElementById("flsFruitLegumeImg") == null)
		{
			let fruitLegumeContainer = document.getElementById("flsFruitLegumeContainer");

			let lengthList = this.restFruitsLegumesList.length;
			let randFruitLegume = Math.floor((Math.random() * lengthList) + 0);

			let currentImg = this.restFruitsLegumesList[randFruitLegume].img;
			currentImg.setAttribute("id", "flsFruitLegumeImg");
			currentImg.setAttribute("class", "flsFruitLegumeImg");
			fruitLegumeContainer.appendChild(currentImg);

			this.currentFruiLeg = this.fruitsLegumesList[randFruitLegume];
			this.finalResult[0].push(this.fruitsLegumesList[randFruitLegume].alt);
			//delete the pick from list
			this.restFruitsLegumesList.splice(randFruitLegume, 1);
		}
	}

	updateDate()
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

	countTime(milliSec)
	{
		if (this.currentDay == 29 && this.currentMonth == 11)
		{
			//fin de la partie
		}
		else
		{
			let currentTime = new Date().getTime();
			if ((currentTime - this.timeStart) >= milliSec || typeof this.timeStart == "undefined")
			{
				this.updateDate();
				this.timeStart = new Date().getTime();

				// calcul time bonus score on final screen				
				if (this.endOfGame == true)
				{
					this.numberDaysRemaining += 1
				}
			}
		}
	}

	refreshBonusTimeScore()
	{
		this.countTime(10);
		document.getElementById("scoreDaysRemaining").innerText = this.numberDaysRemaining;
		document.getElementById("flsScoreFinal").innerText = this.score + this.numberDaysRemaining;
		this.refreshGameLoop = window.requestAnimationFrame(this.refreshBonusTimeScore.bind(this));
	}



	callFinalScreen()
	{
		let flsContainer = document.getElementById("flsContainer");
		let scoreFinalContainer = createElem("div", ["id", "class"], ["flsScoreFinalContainer","flsScoreFinalContainer"]);
		let scoreDaysHTML = '<span id="scoreDaysRemaining" class="scoreDaysRemaining"></span>';
		let scoreFinalHTML = '<span id="flsScoreFinal" class="flsScoreFinal">' + this.score + '</span>';

		flsContainer.appendChild(scoreFinalContainer);
		scoreFinalContainer.innerHTML = '<span class="flsScoreFinalText">score: </span>' + this.score + ' + ' + scoreDaysHTML + ' nombre de jours restants = ' + scoreFinalHTML;

		this.refreshBonusTimeScore();
	}

	treatScore(answerResult)
	{
		let score = document.getElementById("flsScore");

		if (answerResult == true)
		{
			this.score += 100;
			score.innerText = this.score;
			this.numberOfGoodAnswer += 1;
		}
		else
		{
			if (parseInt(score.innerText) > 0)
			{
				this.score -= 100;
				score.innerText = this.score;
			}
		}
	}

	checkAccuracyAnswer(answer)
	{
		let fruitLegumeContainer = document.getElementById("flsFruitLegumeContainer");
		let fruitLegumeImg;
		for (let i = this.currentFruiLeg["monthToEat"].length - 1; i >= 0; i--)
		{
			// check if this fruit/legume is in season
			if (this.currentFruiLeg["monthToEat"][i] == this.monthList[this.currentMonth])
			{
				// good answer = in season
				if (answer == true)
				{
					fruitLegumeImg = this.goodAnswerImg;
					fruitLegumeContainer.appendChild(fruitLegumeImg);
					return true;
				}
				break;
			}
			// good answer = not in season
			if (i == 0 && answer == false)
			{
				fruitLegumeImg = this.goodAnswerImg;
				fruitLegumeContainer.appendChild(fruitLegumeImg);
				return true;
			}
		}
		// bad answer
		fruitLegumeImg = this.badAnswerImg;
		fruitLegumeContainer.appendChild(fruitLegumeImg);
		return false;
	}

	treatAnswer(answer)
	{
		let fruitLegumeImg = document.getElementById("flsFruitLegumeImg");
		let answerResult;
		let that = this;

		if (!fruitLegumeImg.classList.contains("flsFruitLegumeImgAnswerTrue") && !fruitLegumeImg.classList.contains("flsFruitLegumeImgAnswerFalse"))
		{
			// score and display
			answerResult = this.checkAccuracyAnswer(answer);
			this.treatScore(answerResult);

			// reset
			let deleteImg = setTimeout(function()
			{
				let answerImg = document.getElementById("flsAnswerImg");
				fruitLegumeImg.remove();
				answerImg.remove();
				that.endOfGame = that.restFruitsLegumesList.length == 0 ? true : false;
				clearTimeout(deleteImg);
			}, 500);

			// update answer array
			if (answer == true)
			{
				fruitLegumeImg.classList.add("flsFruitLegumeImgAnswerTrue");
				this.finalResult[this.finalResult.length - 1].push(true);
			}
			else
			{
				fruitLegumeImg.classList.add("flsFruitLegumeImgAnswerFalse");
				this.finalResult[this.finalResult.length - 1].push(false);
			}
		}
	}

	choseAnswer(that, event)
	{
		let fruitLegumeContainer = document.getElementById("flsFruitLegumeContainer");
		let touchStartPosX;
		let touchMovePosX;
		// with tactile
		if ('ontouchstart' in document.documentElement)
		{
			event.preventDefault();
			touchStartPosX = event.touches[0].clientX;
			fruitLegumeContainer.ontouchmove = function(event)
			{
				touchMovePosX = event.touches[0].clientX;
			};

			window.ontouchend = function()
			{
				fruitLegumeContainer.ontouchmove = null;
				window.ontouchend = null;

				if (touchStartPosX + 50 < touchMovePosX)
				{
					that.treatAnswer(true);
				}
				else if (touchStartPosX - 50 > touchMovePosX)
				{
					that.treatAnswer(false);
				}
			};
		}
		// with mouse
		else
		{
			touchStartPosX = event.clientX;
			fruitLegumeContainer.onmousemove = function(event)
			{
				touchMovePosX = event.clientX;
			};

			window.onmouseup = function()
			{
				fruitLegumeContainer.onmousemove = null;
				window.onmouseup = null;

				if (touchStartPosX + 50 < touchMovePosX)
				{
					that.treatAnswer(true);
				}
				else if (touchStartPosX - 50 > touchMovePosX)
				{
					that.treatAnswer(false);
				}
			};			
		}
	}

	refreshGame()
	{
		if (this.endOfGame == false)//endOfGame status change in treatAnswer()
		{
			// refresh canvas
			for (let i = this.canvasList.length - 1; i >= 0; i --)
			{
				this.canvasList[i].clearRect(0, 0, this.canvasList[i].width, this.canvasList[i].height);
			}

			// game cycle
			this.countTime(50);
			this.choseRandFruitLegume();
			this.refreshGameLoop = window.requestAnimationFrame(this.refreshGame.bind(this));
		}
		else
		{
			// end of game
			window.cancelAnimationFrame(this.refreshGameLoop);
			document.getElementById("flsFruitLegumeContainer").remove();
			document.getElementById("flsScoreContainer").remove();
			this.callFinalScreen();
		}
	}

	initCommands()
	{
		let fruitLegumeContainer = document.getElementById("flsFruitLegumeContainer");
		let that = this;
		let startEvent;
		// with tactile
		if ('ontouchstart' in document.documentElement)
		{
			startEvent = "touchstart";
		}
		// with mouse
		else
		{
			startEvent = "mousedown";
		}
		fruitLegumeContainer.addEventListener(startEvent, this.choseAnswer.bind(that, this), false);
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

	launch()
	{
		//create html content
		let flsContainer = document.getElementById("flsContainer");

		//Score
		let fruitlegsaisUi = createElem("div", ["id", "class"], ["flsUiContainer", "flsUiContainer"]);
		let flsScoreContainer = createElem("div", ["id", "class"], ["flsScoreContainer", "flsScoreContainer"]);
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
		this.initCommands();
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