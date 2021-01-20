import { Helmet } from "react-helmet"
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied"
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied"
import MoodBadIcon from "@material-ui/icons/MoodBad"
import { PieChart } from "react-minimal-pie-chart"

export default function Overview() {
  // This dataset would be fetched from an endpoint such as GET api/tweets/all
  const tweets = [
    { text: "This is a positive tweet", sentiment: "positive" },
    { text: "negative tweet", sentiment: "negative" },
    { text: "I am neutral", sentiment: "neutral" },
  ]
  // This dataset would be fetched from an endpoint such as GET api/tweets/sentiments
  const totalSentiments = {
    positive: 10,
    neutral: 8,
    negative: 15,
  }

  const getCorrectSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return <SentimentVerySatisfiedIcon />
      case "neutral":
        return <SentimentSatisfiedIcon />
      case "negative":
        return <MoodBadIcon />
      default:
        return <SentimentSatisfiedIcon />
    }
  }
  return (
    <div className="tweets">
      <Helmet>
        <title>Qondo | Overview</title>
      </Helmet>
      <h1>Overview</h1>
      <div className="cards">
        <div className="card overview">
          <div className="card-info">
            <h2>2021-01-20</h2>
            <div className="sentiment-data">
              <label>Good: {totalSentiments.positive}</label>
              <label>Neutral: {totalSentiments.neutral}</label>
              <label>Bad: {totalSentiments.negative}</label>
            </div>
            <div className="pie-chart">
              <PieChart
                data={[
                  {
                    title: "Positive",
                    value: totalSentiments.positive,
                    color: "#658ec6",
                  },
                  {
                    title: "Neutral",
                    value: totalSentiments.neutral,
                    color: "#65dfc9",
                  },
                  {
                    title: "Negative",
                    value: totalSentiments.negative,
                    color: "#82df65",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="cards">
        <div className="card overview">
          <div className="card-info">
            <h2>Previous Tweets</h2>
            <div className="sentiment-card mb-0">
              <table className="tweets-table">
                <thead>
                  <th colspan="6">Tweet</th>
                  <th
                    colspan="6"
                    style={{ textAlign: "right", paddingRight: 20 }}
                  >
                    Sentiment
                  </th>
                </thead>
              </table>
            </div>
            {tweets.map((tweet) => {
              return (
                <div className="sentiment-card mb-0">
                  <table className="tweets-table">
                    <tbody>
                      <tr>
                        <td colspan="6" style={{ textAlign: "left" }}>
                          {tweet.text}
                        </td>
                        <td
                          colspan="6"
                          style={{ textAlign: "right", paddingRight: 45 }}
                        >
                          {getCorrectSentimentIcon(tweet.sentiment)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
