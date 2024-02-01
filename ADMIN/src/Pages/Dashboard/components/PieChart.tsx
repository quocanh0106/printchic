// src/PieChart.js
import * as echarts from 'echarts'
import { useEffect } from 'react'
import styled from 'styled-components'
import { Colors } from '~/Themes'

const PieChart = ({ id, ntd, adv }: any) => {
  useEffect(() => {
    const chart = echarts.init(document.getElementById(`pie-chart-${id}`))
    const option = {
      title: {
        text: 'Tỷ lệ tổng doanh thu',
        left: 'center',
        textStyle: {
          color: Colors.primary, // Màu sắc của tiêu đề
          fontSize: 16, // Kích thước của tiêu đề
          fontWeight: 'bold', // Độ đậm của tiêu đề
          fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: 'bottom'
      },
      series: [
        {
          name: 'Chi tiết doanh thu',
          type: 'pie',
          radius: '70%', // Adjust the radius to control the size of the pie chart
          center: ['50%', '50%'],
          data: [
            {
              value: ntd,
              name: 'NTD nạp tiền',
              itemStyle: { color: Colors.secondary },
              label: {
                show: true,
                position: 'inside',
                formatter: '{d}%', // Change the order of {d}% and name
                textStyle: {
                  fontSize: 14,
                  color: Colors.white,
                  fontWeight: 'bold'
                }
              }
            }, // Use the same value for all sectors to fill the pie
            {
              value: adv,
              name: 'Quảng cáo',
              itemStyle: { color: Colors.primary },
              label: {
                show: true,
                position: 'inside',
                formatter: '{d}%', // Change the order of {d}% and name
                textStyle: {
                  fontSize: 14,
                  color: Colors.white,
                  fontWeight: 'bold'
                }
              }
            }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            show: true,
            position: 'inside',
            formatter: '{d}%'
          },
          labelLine: {
            show: false
          }
        }
      ]
    }

    chart.setOption(option)

    // Cleanup the chart when the component unmounts
    return () => {
      chart.dispose()
    }
  }, [ntd, adv])

  return <PieContainer id={`pie-chart-${id}`} style={{ width: '330px', height: '300px' }}></PieContainer>
}

export default PieChart

const PieContainer = styled.div`
  box-shadow: 0px 3px 10px 0px #00000040;
  padding: 10px;
  border-radius: 8px;
`
