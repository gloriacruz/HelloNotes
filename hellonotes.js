$(document).ready(function() {

	tableau.extensions.initializeAsync().then(function() {

		// Display the name of dashboard in the UI
		var dashboard = tableau.extensions.dashboardContent.dashboard;
		// $("#resultBox").html("Note for <strong>" + dashboard.name + "</strong>");
		
		var settings = tableau.extensions.settings;
		if( settings.get('sheet') ){
			$("#comment").html(settings.get('note'));
			if(settings.get('color') == "yellow") {
				document.getElementById("paper").classList.add("yellow-note");
				document.getElementById("head").classList.add("yellow-head");
			} else if(settings.get('color') == "pink") {
				document.getElementById("paper").classList.add("pink-note");
				document.getElementById("head").classList.add("pink-head");
			}
			$("#saveButton").prop('disabled', true);
		} else {
			showChooseColorDialog();
		}
	}, function(err) {
		// Something went wrong in initialization
		$("#resultBox").html("Error while Initializing: " + err.toString());
	});
		
	function showChooseColorDialog () {
		// Clear out the existing list of sheets
		$("#choose_color_buttons").empty();
		
		const buttonW = $("<button type='button' class='btn btn-default btn-block'></button>"); buttonW.text("White");
		const buttonY = $("<button type='button' class='btn btn-default btn-block'></button>"); buttonY.text("Yellow");
		const buttonP = $("<button type='button' class='btn btn-default btn-block'></button>"); buttonP.text("Pink");

		// Create event handlers for when these buttons are clicked
		buttonW.click(function () {	
			$("#choose_color_dialog").modal("toggle");
		});
		buttonY.click(function () {
			document.getElementById("paper").classList.add("yellow-note");
			document.getElementById("head").classList.add("yellow-head");
			$("#choose_color_dialog").modal("toggle");
		});
		buttonP.click(function () {
			document.getElementById("paper").classList.add("pink-note");
			document.getElementById("head").classList.add("pink-head");
			$("#choose_color_dialog").modal("toggle");
		});

		// Add our buttons
		$("#choose_color_buttons").append(buttonW);
		$("#choose_color_buttons").append(buttonY);
		$("#choose_color_buttons").append(buttonP);

		// Show the dialog
		$("#choose_color_dialog").modal("toggle");
	};
  
	$("#saveButton").click(function() {
		var dashboard = tableau.extensions.dashboardContent.dashboard;
		var settings = tableau.extensions.settings;
		settings.set('sheet', dashboard.name);
		settings.set('note', document.getElementById("comment").innerHTML);
		
		var paperClass = document.getElementById("paper").className;
		if( paperClass.includes("yellow" ) ) {
			settings.set("color", "yellow");
		} else if( paperClass.includes("pink") ) {
			settings.set("color", "pink");
		} else {
			settings.set("color", "white");
		}
		settings.saveAsync().then(results => {
			$("#saveButton").prop('disabled', true);
		}).catch((err) => {
			$("#resultBox").html("Error while Saving: " + err.toString());
		});
	});
	
	$("#comment").click(function() {
		if( document.getElementById("comment").innerHTML == "Start typing here!" ) {
			$("#comment").html("");
		}
	});
	
	$("#comment").on("input", function() {
		$("#saveButton").prop('disabled', false);
	});
});