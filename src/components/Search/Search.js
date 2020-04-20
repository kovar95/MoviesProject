import React, {Component} from 'react';
import './Search.scss';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/ActionCreators';
import uuid from 'react-uuid';


class Search extends Component {

	state = {
		searchedTerm : '',
		drop: false,
	}

	shouldComponentUpdate(nextProps, nextState) {
		const {filteredData, toWatchMovies} = this.props;
		const {searchedTerm, drop} = this.state;
		if (nextState.searchedTerm !== searchedTerm || 
			nextProps.filteredData.length !== filteredData.length || 
			nextProps.toWatchMovies.length !== toWatchMovies.length ||
			nextState.drop !== drop) 
		{
			return true
		}
		return false
	}

	componentDidUpdate(){
		const {searchedTerm} = this.state;
		this.dataSearch(searchedTerm);
	}

	dataSearch(text) {
		let myString = text.replace(/ /gi, "+");
	    this.props.onFilteredDataUpdate(myString);
	  }

	addValue(event) {
		this.setState({
			searchedTerm : event.target.value,
		})
	}

	render() {
		const {searchedTerm, drop} = this.state;
		const {filteredData, addToWatch} = this.props;

		return(
			<section  className="search" >
				<input type="text" 
					   autoComplete="off"
					   value={searchedTerm}
					   placeholder="Search" 
					   name="Search" 
					   onChange={ e => this.addValue(e)} 
					   onFocus={() => this.setState({ drop: true})}
					   onBlur={() => this.setState({ drop: false})}

				/>
				{(filteredData.length !== 0 && drop) && <div className="dropdown"> 
                  {filteredData.map( element => <div key={uuid()}>
								                 	<p>{element.Title.length > 40 ? element.Title.substring(0,35) + "..." : element.Title}</p><span onClick={() => addToWatch(element.imdbID) }>+</span>
							                  	</div>)}
								        </div>
				}
			</section>
		)
	}
}

const mapStateToProps = state => {
  return {
    filteredData : state.filteredData,
	toWatchMovies: state.toWatchMovies,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFilteredDataUpdate : filteredData => dispatch(actionCreators.getFilteredData(filteredData)),
    addToWatch : imdbID => dispatch(actionCreators.addToWatch(imdbID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);