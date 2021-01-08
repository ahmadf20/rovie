import React from "react";
import './style/app.css';
import SearchMovies from "./SearchMovies";

class MyApp extends React.Component {  
  render() {
    return (
      <div className="container">

        <div className="content">
          <div className="title">Rovie</div>
          <p className="subtitle">React Movie App</p>
          <p style={{ textAlign: 'center', fontSize: '0.9rem' }}>API by: www.themoviedb.org</p>
          <SearchMovies />
        </div>

      </div>
    );
  }
}

export default MyApp