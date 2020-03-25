import React, {Component} from 'react';
import './Watched.scss';
import Fav from '../Fav/Fav';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/ActionCreators';

class Watched extends Component{

	componentDidMount() {
		this.props.onLoad();
	}


	render() {
		const {movies} = this.props;
		return (
			<div className="watched">
			<h3>Watched movies</h3>
			{movies.map( element => <Fav 
										key={element.id}
										uniqueId={element.id}
										title={element.Title}
										rating={element.imdbRating}
										genre={element.Genre}
										element={element}
										imdbID={element.imdbID}
									  />
						)
			}
			</div>		
		)
	}
}

const mapStateToProps = state => {
  return {
    watchedMovies: state.watchedMovies,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad : () => dispatch(actionCreators.onWatchedLoad())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Watched);