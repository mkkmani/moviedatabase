import {Link} from 'react-router-dom'
import './index.css'

const PopularCard = props => {
  const {details} = props
  const {
    title,
    id,
    posterPath,
    releaseDate,
    voteAverage,
  } = details

  const formatDate = inputDate =>
    new Date(inputDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })

  const formattedDate = formatDate(releaseDate)

  return (
    <Link to={`/movie/${id}/${title}`} className="link-item">
      <div className="movie-card">
        <img
          src={`https://image.tmdb.org/t/p/original/${posterPath}`}
          alt={title}
          className="poster-img"
        />
        <div className="rating-div">
          <p className="rating-text">{`${Math.ceil(voteAverage * 10)}%`}</p>
        </div>
        <p className="popular-title">{title}</p>
        <p className="popular-date">{formattedDate}</p>
      </div>
    </Link>
  )
}

export default PopularCard
