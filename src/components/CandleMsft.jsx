import React, { useEffect, useState } from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import data from '../assets/msft.json'

const CandlestickChart = () => {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    // Simulate fetching data by using the imported JSON file
    setChartData(data)
  }, [])

  const options = {
    rangeSelector: {
      selected: 1, // Default range selection
    },
    title: {
      text: 'Microsoft Stock Price',
    },
    series: [
      {
        type: 'candlestick',
        name: 'Microsoft Stock Price',
        data: chartData, // Use fetched data here
        dataGrouping: {
          units: [
            [
              'week', // unit name
              [1], // allowed multiples
            ],
            ['month', [1, 2, 3, 4, 6]],
          ],
        },
        tooltip: {
          valueDecimals: 2,
        },
      },
    ],
  }

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={options}
      />
    </div>
  )
}

export default CandlestickChart
