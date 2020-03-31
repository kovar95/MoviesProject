import React, {Component} from 'react';
import './Cards.scss';
import Card from '../Card/Card';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/ActionCreators';

class Cards extends Component{

	componentDidMount() {
		const {watched, onLoad} = this.props;
		watched && onLoad();
	}


	render() {
		const {movies, watched} = this.props;
		
		return (
			<div className="cards">
				<h1>{watched ? "Watched movies" : "Movies to watch"}</h1>
				{movies.map( element => <Card 
											watched={watched}
											key={element.id}
											uniqueId={element.id}
											title={element.Title}
											rating={element.imdbRating}
											genre={element.Genre}
											element={element}
											imdbID={element.imdbID}
											order={element.order}
											image={element.Poster}
										  />
							)
				}
			</div>
		)
	}
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad : () => dispatch(actionCreators.onWatchedLoad())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);