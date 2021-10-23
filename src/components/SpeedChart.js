const SpeedChart = ({speedVals}) => {
  return (
      <div>
        <h4> Test </h4>
        {speedVals.map((val, index) => <h4 key={index}>{val ?? "..."}</h4>)}
      </div>
  )
}

export default SpeedChart;