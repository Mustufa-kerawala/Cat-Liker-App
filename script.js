// Using API_KEY from thecatapi.com for each request
const API_KEY = "live_RIyNRHXVcJekUvEzbcSSX7wYkJmCV3zhJb2ldwRDi7KYW5kQ5S7eFFMqdXUGaN0T";
const catURL = 'https://api.thecatapi.com/v1/images/search?limit=10&api_key=' + API_KEY;
const catUploadEndPoint = 'https://api.thecatapi.com/v1/images/upload?api_key=' + API_KEY;

document.addEventListener('DOMContentLoaded', function() {
	fetch(catURL)
	.then(response => response.json())
	.then(data => {
        // Adding h2 tag for new cats
        const newCatsh2 = document.createElement('h2');
        newCatsh2.innerHTML = 'New Cats';
        this.body.appendChild(newCatsh2);
		data.forEach(cat => {
			// Creating a card div for each cat
			const catDiv = document.createElement('div');
			catDiv.classList.add('card');
			this.body.appendChild(catDiv);
			// console.log(cat);
			// Creating an image element for each cat
			let catImage = document.createElement('img');
			catImage.src = cat.url;
			catImage.classList.add('card-img-top');
			catImage.style.width = '100%';
			catDiv.appendChild(catImage);
			// Creating a like button for each cat
			let likeButton = document.createElement('button');
			likeButton.classList.add('btn', 'like-button');
			likeButton.innerHTML = '&#9829;';
			catDiv.appendChild(likeButton);

			// Adding event listener to like button
			likeButton.addEventListener('click', function() {
				console.log('like button clicked');
				likeCat(cat);
				console.log(cat);
				console.log(cat.id);
			});
		});
		
	});

    // Creating a section for favorite cats
    const favoriteCats = document.createElement('section');
    favoriteCats.classList.add('favorite-cats');
    favoriteCats.style.backgroundColor = 'lightblue';
    favoriteCats.innerHTML = '<h2>Favorite Cats</h2>';
    this.body.appendChild(favoriteCats);



    // Adding favorite cats to the page
    fetch("https://api.thecatapi.com/v1/favourites?sub_id=my-user-1234", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
        }
    }).then(response => response.json())
    .then(data => {
        data.forEach(cat => {
            // console.log(cat);
            // Creating a card div for each cat
            const catDiv = document.createElement('div');
            catDiv.classList.add('card');
            // Creating an image element for each cat
            let catImage = document.createElement('img');
            catImage.src = cat.image.url;
            catImage.classList.add('card-img');
            catImage.style.width = '100%';
            catDiv.appendChild(catImage);
            favoriteCats.appendChild(catDiv);
            
            // Creating a DELETE button for each cat
            let deleteButton = document.createElement('button');
            deleteButton.classList.add('btn', 'delete-button');
            deleteButton.innerHTML = '&#9249;';
            catDiv.appendChild(deleteButton);

            // Adding event listener to delete button
            deleteButton.addEventListener('click', function(e) {
                console.log('delete button clicked');
                // https://api.thecatapi.com/v1/favourites/:favouriteId

                fetch("https://api.thecatapi.com/v1/favourites/" + cat.id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': API_KEY
                    }
                }).then(response => response.json())
                .then(data => {
                    console.log(data);
                    catDiv.remove();
                })
                .catch(error => {
                    console.log(JSON.stringify(error));
                });
            });
        });
    })    
});

// Adding a new cat to the page with a POST request on the upload endpoint
const uploadCat = document.querySelector('.upload');
// console.log(uploadCat);
uploadCat.addEventListener('submit', function(e) {
    e.preventDefault();
    // Getting inputs from the form
   const catData = e.target.querySelectorAll('input');
    const catName = catData[0].value;
    const catURL = catData[1].value;
    
    // Rendering the new cat on the page
    const catDiv = document.createElement('div');
    catDiv.classList.add('card');
    // Creating an image element for each cat
    let catImage = document.createElement('img');
    catImage.src = catURL;
    catImage.classList.add('card-img');
    catImage.style.width = '100%';
    catDiv.appendChild(catImage);
    document.body.appendChild(catDiv);

});



// function for sending POST to server after clicking like button
function likeCat(cat) {
	fetch("https://api.thecatapi.com/v1/favourites", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-api-key': API_KEY
		},
		body: JSON.stringify({
			"image_id": cat.id,
			"sub_id": "my-user-1234"
		})
	})
	.then(response => response.json())
	.then(data => {
		console.log(data);
	})
	.catch(error => {
		console.log(JSON.stringify(error));
	});
}

