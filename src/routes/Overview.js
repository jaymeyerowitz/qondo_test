export default function Overview() {
  return (
    <div className="tweets">
      <h1>Overview</h1>
      <div className="cards">
        <div className="card overview">
          <div className="card-info">
            <h2>2021-01-20</h2>
            <div className="sentiment-data">
              <label>Good: 25</label>
              <label>Neutral: 15</label>
              <label>Bad: 20</label>
            </div>
          </div>
        </div>
      </div>
      <div className="cards">
        <div className="card overview">
          <div className="card-info">
            <h2>Previous Tweets</h2>
            <div className="sentiment-card mb-0">
              <table style={{ width: "100%" }}>
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

            <div className="sentiment-card mb-0">
              <table style={{ width: "100%" }}>
                <tbody>
                  <tr>
                    <td colspan="6" style={{ textAlign: "left" }}>
                      Some Tweet Text
                    </td>
                    <td
                      colspan="6"
                      style={{ textAlign: "right", paddingRight: 20 }}
                    >
                      Positive
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
