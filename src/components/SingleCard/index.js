import './index.css'

const SingleMoviePage = props => {
  const { movieDetails,castDetails } = props;
  const {
    backdropPath,
    posterPath,
    title,
    releaseDate,
    voteAverage,
    genres,
    overview,
    runtime,
  } = movieDetails;  

  const {
    cast,crew
  } = castDetails
  console.log('cast details',castDetails)

 
  
  
  if (!backdropPath || !posterPath || !title || !releaseDate || !voteAverage || !genres||!overview) {
    return (
      <p>Loading please wait...</p>
    )
  }

  const imagePath = 'https://image.tmdb.org/t/p/original'
  const bgImage = `${imagePath}${backdropPath}`
  const posterImage = `${imagePath}${posterPath}`
  const year = new Date(releaseDate).getFullYear()
  const rating = voteAverage * 10
  const hrMin = `${Math.floor(runtime/60)}h${runtime%60}m`

  return (
    <div className="movie">
  <div className="movie-background" style={{backgroundImage: `url(${bgImage})`}}>
    <div className="movie-details">
      <div className="poster-div">
        <img src={posterImage} alt={title} className="poster-image"/>
      </div>
      <div className="details-div">
        <h1>{`${title}`}<span className="span-year">({year})</span>
        </h1>
        <div className='ul-movie'>
              <div className='gap'><span>{releaseDate} {genres.map(each => <span key={each.id}>{` ${each.name}`}</span>)}</span> <span>{hrMin}</span></div>
              <div className='gap'>
                <p className='overview-head'>Overview</p>
              </div>
              <div className='gap'><p className='overview-content'>{overview}</p></div>
        </div>
            
      </div>
    </div>
  </div>
</div>

  );
}

export default SingleMoviePage