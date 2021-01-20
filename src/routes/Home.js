import { Helmet } from "react-helmet"
import React from "react"
import CircularProgress from "@material-ui/core/CircularProgress"
import TwitterIcon from "@material-ui/icons/Twitter"
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied"
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied"
import MoodBadIcon from "@material-ui/icons/MoodBad"
import LinearProgress from "@material-ui/core/LinearProgress"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos"

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
  submitAnswer = (answer) => {
    this.setState({ ...this.state, isFetching: true })
    fetch(`${apiUrl}/answers/${this.state.currentTweet.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sentiment: answer }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.incrementTweetCount()
        this.setState({
          ...this.state,
          currentTweet: data,
          isFetching: false,
        })
      })
      .catch((e) => {
        console.log(e)
        this.setState({ ...this.state, isFetching: false })
      })
  }
  resetTweets = () => {
    this.setState({ ...this.state, completedTweets: 0 })
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
              {this.state.completedTweets} / 10
            </span>
          </h1>
          <LinearProgress
            variant="determinate"
            value={(this.state.completedTweets / 10) * 100}
          />
        </div>
        <div className="cards">
          {this.state.completedTweets >= 10 ? (
            <div className="card">
              <div className="card-info">
                <h2>
                  <CheckCircleIcon className="link-icon centered" />
                  <br></br>
                  Thank you for completing your Tweet Review.
                  <br></br>
                  Click below to get more Tweets
                </h2>
                <button onClick={this.resetTweets} className="complete-button">
                  <AddToPhotosIcon />
                  <span style={{ marginLeft: "15px" }}>Get More Tweets</span>
                </button>
              </div>
            </div>
          ) : (
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
                      onClick={() => this.submitAnswer("positive")}
                      className="action-button good"
                    >
                      <SentimentVerySatisfiedIcon />
                      <span style={{ marginLeft: "15px" }}>Good</span>
                    </button>
                    <button
                      onClick={() => this.submitAnswer("neutral")}
                      className="action-button neutral"
                    >
                      <SentimentSatisfiedIcon />
                      <span style={{ marginLeft: "15px" }}>Neutral</span>
                    </button>
                    <button
                      onClick={() => this.submitAnswer("negative")}
                      className="action-button bad"
                    >
                      <MoodBadIcon />
                      <span style={{ marginLeft: "15px" }}>Bad</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
}
