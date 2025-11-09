// Variables
const pageTitle = "Hangman";
let secretWord = "";
let secretArray = [];
let availableTries = 11;
let failedTriesCount = 0;
let isWon = false;
let isLost = false;
let matchedLettersArray = [];
let matchingLettersArray = [];
let usedLettersArray = [];
let isInitialGuess = true;

$(document).ready(async function ()
{
	//$(document).attr("title", pageTitle);
	let screenWidth = window.innerWidth;
	$("#game-heading").append(screenWidth);
});
function glowDiv(divId, colour) 
{
	let glowColour = colour === "green" ? "glowGreen" : "glowRed";
	const div = document.getElementById(divId);
	div.classList.remove(glowColour); // reset if clicked multiple times
	void div.offsetWidth; // trick to restart animation
	div.classList.add(glowColour);
}
function saveWord()
{
	let $wordProgressContainer = $("#word-progress-container");
	secretArray = secretWord.split("");

	secretArray.forEach((secretLetter, index) =>
	{
		$wordProgressContainer.append(`<div class="col-1"><span class="letter-dash" id="letter-dash-${index}"><h3>-</h3></span><span class="letter-match" id="letter-match-${index}" style="display:none"><h3>${secretLetter}</h3></span></div>`);
	});

	if (secretArray.length > 10)
	{
		let screenWidth = window.innerWidth;
		if (screenWidth < 600)
		{
			// mobile
			$wordProgressContainer.css("letter-spacing", "0.5rem");
			$(".col-1").css("flex", "0 0 5px");
		}
		else
		{
			// desktop / tablet
			$wordProgressContainer.css("letter-spacing", "1rem");
			$(".col-1").css("flex", "0 0 15px");
		}
	}
}
async function processMatchingLetters(matchArray, userMessage, letter)
{
	if (matchArray.length > 0)
	{
		// Show user message
		userMessage.empty().append("<h3>Good job!</h3>").removeClass("text-danger").addClass("text-success");
		addToUsedLettersBox(letter);
		glowDiv("word-progress-container", "green");

		let matchedLettersIndexArray = [];
		matchArray.forEach((guessedLetter, index) => 
		{
			secretArray.forEach((secretLetter, index) => 
			{
				if (secretLetter === guessedLetter)
				{
					matchedLettersIndexArray.push(index);
					// check how many times correctly guessed letter appears in secret word
					let numberOfTimes = secretArray.filter(i => i == guessedLetter).length;

					for (let i = 0; i <= numberOfTimes; i++)
					{
						// check how many times this letter has been added to "matched letters array" already
						let timesLetterAppearsInArray = matchedLettersArray.filter(i => i == guessedLetter).length;
						if (timesLetterAppearsInArray !== numberOfTimes)
						{
							matchedLettersArray.push(guessedLetter);
						}
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

		// show user message for 2 seconds
		await delay(2000);
		userMessage.empty().append("<h3>&nbsp;</h3>");

		// All guessed letters match secret word
		if (matchedLettersArray.length == secretArray.length)
		{
			isWon = true;
			showWonMessage();
		}
	}
}
function showWonMessage()
{
	Swal.fire({
		title: "You WIN!",
		html: `The secret word was:<br/> <h2>${secretWord}<h2>`,
		imageUrl: "https://imagestore-production.up.railway.app/images/hangman/hangman-win-colour.png",
		imageWidth: 500,
		imageHeight: 287,
		imageAlt: "Hangman winner image",
		showCancelButton: false,
		confirmButtonColor: "#0d6efd", // primary blue
		confirmButtonText: "Ok"
	}).then((result) =>
	{
		if (result.isConfirmed)
		{
			location.reload();
		}
	});
}
function showLostMessage()
{
	Swal.fire({
		title: "You LOSE!",
		html: `The secret word was:<br/> <h2>${secretWord}<h2>`,
		imageUrl: "https://imagestore-production.up.railway.app/images/hangman/hangman-banner.png",
		imageWidth: 500,
		imageHeight: 287,
		imageAlt: "Hangman banner image",
		showCancelButton: false,
		confirmButtonColor: "#0d6efd", // primary blue
		confirmButtonText: "Ok"
	}).then((result) =>
	{
		if (result.isConfirmed)
		{
			location.reload();
		}
	});
}
async function alreadyTriedThisLetter(userMessage, letter)
{
	// Already tried this letter
	userMessage.removeClass("text-danger").addClass("text-success");
	userMessage.empty().append("<h3>Already tried this letter!</h3>");
	addToUsedLettersBox(letter);
	// remove message after delay
	await delay(2000);
	userMessage.empty().append("<h3>&nbsp;</h3>");
}
function whichGuess()
{
	let input = $("#guess-letter-input").val();
	if (!input)
	{
		return;
	}
	if (input.length === 1)
	{
		letterGuess();
	}
	else
	{
		wordGuess();
	}
}
async function wordGuess()
{
	let word = $("#guess-letter-input").val();
	if (!word)
	{
		return;
	}
	word = word.trim().toLowerCase();

	if (word === secretWord)
	{
		isWon = true;
		showWonMessage();
	}
	else
	{
		wrongWordChoice();
	}
}
async function letterGuess()
{
	if (isInitialGuess)
	{
		// Replace starting image with faded one on first guess
		$("#hangman-image").attr("src", "https://imagestore-production.up.railway.app/images/hangman/hangman-fade.png");
		isInitialGuess = false;
	}

	let letter = $("#guess-letter-input").val();
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
	$("#guess-letter-input").val("");
	let isMatch = false;
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
		await processMatchingLetters(matchingLettersArray, $userMessage, letter);
	}
	else if (matchCount == 0 && isMatch)
	{
		// Already tried this letter
		await alreadyTriedThisLetter($userMessage, letter);
	}
	else
	{
		if (usedLettersArray.includes(letter))
		{
			// Already tried this letter
			await alreadyTriedThisLetter($userMessage, letter);
		}
		else
		{
			// Oh no!
			await wrongLetterChoice($userMessage, letter);
		}
	}
	// Add to used letters array
	//addToUserLettersBox(letter);
}
async function wrongWordChoice()
{
	if (isInitialGuess)
	{
		// Replace starting image with faded one on first guess
		$("#hangman-image").attr("src", "https://imagestore-production.up.railway.app/images/hangman/hangman-fade.png");
		isInitialGuess = false;
	}
	$("#guess-letter-input").val("");
	let $userMessage = $("#userMessage");
	$userMessage.removeClass("text-success").addClass("text-danger");
	$userMessage.empty().append("<h3>Oh no!</h3>");

	failedTriesCount++;
	glowDiv("tries-counter", "red");
	showRelevantImage();
	// remove message after delay
	await delay(2000);
	$userMessage.empty().append("<h3>&nbsp;</h3>");

	if (failedTriesCount == availableTries)
	{
		showLostMessage();
	}
}
async function wrongLetterChoice($userMessage, letter)
{
	$userMessage.removeClass("text-success").addClass("text-danger");
	$userMessage.empty().append("<h3>Oh no!</h3>");
	addToUsedLettersBox(letter);
	failedTriesCount++;
	glowDiv("tries-counter", "red");
	showRelevantImage();
	// remove message after delay
	await delay(2000);
	$userMessage.empty().append("<h3>&nbsp;</h3>");

	if (failedTriesCount == availableTries)
	{
		showLostMessage();
	}
}
function addToUsedLettersBox(letter)
{
	// Add to used letters array
	if (!usedLettersArray.includes(letter))
	{
		usedLettersArray.push(letter);

		$("#used-letters").append(letter.toUpperCase());
	}
}
function delay(ms)
{
	return new Promise(resolve => setTimeout(resolve, ms));
}
function showRelevantImage()
{
	let imageToShow = "";
	if (failedTriesCount > 0 && failedTriesCount < availableTries)
	{
		imageToShow = `https://imagestore-production.up.railway.app/images/hangman/hangman-${failedTriesCount}.png`;
	}
	if (failedTriesCount == availableTries)
	{
		imageToShow = `https://imagestore-production.up.railway.app/images/hangman/hangman-final.png`;
	}
	$("#hangman-image").attr("src", imageToShow);
	$("#tries-count-message").empty().append(`${availableTries - failedTriesCount}`);
}