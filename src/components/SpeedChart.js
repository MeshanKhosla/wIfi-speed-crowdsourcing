const SpeedChart = ({downloadSpeeds, uploadSpeeds}) => {
  return (
      <div>
        <h4> TEST, DOWNLOAD, UPLOAD </h4>
        {downloadSpeeds.map((val, index) => <h4 key={index}>{val ?? "..."}</h4>)}
      </div>
  )
}

export default SpeedChart;