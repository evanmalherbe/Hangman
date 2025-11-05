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
				"bin",
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
				"help",
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
				"lid",
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
				"nose",
				"officer",
				"opposition",
				"ordinary",
				"organisation",
				"organize",
				"palace",
				"palm",
				"parachute",
				"pat",
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
				"shy",
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
			Random random = new Random();
			int randomIndex = random.Next(100);
			model.SecretWord = list[randomIndex - 1];

			return View(model);
		}

		public IActionResult Privacy()
		{
			return View();
		}

		[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
		public IActionResult Error()
		{
			return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
		}
	}
}
