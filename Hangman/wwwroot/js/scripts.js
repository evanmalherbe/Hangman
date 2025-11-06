// Variables
const pageTitle = "Hangman game";
let secretWord = "";
let secretArray = [];
let availableTries = 11;
let failedTriesCount = 0;
let isWon = false;
let isLost = false;
let matchedLettersArray = [];
let matchingLettersArray = [];
let usedLettersArray = [];

$(document).ready(async function ()
{
	$(document).attr("title", pageTitle);
	//showWonMessage();
	//showLostMessage();
});
function resetGame()
{
	// reset variables
	isWon = false;
	isLost = false;
	secretWord = "";
	secretArray = [];
	failedTriesCount = 0;
	matchedLettersArray = [];
	matchCount = 0;
	matchingLettersArray = [];
	usedLettersArray = [];

	// Clear fields
	$("#big-user-message-div").empty()
	//$(`#letter-dash-${letterIndex}`).hide();
	$("#secret-word-input").val("");
	$("#user-messages").empty();
	$("#used-letters").empty();
	$("#guess-input").val("");
	$("#badMessage").empty();
	$("#hangman-image").attr("src", "hangman-0.png");
	$(".letter-match").empty().hide();
	$(".letter-dash").hide();
	$("#tries-count-message").empty().append(`${availableTries - failedTriesCount}`);

	hideContainers("show");
}
function glowDiv(divId, colour) 
{
	let glowColour = colour === "green" ? "glowGreen" : "glowRed";
	const div = document.getElementById(divId);
	div.classList.remove(glowColour); // reset if clicked multiple times
	void div.offsetWidth; // trick to restart animation
	div.classList.add(glowColour);
}
function hideContainers(input)
{
	if (input === "" || input === undefined)
	{
		return;
	}
	if (input === "hide")
	{
		// Hide secret word entry and show guess entry and other stats
		$("#secret-word-container").removeClass("d-flex").hide();
		$("#guess-container").addClass("d-flex").removeClass("d-none");
		$("#word-progress-container").addClass("d-flex").removeClass("d-none");
		$("#used-letters-container").removeClass("d-none");
		$("#tries-counter-parent").removeClass("d-none");
	}
	else
	{
		// show
		$("#secret-word-container").removeClass("d-none").show();
		$("#guess-container").addClass("d-none").removeClass("d-flex");
		$("#word-progress-container").empty().addClass("d-none").removeClass("d-flex");
		$("#used-letters-container").addClass("d-none").removeClass("d-flex");
		$("#tries-counter-parent").addClass("d-none").removeClass("d-flex");
	}
}
function saveWord()
{
	let $wordProgressContainer = $("#word-progress-container");
	secretArray = secretWord.split("");
	// Hide secret word entry and show guess entry and other stats
	hideContainers("hide");

	secretArray.forEach((secretLetter, index) =>
	{
		$wordProgressContainer.append(`<div class="col-1"><span class="letter-dash" id="letter-dash-${index}"><h3>-</h3></span><span class="letter-match" id="letter-match-${index}" style="display:none"><h3>${secretLetter}</h3></span></div>`);
	});

	$("#hangman-image").attr("src", "hangman-fade.png");
}
async function processMatchingLetters(matchArray, userMessage)
{
	if (matchArray.length > 0)
	{
		// Show user message
		userMessage.empty().append("<h3>Good job!</h3>").removeClass("text-danger").addClass("text-success");
		await delay(2000);
		userMessage.empty().append("<h3>&nbsp;</h3>");
	
		/*$("#big-user-message-div").empty().append("<span id='goodMessage' class='text-success'><h3>Good job!</h3></span>");*/
		
		glowDiv("word-progress-container", "green");
		//$("#goodMessage").stop(true, true)         // reset any running animation
		//	.fadeIn(400)              // fade in over 0.4s
		//	.delay(2000)              // stay visible for 2s
		//	.fadeOut(600);

		let matchedLettersIndexArray = [];
		matchArray.forEach((guessedLetter, index) => 
		{
			secretArray.forEach((secretLetter, index) => 
			{
				if (secretLetter === guessedLetter)
				{
					matchedLettersIndexArray.push(index);
					if (!matchedLettersArray.includes(guessedLetter))
					{
						matchedLettersArray.push(guessedLetter);
					}
				}
			});
		});

		// Show correcly guessed letter/s in matched letters section
		if (matchedLettersIndexArray.length > 0)
		{
			matchedLettersIndexArray.forEach((letterIndex, index) => 
			{
				$(`#letter-dash-${letterIndex}`).hide();
				$(`#letter-match-${letterIndex}`).show();
			});
		}
		// All guessed letters match secret word
		if (matchedLettersArray.length == secretArray.length)
		{
			isWon = true;
			showWonMessage();
			resetGame();
		}
	}
}

