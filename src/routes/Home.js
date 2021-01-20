import { Helmet } from "react-helmet"
import React from "react"
import CircularProgress from "@material-ui/core/CircularProgress"
import TwitterIcon from "@material-ui/icons/Twitter"
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied"
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied"
import MoodBadIcon from "@material-ui/icons/MoodBad"

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
                  <TwitterIcon className="link-icon" />
                  &nbsp;
                  {this.state.currentTweet && this.state.currentTweet.text}
                </h2>
                <hr className="separator" />
                <div className="actions">
                  <button
                    onClick={this.incrementTweetCount}
                    className="action-button good"
                  >
                    <SentimentVerySatisfiedIcon />
                    <span style={{ marginLeft: "15px" }}>Good</span>
                  </button>
                  <button
                    onClick={this.incrementTweetCount}
                    className="action-button neutral"
                  >
                    <SentimentSatisfiedIcon />
                    <span style={{ marginLeft: "15px" }}>Neutral</span>
                  </button>
                  <button
                    onClick={this.incrementTweetCount}
                    className="action-button bad"
                  >
                    <MoodBadIcon />
                    <span style={{ marginLeft: "15px" }}>Bad</span>
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
