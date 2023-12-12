import { Component } from "react";
import SingleMoviePage from "../SingleCard";
import './index.css'

const apiStatusList = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure:'FAILURE'
}

class Movie extends Component {
  state = { 
    apiStatus: 'init',
    movieData: {},
    castDetails:{}
  }
  
  componentDidMount() {
    this.getMovieData()
    this.getCastDetails()
  }

  getMovieData = async () => {
    
    this.setState({apiStatus:apiStatusList.loading})

    const { match: { params: { id } } } = this.props;
    const apiKey = 'e9ec2ea7225ad8a96148d8b293353054'
    const api = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    const options = {
      method:'GET'
    }

    const response = await fetch(api, options)
    const data = await response.json() 

    const updatedData = {
      backdropPath: data.backdrop_path,
      belongsToCollection: data.belongs_to_collection,
      budget: data.budget,
      genres: data.genres,
      homepage: data.homepage,
      id: data.id,
      imdbId: data.imdb_id,
      origianalLanguage: data.original_language,
      originalTitle: data.original_title,
      overview: data.overview,
      popularity: data.popularity,
      productionsCompanies: data.production_companies,
      productionsCountries: data.production_countries,
      releaseDate: data.release_date,
      revenue: data.revenue,
      runtime: data.runtime,
      status: data.status,
      tagline: data.tagline,
      title: data.title,
      voteAverage: data.vote_average,
      vouteCount: data.vote_count,
      spokenLanguages: data.spokenLanguages,
      video: data.video,
      adult: data.adult,
      posterPath:data.poster_path
    }

    this.setState({movieData:updatedData,apiStatus:apiStatusList.success})

  }

  getCastDetails = async() => {
    const { match: { params: { id } } } = this.props
    const apiKey = 'e9ec2ea7225ad8a96148d8b293353054'
    const api = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`
    const options = {
      method:'GET'
    }

    const response = await fetch(api, options)
    const data = await response.json()

    const updatedData = {
      cast: data.cast.map(eachCast => ({
        adultCast: eachCast.adult,
        castIdCast: eachCast.cast_id,
        characterCast: eachCast.character,
        creditIdCast: eachCast.credit_id,
        idCast: eachCast.id,
        genderCast: eachCast.gender,
        knownForDeptCast: eachCast.known_for_department,
        nameCast: eachCast.name,
        orderCast: eachCast.order,
        originalNameCast: eachCast.original_name,
        popularityCast: eachCast.popularity,
        profilePathCast:eachCast.profile_path
      })),
      crew: data.crew.map(eachCrew => ({
        adultCrew: eachCrew.adult,
        creditIdCrew: eachCrew.credit_id,
        deptCrew: eachCrew.department,
        genderCrew: eachCrew.gender,
        idCrew: eachCrew.id,
        jobCrew: eachCrew.job,
        knownForDeptCrew: eachCrew.known_for_department,
        originalNameCrew: eachCrew.original_name,
        nameCrew: eachCrew.name,
        popularityCrew: eachCrew.popularity,
        profilePathCrew:eachCrew.profile_path
      }))
    }

    this.setState({
      castDetails: updatedData,
      apiStatus:apiStatusList.success
    })

  }

  renderPage = () => {
      const { movieData, castDetails } = this.state
        
      return (
        <SingleMoviePage movieDetails={movieData} castDetails={castDetails}/>
      )
    }

  renderMovieDetails = () => {
    const { apiStatus } = this.state
    switch (apiStatus) {
      case apiStatusList.loading:
        return <div>Loading</div>
      case apiStatusList.success:
        return this.renderPage()
      case apiStatusList.failure:
        return <div>Failure</div>
    
      default:
        return null
    }
  }

  render() { 
    return this.renderPage()
  }
}
 
export default Movie;