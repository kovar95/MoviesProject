import React, {Component} from 'react';
import './Card.scss';
import eye from '../../images/eye.png';
import trash from '../../images/trash.png';
import trash1 from '../../images/trash1.png';
import up from '../../images/up.png';
import down from '../../images/down.png';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/ActionCreators';

class Card extends Component{

	render() {
		const {title, genre, rating, uniqueId, element, order, watched, image} = this.props;
		const {onMoreUpdate, filterGenre, onDelete, deleteMovie, moveUp, moveDown, updateWatchedMovies} = this.props;
		const preview = "/" + uniqueId;
		const genres = genre.split(', ');

		return (
			<div className="card">
				
				<span>
					<Link to={preview}> 
						<span onClick={() => onMoreUpdate(uniqueId)}> {title}</span> 
					</Link>
				</span>
				
				<span className="genres">
					{genres.map( element => <span key={element} onClick={!watched ? () => filterGenre(element) : null}>{element}</span>)} 
				</span>

				<span className="rating">{rating}</span>

				{!watched && <div className="eye" onClick={() => updateWatchedMovies(element)}>
								<img src={eye} alt="eye"/>
							</div>
				}
				<div className={ watched ? "trash1" : "trash"} onClick={ watched? () => onDelete(uniqueId) : () => deleteMovie(uniqueId)}>
					<img src={watched ? trash1 : trash} alt="trash"/>
				</div>
				{!watched && <div className="arrows" >
								<img src={up} alt="arrowUp" onClick={() => moveUp(order)}/>
								<img src={down} alt="arrowDown" onClick={() => moveDown(order)}/>
							</div>
				}
				<img src={image} alt="img" className="background" />
			</div>
		)
	}
}

const mapStateToProps = state => {
 return {}
}

const mapDispatchToProps = dispatch => {
  return {
    onMoreUpdate : uniqueId => dispatch(actionCreators.getMore(uniqueId)),
    deleteMovie : uniqueId => dispatch(actionCreators.deleteMovie(uniqueId)),
    onDelete : databaseID => dispatch(actionCreators.deleteWatchedMovie(databaseID)),
    updateWatchedMovies: element => dispatch(actionCreators.addToWatched(element)),
    filterGenre: genre => dispatch(actionCreators.filterGenre(genre)),
    moveUp : order => dispatch(actionCreators.moveUp(order)),
    moveDown : order => dispatch(actionCreators.moveDown(order)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);