using System.Diagnostics;
using Hangman.Models;
using Hangman.ViewModel;
using Microsoft.AspNetCore.Mvc;

namespace Hangman.Controllers
{
	public class HomeController : Controller
	{
		private readonly ILogger<HomeController> _logger;
		private readonly List<string> _wordList = new List<string>
		{
				"acceptance",
				"accident",
				"administration",
				"agony",
				"aluminium",
				"assessment",
				"autonomy",
				"ballet",
				"basin",
				"bathtub",
				"beneficiary",
				"rubbish",
				"brag",
				"branch",
				"catalogue",
				"charity",
				"chauvinist",
				"chimney",
				"clothes",
				"collect",
				"concept",
				"constant",
				"correspondence",
				"dare",
				"deficiency",
				"dentist",
				"depression",
				"deter",
				"display",
				"dividend",
				"earthflax",
				"elbow",
				"even",
				"export",
				"fall",
				"fast",
				"flex",
				"fold",
				"goalkeeper",
				"gold",
				"harvest",
				"helpful",
				"homosexual",
				"hostility",
				"infinite",
				"insist",
				"jelly",
				"justice",
				"kidnap",
				"kidney",
				"king",
				"lack",
				"learn",
				"listening",
				"lifestyle",
				"looting",
				"maze",
				"means",
				"measure",
				"menu",
				"merit",
				"mine",
				"mourning",
				"nature",
				"need",
				"neighbour",
				"night",
				"nosebleed",
				"officer",
				"opposition",
				"ordinary",
				"organisation",
				"organize",
				"palace",
				"palm",
				"parachute",
				"patting",
				"penalty",
				"philosophy",
				"pray",
				"rabbit",
				"recommendation",
				"record",
				"reference",
				"rifle",
				"rock",
				"sanctuary",
				"service",
				"settlement",
				"shyness",
				"singer",
				"soar",
				"soprano",
				"spread",
				"suntan",
				"surround",
				"television",
				"terrify",
				"tourist",
				"training"
		};

		public HomeController(ILogger<HomeController> logger)
		{
			_logger = logger;
		}

		public IActionResult Index(HomeViewModel model)
		{
			List<string> list = _wordList.ToList(); // 100 words
			// Choose random word from list
			Random random = new Random();
			int randomIndex = random.Next(1,101);
			model.SecretWord = list[randomIndex - 1];
			return View(model);
		}

		[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
		public IActionResult Error()
		{
			return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
		}
	}
}
