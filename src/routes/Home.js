import { Helmet } from "react-helmet"
import React from "react"
import CircularProgress from "@material-ui/core/CircularProgress"

const apiUrl = "http://13.245.17.125/api"
export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFetching: false,
      currentTweet: null,
      completedTweets: 0,
    }
  }
  componentDidMount() {
    this.getTweet()
  }
  getTweet = async () => {
    this.setState({ ...this.state, isFetching: true })
    await fetch(`${apiUrl}/tweets`)
      .then((response) => response.json())
      .then((result) => {
        setTimeout(() => {
          this.setState({
            ...this.state,
            currentTweet: result,
            isFetching: false,
          })
        }, 500)
      })
      .catch((e) => {
        console.log(e)
        this.setState({ ...this.state, isFetching: false })
      })
  }
  incrementTweetCount = () => {
    this.setState({
      ...this.state,
      completedTweets: this.state.completedTweets + 1,
    })
  }
  render() {
    return (
      <div className="tweets">
        <Helmet>
          <title>Qondo | Tweets</title>
        </Helmet>
        <div className="status">
          <h1>
            Tweets
            <span className="progress-count">
              {this.state.completedTweets} / 1000
            </span>
          </h1>
        </div>
        <div className="cards">
          <div className="card">
            {this.state.isFetching ? (
              <div className="loader">
                <CircularProgress />
              </div>
            ) : (
              <div className="card-info">
                <h2>
                  {this.state.currentTweet && this.state.currentTweet.text}
                </h2>
                <hr className="separator" />
                <div className="actions">
                  <button
                    onClick={this.incrementTweetCount}
                    className="action-button good"
                  >
                    Good
                  </button>
                  <button
                    onClick={this.incrementTweetCount}
                    className="action-button neutral"
                  >
                    Neutral
                  </button>
                  <button
                    onClick={this.incrementTweetCount}
                    className="action-button bad"
                  >
                    Bad
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
