import React, {Component} from 'react';
import './Card.scss';
import moreDet from '../../images/info.png';
import favourites from '../../images/favourites.png';
import eye from '../../images/eye.png';
import trash from '../../images/trash.png';
import up from '../../images/up.png';
import down from '../../images/down.png';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/ActionCreators';

class Card extends Component{

	render() {
		const {title, genre, rating, uniqueId, element, imdbID, order} = this.props;
		const preview = "/" + imdbID;
		const genres = genre.split(', ');
		return (
			<div className="card">
				
				<span>
					<strong>Title:</strong><br/> &rarr; 
					<Link to={preview}> 
						<span onClick={() => this.props.onMoreUpdate(uniqueId)}> {title}</span> 
					</Link>
				</span>
				
				<span>
					<strong>Genre:</strong><br/>
					{genres.map( element => <span key={element} onClick={() => this.props.selectGenre(element)}>&rarr;{element} </span>)} 
				</span>

				<span className="rating">{rating}</span>

				<div className="eye" onClick={() => this.props.updateWatchedMovies(element)}>
					<img src={eye} alt="eye"/>
				</div>
				<div className="trash" onClick={() => this.props.deleteMovie(uniqueId)}>
					<img src={trash} alt="trash"/>
				</div>
				<div className="arrows" >
					<img src={up} alt="arrowUp" onClick={() => this.props.moveUp(order)}/>
					<img src={down} alt="arrowDown" onClick={() => this.props.moveDown(order)}/>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
 return {
 	filteredData : state.filteredData,
 }
}

const mapDispatchToProps = dispatch => {
  return {
    onMoreUpdate : uniqueId => dispatch(actionCreators.getMore(uniqueId)),
    deleteMovie : uniqueId => dispatch(actionCreators.deleteMovie(uniqueId)),
    updateWatchedMovies: element => dispatch(actionCreators.addToWatched(element)),
    selectGenre: genre => dispatch(actionCreators.selectGenre(genre)),
    moveUp : order => dispatch(actionCreators.moveUp(order)),
    moveDown : order => dispatch(actionCreators.moveDown(order)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);