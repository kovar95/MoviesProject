import React, {Component} from 'react';
import './Cards.scss';
import Card from '../Card/Card';

class Cards extends Component{

	render() {
		const {movies} = this.props;
		return (
			<div className="cards">
			<h1>Movies to watch</h1>
			{movies.map( element => <Card 
										key={element.id}
										uniqueId={element.id}
										title={element.Title}
										rating={element.imdbRating}
										genre={element.Genre}
										element={element}
										imdbID={element.imdbID}
										order={element.order}
									  />
						)
			}
			</div>
		)
	}
}

export {Cards};