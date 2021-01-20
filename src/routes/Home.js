import { Helmet } from "react-helmet"
import React from "react"

export default class Home extends React.Component {
  render() {
    return (
      <div className="tweets">
        <Helmet>
          <title>Qondo | Tweets</title>
        </Helmet>
        <h1>Tweets</h1>
      </div>
    )
  }
}