function showWonMessage()
{
	Swal.fire({
		title: "You WIN!",
		text: "Well done for guessing the word",
		icon: "success"
	});
}
function showLostMessage()
{
	Swal.fire({
		title: "You LOSE!",
		text: "Better luck next time...",
		imageUrl: "hangman-banner.png",
		imageWidth: 500,
		imageHeight: 287,
		imageAlt: "Hangman banner image"
	});
}
async function alreadyTriedThisLetter(userMessage)
{
	// Already tried this letter
	userMessage.removeClass("text-danger").addClass("text-success");
	userMessage.empty().append("<h3>Already tried this letter!</h3>");
	// remove message after delay
	await delay(2000);
	userMessage.empty().append("<h3>&nbsp;</h3>");
}
async function letterGuess()
{
	let letter = $("#guess-input").val();
	if (letter === "")
	{
		return;
	}
	if (secretWord === "")
	{
		$("#user-messages").append("<span class='text-danger'>No secret word chosen yet!</span>");
		return;
	}
	letter = letter.trim().toLowerCase();
	$("#user-messages").empty();
	$("#guess-input").val("");
	let isMatch = false;
	let $usedLettersElement = $("#used-letters");
/*	let $bigUserMessageDiv = $("#big-user-message-div");*/
	let $userMessage = $("#userMessage")
	let matchCount = 0;

	secretArray.some((secretLetter, index) => 
	{
		if (secretLetter === "" || secretLetter === " ")
		{
			return;
		}
		if (secretLetter === letter)
		{
			// new matching letter
			if (!matchingLettersArray.includes(letter))
			{
				matchCount++;
				matchingLettersArray.push(letter);
				isMatch = true;
			}
			else
			{
				// it's a match, but user has already suggested this letter
				isMatch = true;
				return true;
			}
		}
		return false;
	});

	if (matchCount > 0 && isMatch)
	{
		// Good job!
		await processMatchingLetters(matchingLettersArray, $userMessage);
	}
	else if (matchCount == 0 && isMatch)
	{
		// Already tried this letter
		await alreadyTriedThisLetter($userMessage);
	}
	else
	{
		if (usedLettersArray.includes(letter))
		{
			// Already tried this letter
			await alreadyTriedThisLetter($userMessage);
		}
		else
		{
			// Oh no!
			$userMessage.removeClass("text-success").addClass("text-danger");
			$userMessage.empty().append("<h3>Oh no!</h3>");
			// remove message after delay
			await delay(2000);
			$userMessage.empty().append("<h3>&nbsp;</h3>");

			glowDiv("tries-counter", "red");
			//$("#badMessage").stop(true, true)         // reset any running animation
			//	.fadeIn(400)              // fade in over 0.4s
			//	.delay(2000)              // stay visible for 2s
			//	.fadeOut(600);

			failedTriesCount++;
			showRelevantImage();
			if (failedTriesCount == 11)
			{
				showLostMessage();
				resetGame();
			}
		}
	}
	// Add to used letters array
	if (!usedLettersArray.includes(letter))
	{
		usedLettersArray.push(letter);
		$usedLettersElement.append(letter);
	}
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function showRelevantImage()
{
	let imageToShow = "";
	if (failedTriesCount > 0 && failedTriesCount < availableTries)
	{
		imageToShow = `hangman-${failedTriesCount}.png`;
	}
	if (failedTriesCount == availableTries)
	{
		imageToShow = `hangman-final.png`;
	}
	$("#hangman-image").attr("src", imageToShow);
	$("#tries-count-message").empty().append(`${availableTries - failedTriesCount}`);
}