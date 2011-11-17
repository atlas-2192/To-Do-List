//var totalSpace = 900;
var totalSpace = 440;
var initialPosition = 0;
var playerNo = 0;

function playerGenerator(playerName) {
    return '<div class="playertasks" id="player' + playerNo+'"> <p class="playerName">' + playerName + '</p>  <button class="remove-player" val=' + playerNo +'>-</button>\
		<ul class="tasklist">\
			<input type="text" value="Add Task"></input><button class="add-task" id=playerNo>+</button>\
		</ul>\
	</div>\
	';
};

function blockGenerator() {
	return '\
	<div class="block">\
		<div class="block2" id="doodle" numTasks=0><img class="doodle-img" src="yguy_concerned.png"></div>\
	</div>';
	//<p style="border-bottom: 1px dotted #000000;">Start</p>\ This goes after block2
}

function taskGenerator(taskName, id) {
	var numTasks = parseInt($("#" + id).attr("numTasks"));
	$("#" + id).attr("numTasks", numTasks+1);

	return '<li> <input type="checkbox" name="tasks" value=' + taskName +' onclick="if(this.checked){animateDoodle(true, \'' + id + '\');} else {animateDoodle(false, \'' + id + '\');}"/> ' + taskName + '</li>';
}


function animateDoodle(toAdvance, id) {
	console.log("gothere");
	console.log("id"+id);
	console.log("toAdvance"+toAdvance);
	var numtasks = parseInt($("#" + id).attr("numTasks"));
	var advance = Math.ceil(totalSpace / numtasks); // round up
	if (toAdvance == true){
		$("#" + id).animate({"left": "+="  + advance + "px"}, "slow", "linear", 
			function() {
				// p is the distance traveled
            	var p = $("#" + id).position().left - initialPosition;
				console.log("p: "+p);
				console.log("totalSpace: "+totalSpace);
				console.log("advance: "+advance);
				if (p >= totalSpace) {
					// reached end of line
                	$("#"+id).find('img').attr("src", "yguy_happy.png")
              	}
				else if (p > totalSpace/2) {
					// reached half way
                	$("#"+id).find('img').attr("src", "yguy_hopeful.png")
               	}
			});
	}
	else {
		$("#" + id).animate({"left": "-="  + advance + "px"}, "slow", "linear", 
			function() {
				// p is the distance traveled
            	var p = $("#" + id).position().left - initialPosition;
				if (p <= totalSpace/2){
					// reached end of line
              		$("#"+id).find('img').attr("src","yguy_concerned.png");
                }
          		else if (p < totalSpace) {
					// reached half way
          			$("#"+id).find('img').attr("src","yguy_hopeful.png");
           		}
   			});
	}
}

$(".add-player").live('click', function(event) {
	// grab the first visible input following the add-task button
	var player2Add = $("#addPlayerTxtBox").val();
	console.log("player2Add value: "+ player2Add);
    	$("#player").append(playerGenerator(player2Add));
	// clear input value
	$("#addPlayerTxtBox").val("Add Player");
	// load a block
	$("#right-column").append(blockGenerator());
	$("#playerNo").attr("id", playerNo);
	$("#doodle").attr("id", "doodle" + playerNo);
	playerNo++;
    return false;
});

$(".remove-player").live('click', function(event) {
	var player = $(this).attr("val");
	$("#player" + player).remove();
	$("#doodle" + player).remove();
    return false;
});

$(".add-task").live('click', function(event) {
	// grab the first visible input before the add-task button
	var task2Add = $(this).prev().val();
	console.log("task2Add value: "+ task2Add);
	// append task to the parent
	var currentId = $(this).attr('id');
	$(this).parent().append(taskGenerator(task2Add, "doodle" + currentId));
	// clear input value
	$(this).next().val("Add Task");
    return false;
});
