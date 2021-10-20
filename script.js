let AddMovies = [];


// Populer Movies


fetch("https://movies-tvshows-data-imdb.p.rapidapi.com/?type=get-popular-movies&page=1&year=2020&limit=5", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com",
		"x-rapidapi-key": "7e4abb04b9mshdfad29b677ede92p108788jsn95db211f3c53"
	}
})

.then(function(serverPromise){
	 serverPromise.json()
	 .then(function(j) {
	  console.log(j.movie_results);
		for (i in j.movie_results){

			sleep(300);

			let id = j.movie_results[i].imdb_id;
			let divMoviesDetails = document.getElementById("grid");
			let inerdiv = document.createElement("div");
			inerdiv.classList = "col-lg-3 col-sm-8 m-2"
			let h3_div = document.createElement("h3");
			let h5_div = document.createElement("h5");
			h3_div.innerText = j.movie_results[i].title;
			h5_div.innerText = j.movie_results[i].year;
			let cardBody = document.createElement("div");
			let buttonMore = document.createElement("button");
			let textinerButton = document.createTextNode("Add to My List");

			 
			
			
			fetch(`https://movies-tvshows-data-imdb.p.rapidapi.com/?type=get-movies-images-by-imdb&imdb=${id}`, {
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com",
					"x-rapidapi-key": "7e4abb04b9mshdfad29b677ede92p108788jsn95db211f3c53"
				}
			})
			.then(function(serverPromise){
				serverPromise.json()
				 .then(function(x) {
				  console.log(x.poster);
				  let images = document.createElement("img");
				  images.src = x.poster;
				  inerdiv.appendChild(images);
				  images.classList.add("card-img-top");

				  inerdiv.classList.add("card");
				  cardBody.classList = "card-body text-center";
				  h3_div.classList.add("card-title");
				  h5_div.classList.add("card-text");
				  buttonMore.classList= "btn btn-outline-dark";
				  buttonMore.appendChild(textinerButton);

				  cardBody.appendChild(h3_div);
				  cardBody.appendChild(h5_div);
				  cardBody.appendChild(buttonMore);
				  inerdiv.appendChild(cardBody);
				  divMoviesDetails.appendChild(inerdiv);
				  

					// add to list

				  buttonMore.addEventListener("click",function(){
					let isAlreadyInList = false;
					let myListArray = JSON.parse( localStorage.getItem("fovarite") ) || {};
					for (let index = 0; index < myListArray.length; index++) {
						if ( myListArray[index] && myListArray[index].title === h3_div.innerText ){
							isAlreadyInList = true;
							alert ("Sorry!! The Movie Already In list ..")
						}        
					}
					
				
					if ( !isAlreadyInList ){
					let Fovarite = {};
					Fovarite["title"]=h3_div.innerText;
					Fovarite["img"]= x.poster;
					AddMovies.push(Fovarite);
					savelist()
					alert ("Added Sucessfully ..")
					}
				
					})

					function savelist (){
					localStorage.setItem('fovarite',JSON.stringify(AddMovies));
					}

					function getlist (){
					AddMovies=JSON.parse(localStorage.getItem('fovarite'));
					}

				if(localStorage.getItem("fovarite")!=null){
					getlist();
				}

				})


				 .catch(function(n){
				  console.log(n);
				 });
			   })
			   .catch(function(n){
				 console.log(n);
				});
		}

         })
	 .catch(function(e){
	  console.log(e);
	 });
   })
   .catch(function(e){
	 console.log(e);
	});


function sleep(delay){
	var start = new Date().getTime();
	while ( new Date().getTime() < start + delay);
};




// search by title


function search (){
	let input = document.getElementById("search_input").value;

fetch("https://movies-tvshows-data-imdb.p.rapidapi.com/?type=get-movies-by-title&title="+`${input}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com",
		"x-rapidapi-key": "7e4abb04b9mshdfad29b677ede92p108788jsn95db211f3c53"
	}
})
	
.then((res) => res.json())
.then(function (json){
	console.log(json.movie_results)
	let display = document.getElementById("grid");
	display.remove() 
	
	 for (t in json.movie_results){

		sleep(300);

		let image1 = document.createElement("img");
		image1.classList.add("card-img-top");

		fetch(`https://movies-tvshows-data-imdb.p.rapidapi.com/?type=get-movies-images-by-imdb&imdb=${json.movie_results[t].imdb_id}`, {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com",
				"x-rapidapi-key": "7e4abb04b9mshdfad29b677ede92p108788jsn95db211f3c53"
			}
		})
			
		.then((res) => res.json())
		.then(function (json){
			
		image1.src = json.poster;
		})
		.catch(function (err){})
		
		let showSaerch = document.createElement("div");
		showSaerch.classList = "card col-lg-3 col-sm-8 m-2";
		let searchCardBody = document.createElement("div");
		searchCardBody.classList = "card-body text-center"
		let titleDiv = document.createElement("h3");
		let yearDiv = document.createElement("h5");
		let addToFavoriteButton = document.createElement("button");
		addToFavoriteButton.classList = "btn btn-outline-dark"
		addToFavoriteButton.innerText = "Add to list";

		addToFavoriteButton.addEventListener("click",function(){
			let isAlreadyInList = false;
			let myListArray = JSON.parse( localStorage.getItem("fovarite") ) || {};
			for (let index = 0; index < myListArray.length; index++) {
				if ( myListArray[index] && myListArray[index].title === titleDiv.innerText ){
					isAlreadyInList = true;
					alert ("Sorry!! The Movie Already In list ..")
				}        
			}
			
		
			if ( !isAlreadyInList ){
			let Fovarite = {};
			Fovarite["title"]=titleDiv.innerText;
			Fovarite["img"]= image1.src;
			AddMovies.push(Fovarite);
			savelist()
			alert ("Added Sucessfully ..")
			}
		
			})

			function savelist (){
			localStorage.setItem('fovarite',JSON.stringify(AddMovies));
			}

			function getlist (){
			AddMovies=JSON.parse(localStorage.getItem('fovarite'));
			}

		if(localStorage.getItem("fovarite")!=null){
			getlist();
		}


		titleDiv.innerText = json.movie_results[t].title;
		yearDiv.innerText = json.movie_results[t].year;
		
		searchCardBody.appendChild(image1);
		searchCardBody.appendChild(titleDiv);
		searchCardBody.appendChild(yearDiv);
		searchCardBody.appendChild(addToFavoriteButton);
		showSaerch.appendChild(searchCardBody)
		document.getElementById("displaySearch").appendChild(showSaerch);
		
		let input = document.getElementById("search_input").value;

	     }

})
   .catch(function(z){
	 console.log(z);
	});

	

function sleep(delay){
	var start = new Date().getTime();
	while ( new Date().getTime() < start + delay);

}};


// Show list


function showList (){

	let divMoviesList = document.getElementById("showList");
	let moviesStorage = JSON.parse( localStorage.getItem("fovarite"));

	for (let index = 0; index < moviesStorage.length; index++) {
		
		let card = document.createElement("div");
		let h3_div = document.createElement("h3");
		let imagee = document.createElement("img");
		let cardBody = document.createElement("div");
	
		card.classList= "card col-lg-3 col-sm-8 m-2"
		cardBody.classList.add("card-body","text-center");
		h3_div.classList.add("card-title");
		imagee.classList.add("card-img-top");
	
		imagee.src= moviesStorage[index].img;
		h3_div.innerText=moviesStorage[index].title;

		cardBody.appendChild(h3_div);
		card.appendChild(imagee);
		card.appendChild(cardBody);
		divMoviesList.appendChild(card);

	}
	
};


