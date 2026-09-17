function ScoreCircle({ score }) {

    const radius = 54;
    const circumference = 2 * Math.PI * radius;
  
    const progress =
      circumference - (score / 100) * circumference;
  
    return (
      <div className="score-container">
  
        <div className="score-circle">
  
          <svg
            width="140"
            height="140"
            viewBox="0 0 140 140"
          >
  
            <circle
              className="score-background"
              cx="70"
              cy="70"
              r={radius}
            />
  
            <circle
              className="score-progress"
              cx="70"
              cy="70"
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={progress}
            />
  
          </svg>
  
          <div className="score-value">
            <strong>{score}</strong>
            <span>/100</span>
          </div>
  
        </div>
  
        <span className="score-label">
          Bias signal
        </span>
  
        <p className="score-description">
          Moderate amount of potentially loaded language detected.
        </p>
  
      </div>
    );
  }
  
  export default ScoreCircle;