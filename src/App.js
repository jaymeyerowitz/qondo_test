import './App.scss';
import { Suspense, lazy } from "react"
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom"
import TwitterIcon from "@material-ui/icons/Twitter"
import BarChartIcon from "@material-ui/icons/BarChart"

const Home = lazy(() => import("./routes/Home"))
const Overview = lazy(() => import("./routes/Overview"))

function App() {
  return (
    <div className="App">
      <Router>
        <main>
          <section className="glass">
            <div className="dashboard">
              <div className="user">
                <img className="avatar" src="/images/avatar.jpg" alt="" />
                <h3>Jay Meyerowitz</h3>
                <p>Tweet Reviewer</p>
              </div>
              <div className="links">
                <div className="link">
                  <Link to="/">
                    <TwitterIcon className="link-icon" />
                    <h2>Tweets</h2>
                  </Link>
                </div>
                <div className="link">
                  <Link to="/overview">
                    <BarChartIcon className="link-icon" />
                    <h2>Overview</h2>
                  </Link>
                </div>
              </div>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/overview" component={Overview} />
              </Switch>
            </Suspense>
          </section>
        </main>
      </Router>
    </div>
  )
}

export default App;
