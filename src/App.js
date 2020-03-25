import React, {Fragment} from 'react';
import './App.scss';
import {Cards} from './components/Cards/Cards';
import {Preview} from './components/Preview/Preview';
import {Header} from './components/Header/Header';
import Watched from './components/Watched/Watched';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreators from './store/ActionCreators';
import reset from './images/reset.png';

class App extends React.Component {

  componentDidMount(){
    this.props.onLoad(); 
  }

  render() {
    const {filteredData, more, favouritesData, toWatchMovies, watchedMovies, onLoad} = this.props;
    const {Actors, Director, Plot, Genre, Poster, Released, Runtime, Title, imdbRating, imdbID} = this.props.more;
    const preview = "/" + imdbID;
    
    return (

        <Fragment>
          <Switch>
            <Route exact path="/" >
                <Header />

                <Cards movies={toWatchMovies} />

                <Watched movies={watchedMovies} />

                <div className="reset">
                  Reset filters
                  <img src={reset} alt="reset" onClick={() => onLoad()} />
                </div>

            </Route>

            <Route exact path={preview} >
                {more && <Preview title={Title}
                                  released={Released}
                                  runtime={Runtime}
                                  genre={Genre}
                                  director={Director}
                                  actors={Actors}
                                  plot={Plot}
                                  rating={imdbRating}
                                  poster={Poster}
                         /> 
                }
            </Route>
          </Switch> 
        </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    filteredData : state.filteredData,
    more: state.more,
    toWatchMovies: state.toWatchMovies,
    watchedMovies: state.watchedMovies,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFilteredDataUpdate : filteredData => dispatch(actionCreators.updateFilteredData(filteredData)),
    onLoad : () => dispatch(actionCreators.onLoad())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
