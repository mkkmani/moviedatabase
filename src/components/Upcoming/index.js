import {Component} from 'react'
import { Rings } from 'react-loader-spinner'
import {AiOutlineRight,AiOutlineLeft} from 'react-icons/ai'
import PopularCard from '../PopularCard'


const apiStatusList = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UpcomingRoute extends Component {
  state = {
    apiStatus: 'init',
    upcomingData: [],
    currentPage: 1,
  }

  componentDidMount() {
    this.getUpcoming()
  }

  getUpcoming = async () => {
    this.setState({apiStatus: apiStatusList.loading})
    const {currentPage} = this.state
    const apiKey = 'e9ec2ea7225ad8a96148d8b293353054'
    const api = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${currentPage}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(api, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = data.results.map(each => ({
        adult: each.adult,
        backdropPath: each.backdrop_path,
        genreIDs: each.genre_ids,
        id: each.id,
        originalLanguage: each.original_language,
        originalTitle: each.original_title,
        overview: each.overview,
        popularity: each.popularity,
        posterPath: each.poster_path,
        releaseDate: each.release_date,
        title: each.title,
        video: each.video,
        voteAverage: each.vote_average,
        voteCount: each.vote_count,
      }))

      this.setState({
        upcomingData: updatedData,
        apiStatus: apiStatusList.success,
      })
    } else {
      this.setState({apiStatus: apiStatusList.failure})
    }
  }

  renderPagination = () => {
    const { currentPage,upcomingData } = this.state
    
    const onClickLeft = () => {
      if (currentPage > 1) {
        this.setState(prev =>({currentPage:prev.currentPage-1}),this.getUpcoming)
      }
    }

    const onClickRight = () => {
      this.setState(prev =>({currentPage:prev.currentPage+1}),this.getUpcoming)
    }

    const leftDisabled = currentPage === 1
    const rightDisabled = upcomingData.length < 20
    
    return (
    <div className="pagination">
        <button type='button' onClick={onClickLeft} disabled={leftDisabled}
          aria-label='left'
        className='pagination-btn'>
        <AiOutlineLeft/>
      </button>
      <span>{currentPage}</span>
        <button type='button' onClick={onClickRight} disabled={rightDisabled}
          aria-label='right'
        className='pagination-btn'>
       <AiOutlineRight/>
      </button>
    </div>
  );
  }

  successView = () => {
    const {upcomingData} = this.state

    return (
      <div>
      <ul className="success-ul">
        {upcomingData.map(each => (
          <li key={each.id}>
            <PopularCard details={each} />
          </li>
        ))}
        </ul>
        <div>
          {this.renderPagination()}
        </div>
        </div>
    )
  }

  renderLoader = () => (
    <div className="loader-div">
      <Rings color="skyblue" width="50" height="50" />
    </div>
  )

  onClickRetry = () => {
    this.getPopularData()
  }

  renderFailure = () => (
    <div>
      <h1>Something went wrong</h1>
      <button type="button" onClick={this.onClickRetry} className="retry-btn">
        Retry
      </button>
    </div>
  )

  renderPage = () => {
    const { apiStatus } = this.state
    
    switch (apiStatus) {
      case apiStatusList.loading:
        return this.renderLoader()
      case apiStatusList.success:
        return this.successView()
      case apiStatusList.failure:
        return this.renderFailure()
    
      default:
        return null
    }
  }

  render() {
    return this.renderPage()
  }
}

export default UpcomingRoute
