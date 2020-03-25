import * as actionTypes from './ActionTypes';
import {Communicators} from '../Communicators';
import axios from 'axios';

const formatData = myData => {
	const data = [];
	for(const property in myData) {
		data.push({
			...myData[property],
			id: property,
		});
	}

	return data
}

const sortMovies = (a, b) =>{
    const orderA = a.order;
    const orderB = b.order;

    let comparison = 0;
    if (orderA > orderB) {
      comparison = 1;
    } else if (orderA < orderB) {
      comparison = -1;
    }

    return comparison;
  }

const updateMore = more => {
	return {
		type: actionTypes.MORE_UPDATE,
		more: more
	}
}

export const updateFilteredData = filteredData => {
	return {
		type: actionTypes.FILTER_DATA_UPDATE,
		filteredData: filteredData
	}
}

const updateToWatchData = toWatchData => {
	console.log(toWatchData);
	return {
		type: actionTypes.TO_WATCH_UPDATE,
		toWatchMovies: toWatchData
	}
}

const updateWatchedData = watchedData => {
	console.log(watchedData);
	return {
		type: actionTypes.WATCHED_UPDATE,
		watchedMovies: watchedData
	}
}

export const getFilteredData = searchedTerm => {
	return dispatch => {
		fetch(`https://www.omdbapi.com/?type=movie&apikey=2d2c144c&s=${searchedTerm}`)
	  	.then( response => response.json())
	    .then( myJson =>  {
	        if (myJson.Response === "True") {
	        	dispatch(updateFilteredData(myJson.Search));
	        	console.log(myJson);
	        } else {
	        	dispatch(updateFilteredData([]));
	        }
	      })
	    .catch( error => alert(`Error: ${error}`));
	}
}

export const addToWatch = imdbID => {
	return (dispatch, getState) => {
		fetch(`https://www.omdbapi.com/?type=movie&apikey=2d2c144c&i=${imdbID}`)
	  	.then( response => response.json())
	    .then( myJson =>  {
	    	const filteredArray = getState().toWatchMovies.filter( item => item.imdbID === imdbID);
	    	if (!filteredArray.length) {
	    		let order = getState().toWatchMovies[getState().toWatchMovies.length -1].order + 1;
	    		myJson.order = order;
	    		Communicators.Post(myJson)
		        .then( response => {
		      		if (response.ok) {
				        Communicators.Fetch()
				        .then( response => {
				        	const formatedData = formatData(response).sort(sortMovies);
				        	dispatch(updateToWatchData(formatedData));
				        })
				        .catch( error => alert(`Error: ${error}`));
				    }
				})
				.catch( error => alert(`Error: ${error}`));
	    	}   
	    })
	    .catch( error => alert(`Error: ${error}`));
	}
}

export const addToWatched = element => {
	return (dispatch, getState) => {
    	Communicators.Delete(element.id)
        .then( response => {
      		if (response.ok) {
      			Communicators.Fetch()
		        .then( response => {
		        	const formatedData = formatData(response);
		        	dispatch(updateToWatchData(formatedData));
		        })
		        .catch( error => alert(`Error: ${error}`));
	    		Communicators.PostWatched(element)
		        .then( response => {
		      		if (response.ok) {
				        Communicators.FetchWatched()
				        .then( response => {
				        	const formatedData = formatData(response);
				        	dispatch(updateWatchedData(formatedData));
				        })
				        .catch( error => alert(`Error: ${error}`));
				    }
				})
				.catch( error => alert(`Error: ${error}`));
    		}   
		})
		.catch( error => alert(`Error: ${error}`));
	}
}

export const deleteMovie = databaseID => {
	return dispatch => {
        Communicators.Delete(databaseID)
        .then( response => {
      		if (response.ok) {
		        Communicators.Fetch()
		        .then( response => {
		        	const formatedData = formatData(response).sort(sortMovies);
		        	dispatch(updateToWatchData(formatedData));
		        })
		        .catch( error => alert(`Error: ${error}`));
		    }
		})
		.catch( error => alert(`Error: ${error}`));
	}
}

