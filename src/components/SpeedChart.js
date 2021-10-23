const SpeedChart = ({ speedOne, speedTwo, speedThree }) => {
  return (
      <div>
        <h4>Speed one: {speedOne ?? 'Not determined'}</h4>
        <h4>Speed two: {speedTwo ?? 'Not determined'}</h4>
        <h4>Speed three: {speedThree ?? 'Not determined'}</h4>
      </div>
  )
}


export default SpeedChart;