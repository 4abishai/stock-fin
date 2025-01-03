import React, { useEffect, useState } from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

import meta from '../assets/meta.json'
import amzn from '../assets/amzn.json'
import aapl from '../assets/aapl.json'
import googl from '../assets/googl.json'
import tsla from '../assets/tsla.json'
import msft from '../assets/msft.json'
import nvda from '../assets/nvda.json'
import intc from '../assets/intc.json'
import nflx from '../assets/nflx.json'
import ibm from '../assets/ibm.json'

const CandlestickChart = () => {
  const [chartData, setChartData] = useState(meta) // Default data (Meta)
  const [selectedStock, setSelectedStock] = useState('meta') // Default stock is Meta
  const [zoomRange, setZoomRange] = useState({ start: null, end: null }) // To store the zoomed range
  const [showSMA, setShowSMA] = useState(true) // State to toggle SMA line

  useEffect(() => {
    // Set chart data based on selected stock
    switch (selectedStock) {
      case 'amzn':
        setChartData(amzn)
        break
      case 'aapl':
        setChartData(aapl)
        break
      case 'googl':
        setChartData(googl)
        break
      case 'tsla':
        setChartData(tsla)
        break
      case 'msft':
        setChartData(msft)
        break
      case 'nvda':
        setChartData(nvda)
        break
      case 'intc':
        setChartData(intc)
        break
      case 'nflx':
        setChartData(nflx)
        break
      case 'ibm':
        setChartData(ibm)
        break
      default:
        setChartData(meta)
    }
  }, [selectedStock])

  // Function to calculate the simple moving average (SMA)
  const calculateSMA = (data, period) => {
    const sma = []
    for (let i = period - 1; i < data.length; i++) {
      const slice = data.slice(i - period + 1, i + 1)
      const avg = slice.reduce((sum, point) => sum + point[4], 0) / period // Closing prices are at index 4
      sma.push([data[i][0], avg])
    }
    return sma
  }

  // Calculate moving average (e.g., 10-day moving average)
  const smaData = calculateSMA(chartData, 10)

  const options = {
    rangeSelector: {
      selected: 1, // Default range selection
    },
    title: {
      text: `${selectedStock.toUpperCase()} Stock Price`, // Dynamic title based on selected stock
    },
    series: [
      {
        type: 'candlestick',
        name: `${selectedStock.toUpperCase()} Stock Price`,
        data: chartData,
        dataGrouping: {
          units: [
            ['week', [1]],
            ['month', [1, 2, 3, 4, 6]],
          ],
        },
        tooltip: {
          valueDecimals: 2,
        },
      },
      // Conditionally add the moving average line
      ...(showSMA
        ? [
            {
              type: 'line',
              name: '10-day SMA',
              data: smaData,
              tooltip: {
                valueDecimals: 2,
              },
              color: '#FF0000',
              zIndex: 2,
            },
          ]
        : []),
    ],
    xAxis: {
      events: {
        setExtremes: function (e) {
          const { min, max } = e
          setZoomRange({
            start: new Date(min).toISOString(),
            end: new Date(max).toISOString(),
          })
        },
      },
    },
  }

  const handleStockChange = (event) => {
    setSelectedStock(event.target.value)
  }

  return (
    <div>
      <select onChange={handleStockChange} value={selectedStock}>
        <option value="meta">Meta</option>
        <option value="amzn">Amazon</option>
        <option value="aapl">Apple</option>
        <option value="googl">Google</option>
        <option value="tsla">Tesla</option>
        <option value="msft">Microsoft</option>
        <option value="nvda">Nvidia</option>
        <option value="intc">Intel</option>
        <option value="nflx">Netflix</option>
        <option value="ibm">IBM</option>
      </select>

      <div>
        <label>
          <input
            type="checkbox"
            checked={showSMA}
            onChange={(e) => setShowSMA(e.target.checked)}
          />
          Moving Average (10 day)
        </label>
      </div>

      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={options}
      />

      {zoomRange.start && zoomRange.end && (
        <div>
          <p>Zoom Interval:</p>
          <p>Start: {zoomRange.start}</p>
          <p>End: {zoomRange.end}</p>
        </div>
      )}
    </div>
  )
}

export default CandlestickChart
