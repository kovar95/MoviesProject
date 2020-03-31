import React, {Fragment} from 'react';
import './App.scss';
import Cards from './components/Cards/Cards';
import {Preview} from './components/Preview/Preview';
import {Header} from './components/Header/Header';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreators from './store/ActionCreators';
import reset from './images/reset.png';

class App extends React.Component {

  componentDidMount(){
    this.props.onLoad(); 
  }

  componentDidUpdate() {
    if (window.location.pathname !== '/') {
      this.props.onMoreUpdate(window.location.pathname.substr(1));
    }
  }

  render() {
    const {more, toWatchMovies, watchedMovies, genreFilteredMovies, genres, filterGenre, updateGenreFilteredData} = this.props;
    const {Actors, Director, Plot, Genre, Poster, Released, Runtime, Title, imdbRating} = more;

    return (

        <Fragment>
          <Switch>
            <Route exact path="/" >
                <Header />

              { !toWatchMovies.length && <h1 className="nodata"> Search for your favourite movies</h1>}

              { !!toWatchMovies.length &&
                <Fragment>
                  <Cards movies={genreFilteredMovies} /> 

                  <Cards watched movies={watchedMovies} /> 

                  <div className="reset">
                    <img src={reset} alt="reset" onClick={() => updateGenreFilteredData(toWatchMovies)} />
                  </div>

                  <div className="filter"> 
                    Select genre
                    <ul>
                    {genres.map( element => <li key={element} onClick={() => filterGenre(element) }>{element}</li>)}
                    </ul>
                  </div>

                </Fragment>
              }

            </Route>

            <Route exact path={window.location.pathnamet} >

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
    more: state.more,
    toWatchMovies: state.toWatchMovies,
    watchedMovies: state.watchedMovies,
    genreFilteredMovies : state.genreFilteredMovies,
    genres : state.genres,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFilteredDataUpdate : filteredData => dispatch(actionCreators.updateFilteredData(filteredData)),
    onLoad : () => dispatch(actionCreators.onLoad()),
    onMoreUpdate : uniqueId => dispatch(actionCreators.getMore(uniqueId)),
    filterGenre: myGenre => dispatch(actionCreators.filterGenre(myGenre)),
    updateGenreFilteredData : myData => dispatch(actionCreators.updateGenreFilteredData(myData)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
