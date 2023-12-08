import {Link,withRouter} from 'react-router-dom'
import {SiThemoviedatabase} from 'react-icons/si'
import { TbDatabaseSearch } from 'react-icons/tb'
import { IoIosRibbon } from "react-icons/io";
import {MdOutlineStar, MdUpcoming} from 'react-icons/md'
import './index.css'

const Navbar = props => {
  
const {searchInput,onChangeSearchInput} = props
  return (
    <nav className="nav-bar">
      <ul className="nav-ul">
        <Link to="/" className="nav-link-item">
          <div className="logo-name">
            <SiThemoviedatabase className="logo" />
            <h1>movieDB</h1>
          </div>
        </Link>
        <div className='links-search'>
          <Link to="/" className="nav-link-item">
            <div className='route-icon'>
              <p className="span">Popular</p>
              <IoIosRibbon className="icon" />
            </div>
          </Link>
          <Link to="/top-rated" className="nav-link-item">
            <div className='route-icon'>
              <p className="span">Top rated</p>
              <MdOutlineStar className="icon" />
            </div>
          </Link>
          <Link to="/upcoming" className="nav-link-item">
            <div className='route-icon'>
              <p className="span">Upcoming</p>
              <MdUpcoming className="icon" />
            </div>
            
          </Link>
          <div className="search-div">
            <input
              type="search"
              value={searchInput}
              onChange={onChangeSearchInput}
              placeholder="Search db"
             className='search-bar'
            />
            <TbDatabaseSearch className="icon" />
          </div>
        </div>
      </ul>
    </nav>
  )
}

export default withRouter(Navbar)