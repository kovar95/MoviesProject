
class Communicators {

	static baseURL = 'https://movies-22220.firebaseio.com/movies';
	static watchedURL = 'https://movies-22220.firebaseio.com/watched';
	static omdbURL = 'https://www.omdbapi.com/?type=movie&apikey=2d2c144c';

	static Fetch = () => {
		return fetch(`${Communicators.baseURL}.json`)
	  		   .then( response => response.json())
	}

	static FetchWatched = () => {
		return fetch(`${Communicators.watchedURL}.json`)
	  		   .then( response => response.json())
	}

	static Put = (element) => {
		return fetch(`${Communicators.baseURL}/${element.id}.json`, {
			      method: 'PUT',
			      body: JSON.stringify(element)
		        })
	}

	static Post = (element) => {
		return fetch(`${Communicators.baseURL}.json`, {
			      method: 'POST',
			      body: JSON.stringify(element)
		        })
	}

	static PostWatched = (element) => {
		return fetch(`${Communicators.watchedURL}.json`, {
			      method: 'POST',
			      body: JSON.stringify(element)
		        })
	}

	static Delete = (elementID) => {
		return fetch(`${Communicators.baseURL}/${elementID}.json`, {
			      method: 'DELETE',
		        })
	}

	static DeleteWatched = (elementID) => {
		return fetch(`${Communicators.watchedURL}/${elementID}.json`, {
			      method: 'DELETE',
		        })
	}

	static More = (databaseID) => {
		return fetch(`${Communicators.baseURL}/${databaseID}.json`)
	  		   .then( response => response.json())
	}

	static MoreWatched = (databaseID) => {
		return fetch(`${Communicators.watchedURL}/${databaseID}.json`)
	  		   .then( response => response.json())
	}
}

export { Communicators };