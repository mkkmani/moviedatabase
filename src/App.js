import { Switch,Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import PopularRoute from './components/Popular'
import TopratedRoute from './components/TopRated'
import UpcomingRoute from './components/Upcoming'
import Movie from './components/SingleMovie'

const App = () => (
  <div>
    <Navbar />
    <Switch>
      <Route exact path='/' component={PopularRoute} />
      <Route exact path='/top-rated' component={TopratedRoute} />
      <Route exact path='/upcoming' component={UpcomingRoute} />
      <Route exact path='/movie/:title/:id/' component={Movie}/>
    </Switch>
  </div>  
  
)

export default App