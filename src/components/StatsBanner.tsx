type StatsBannerProps = {
  count: number
  averageRating: number
  genreName: string
  isLiveApi: boolean
}

const StatsBanner = ({count, averageRating, genreName, isLiveApi}: StatsBannerProps) => {
  return (
    <div className="stats-banner">
        <div className="stat-card">
            <div className="stat-info">
                <span className="stat-value">
                {count}
                </span>
                <span className="stat-label">Movies</span>
            </div>
        </div>
        <div className="stat-card">
            <div className="stat-info">
                <span className="stat-value">
                {averageRating.toFixed(1)}
                </span>
                <span className="stat-label">Average Rating</span>
            </div>
        </div>
        <div className="stat-card">
            <div className="stat-info">
                <span className="stat-value">
                {genreName}
                </span>
                <span className="stat-label">Genre</span>
            </div>
        </div>
        <div className="stat-card">
            <div className="stat-info">
                <span className="stat-value">
                {isLiveApi
                ? "Live API"
                : "Local Data"}
                </span>
                <span className="stat-label">Data Source</span>
            </div>
        </div>
    </div>
  )
}

export default StatsBanner