import React, {Component} from 'react';
import './Fav.scss';
import trash1 from '../../images/trash1.png';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/ActionCreators';

class Fav extends Component{

	render() {
		const {title, genre, rating, uniqueId, element, imdbID} = this.props;
		const preview = "/" + imdbID;
		return (
			<div className="favy">
				<span>
					<strong>Title:</strong><br/> &rarr;  
					<Link to={preview}> 
						<span onClick={() => this.props.onMoreUpdate(uniqueId)}> {title}</span> 
					</Link>
				</span>
				<span>
					<strong>Genre:</strong><br/> &rarr; {genre} 
				</span>
				<span className="rating">{rating}</span>
				
				<div className="trash" onClick={() => this.props.onDelete(uniqueId)}>
					<img src={trash1} alt="trash"/>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
 return {}
}

const mapDispatchToProps = dispatch => {
  return {
    onMoreUpdate : uniqueId => dispatch(actionCreators.getMoreWatched(uniqueId)),
    onDelete : databaseID => dispatch(actionCreators.deleteWatchedMovie(databaseID)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Fav);