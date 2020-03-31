import React, {Component} from 'react';
import './Preview.scss';
import {Link} from 'react-router-dom';

class Preview extends Component{

	render() {
		const {actors, director, plot, genre, poster, released, runtime, title, rating} = this.props;
		
		return (
			<div className="show">
				<section className="preview">
					<p>Movie preview</p>

					<div className="pics">
						<img src={poster} alt="poster"/>
					</div>

					<div className="info">
						<span className="first">
							<strong>Title:</strong> {title}
						</span>
						<span>
							<strong>Released date:</strong> {released}
						</span>
						<span>
							<strong>Runtime:</strong> {runtime}
						</span>
						<span>
							<strong>Genre:</strong> {genre} 
						</span>
						<span>
							<strong>Director:</strong> {director} 
						</span>
						<span>
							<strong>Actors:</strong> {actors} 
						</span>
						<span>
							<strong>Plot:</strong> {plot} 
						</span>

						<span className="rating">{rating}</span>

					</div>

					<Link to="/">
						<button>X</button>
					</Link>
				</section>
			</div>
		)
	}
}

export {Preview};