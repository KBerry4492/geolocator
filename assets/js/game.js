console.log("new stuff 13");


firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // ...
  }else{
  	firebase.auth().signInWithRedirect(provider);
  }
  // The signed-in user info.
  playerLogin(result.user);
  debugger;
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});

function pokeFound(pokeInfo){
	pokeFoundInfo = pokeInfo;
	foundPokedex(pokeInfo);
	$("#pokedex-window").load("battle.html", function(){
		$("#battle").html("<img id ='pokemon-sprite' src='" + pokeInfo.sprite +"'>");
		console.log("sprite " + pokeInfo.sprite);
		$("#battle-footer").html("A wild" + pokeInfo.name + "has appeared! <button id='battle-catch'>Catch</button><button id='battle-run'>Run</button>");
		console.log("test2 " + pokeFoundInfo);
	});
	
	

	//foundPokedex(pokeInfo);
}

$("#map-button").on("click", function(){
	$("#pokedex-window").html("");
	$("#pokedex-window").load("map.html");
});

$("#pokeball-button").on("click", function(){
	$("#pokedex-window").html("");
	viewPokedex;
	//$("#pokedex-window").unload("map.html");
	viewPokedex();
});

$("#battle-ok").on("click", function(){
	
});

$(document).on("click", "#battle-run", function(){
	$("#battle-footer").html("Got away safely! <button id='battle-runok'>Ok</button>");
});

$(document).on("click", "#battle-runok" , function(){
	$("#pokedex-window").load("map.html");
});

$(document).on("click", "#battle-fled", function(){
	$("#pokedex-window").load("map.html");
});

$("#pokemon").on("click", function(){
	viewPokemon($("pokedex-id").value());

	$("#pokedex-sprite").attr("src", "")
	$("#poke-info").removeClass("hide");
})

$(document).on("click", "#battle-catch", function(){
	
	if(pokeFoundInfo.id < 130){
		var pokeCatchChance = Math.round(Math.random() * 10);
		var pokeCatchroll = Math.round(Math.random() * 10);
	}else{
		var pokeCatchChance = Math.round(Math.random() * 4);
		var pokeCatchroll = Math.round(Math.random() * 4);
	}

	if(pokeCatchroll === pokeCatchChance){
		$("#battle-footer").html(pokeFoundInfo.name + " was caught! <button id='view-pokemon'>Ok</button>");
		console.log("caught");
			caughtPokedex();

	}else{
		var pokeRunChance = Math.round(Math.random() * 10);
		var runState = false;
		console.log("not caught");
		if(pokeFoundInfo.id === 63){
			if(pokeRunChance !== "2" || pokeRunChance !== "7"){
				runState = true;
			}
		}else{
			var pokeRunRoll = Math.round(Math.random() * 5);

			if(pokeRunRoll === pokeRunChance){
				runState = true;
				console.log("ran");
			}
		}
		if(runState === true){
			$("#pokemon-sprite").addClass("run-away");
			$("#battle-footer").html(pokeFoundInfo.name + " has fled! <button id='battle-fled'>Ok</button>");
		}
	}

});

// $('.type-it').typeIt({
//   speed: 900,
//   lifeLike: false,
//   autoStart: true,
//   cursor: false
// })
// .tiType('A wild Pokemon has appeared')