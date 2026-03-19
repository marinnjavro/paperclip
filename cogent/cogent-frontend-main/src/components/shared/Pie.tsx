import React from 'react'

const cleanPercentage = (percentage: number) => {
  const tooLow = !Number.isFinite(+percentage) || percentage < 0
  const tooHigh = percentage > 100
  return tooLow ? 0 : tooHigh ? 100 : +percentage
}

const Circle = ({ color, pct = 100 }: { color: string; pct?: number }) => {
  const r = 70
  const circ = 2 * Math.PI * r
  const strokePct = ((100 - pct) * circ) / 100
  return (
    <circle
      r={r}
      cx={100}
      cy={100}
      fill="transparent"
      stroke={strokePct !== circ ? color : ''} // remove color as 0% sets full circumference
      strokeWidth={'0.75rem'}
      strokeDasharray={circ}
      strokeDashoffset={pct ? strokePct : 0}
      strokeLinecap="round"
    ></circle>
  )
}

const Text = ({ percentage }: { percentage: number }) => {
  return (
    <text
      x="50%"
      y="50%"
      dominantBaseline="central"
      textAnchor="middle"
      fontSize={'32px'}
      fontWeight={'bold'}
      fill="white"
    >
      {percentage.toFixed(0)}%
    </text>
  )
}

const Pie = ({ percentage, color }: { percentage: number; color: string }) => {
  const pct = cleanPercentage(percentage)
  return (
    <svg width={200} height={200}>
      <g transform={`rotate(-90 ${'100 100'})`}>
        <Circle color="#2b2c3e" />
        <Circle color={color} pct={pct} />
      </g>
      {/* <Text percentage={pct} /> */}
    </svg>
  )
}

export default Pie