export const deleteWatchedMovie = databaseID => {
	return dispatch => {
        Communicators.DeleteWatched(databaseID)
        .then( response => {
      		if (response.ok) {
		        Communicators.FetchWatched()
		        .then( response => {
		        	const formatedData = formatData(response);
		        	dispatch(updateWatchedData(formatedData));
		        })
		        .catch( error => alert(`Error: ${error}`));
		    }
		})
		.catch( error => alert(`Error: ${error}`));
	}
}

export const onLoad = () => {
	return dispatch => {
		Communicators.Fetch()
	    .then( response => {
	    	const formatedData = formatData(response).sort(sortMovies);
	    	dispatch(updateToWatchData(formatedData));
	    })
	    .catch( error => alert(`Error: ${error}`));
	}
}

export const onWatchedLoad = () => {
	return dispatch => {
		Communicators.FetchWatched()
	    .then( response => {
	    	const formatedData = formatData(response);
	    	dispatch(updateWatchedData(formatedData));
	    })
	    .catch( error => alert(`Error: ${error}`));
	}
}


export const getMore = databaseID => {
	return dispatch => {
		Communicators.More(databaseID)
	    .then( myJson => dispatch(updateMore(myJson)))
	    .catch( error => alert(`Error: ${error}`));
	}
}

export const getMoreWatched = databaseID => {
	return dispatch => {
		Communicators.MoreWatched(databaseID)
	    .then( myJson => dispatch(updateMore(myJson)))
	    .catch( error => alert(`Error: ${error}`));
	}
}

export const selectGenre = genre => {
	return (dispatch, getState) => {
		const filteredArray = getState().toWatchMovies.filter( item => item.Genre.includes(genre));
		dispatch(updateToWatchData(filteredArray));
	}
}

export const moveUp = order => {
	return (dispatch, getState) => {
		const firstIndex = getState().toWatchMovies.findIndex(element => element.order === order);
		if (firstIndex) {
			const firstElement = getState().toWatchMovies[firstIndex];
			const secondElement = getState().toWatchMovies[firstIndex - 1];
			const newOrder = secondElement.order;
			firstElement.order = newOrder;
			secondElement.order = order;
			Communicators.Put(firstElement)
			.then( response => {
				if (response.ok) {
					Communicators.Put(secondElement)
					.then( response =>{
						if(response.ok) {
							Communicators.Fetch()
							.then( response => {
								const formatedData = formatData(response).sort(sortMovies);
					        	console.log(formatedData);
					        	dispatch(updateToWatchData(formatedData));
							})
							.catch( error => alert(`Error: ${error}`));
						}
					})
					.catch( error => alert(`Error: ${error}`));	
				}
			})
			.catch( error => alert(`Error: ${error}`));
		}
	}
}


export const moveDown = order => {
	return (dispatch, getState) => {
		const firstIndex = getState().toWatchMovies.findIndex(element => element.order === order);
		if (firstIndex !== getState().toWatchMovies.length - 1) {
			const firstElement = getState().toWatchMovies[firstIndex];
			const secondElement = getState().toWatchMovies[firstIndex + 1];
			const newOrder = secondElement.order;
			firstElement.order = newOrder;
			secondElement.order = order;
			Communicators.Put(firstElement)
			.then( response => {
				if (response.ok) {
					Communicators.Put(secondElement)
					.then( response =>{
						if(response.ok) {
							Communicators.Fetch()
							.then( response => {
								const formatedData = formatData(response).sort(sortMovies);
					        	console.log(formatedData);
					        	dispatch(updateToWatchData(formatedData));
							})
							.catch( error => alert(`Error: ${error}`));
						}
					})	
					.catch( error => alert(`Error: ${error}`));
				}
			})
			.catch( error => alert(`Error: ${error}`));
		}
	}
}