
import styled from 'styled-components'
import { BarChart, Bar, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip,CartesianGrid ,LineChart, Line, Legend } from 'recharts'
import { useGetKpisQuery } from '../state/api'
import { useMemo } from 'react'
import Boxheader from '../components/Boxheader'
const Wrapper = styled.div`
    background-color:#27262a;
    border-radius:1rem;
    box-shadow:0.5rem 0.2rem 0.15rem  rgba(0,0,0,.8);
`
interface Props {
    
}

const Row1 = (props: Props) => {
    const { data } = useGetKpisQuery()
    // console.log(data) 
    const revenueANDexpenses = useMemo(()=>{
        return( 
            data &&
            data[0].monthlyData.map(({revenue, expenses, month})=>{
                return{
                    name:month.substring(0,3),
                    revenue:revenue,
                    expenses:expenses
                }
            })
            ) 
    }, [data])
    // graph two Profit and revenue
    const ProfitAndRevenue = useMemo(()=>{
        return(
            data &&
            data[0].monthlyData.map(( {revenue, expenses, month })=>{
                return{
                    name:month.substring(0,3) ,
                    revenue:revenue,
                    profit:(revenue -  expenses).toFixed(2)
                }
            })
        )
    },[data])

    // for barchart revenue month by month
    const revenueByMonth = useMemo(()=>{
        return(
            data &&
            data[0].monthlyData.map(( {revenue, month })=>{
                return{
                    name:month.substring(0,3) ,
                    revenue:revenue,
                    
                }
            })
        )
    },[data])



    return (
        <>
        <Wrapper style={{gridArea:"a" }} >
        {/* <Boxheader title='Revenue and Expenses' subtitle='top line represent revenue, bottom line represents expenses' sidetext='+4%' /> */}
        <ResponsiveContainer width="100%" height="100%">
            
        <AreaChart
          width={500}
          height={400}
          data={revenueANDexpenses}
          margin={{
            top: 15,
            right: 25,
            left: -10,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name"   style={{ fontSize: "10px" }} />
          
          <YAxis   style={{ fontSize: "10px" }}  domain={[8000, 23000]}/>
          <Tooltip />
          <Area type="monotone" dataKey="revenue" stroke="#19cfb4" fill="#23b49f" 
          dot={true}
          />
          <Area type="monotone" dataKey="expenses" stroke="#19cfb4" fill="#23b49f"    dot={true} />
        </AreaChart>
      </ResponsiveContainer>
        </Wrapper>
        {/* contaier 2 in row 1 */}
    <Wrapper style={{gridArea:"b" }} >
    <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={ProfitAndRevenue}
          margin={{
            top: 20,
            right: 0,
            left: -10,
            bottom: 55,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name"   style={{ fontSize: "10px" }} />
          <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
              domain={[8000, 23000]}
            />
          <Tooltip />
          <Legend />
          <Line type="monotone"  yAxisId="left" dataKey="profit" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" yAxisId="right" dataKey="revenue" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
        
    </Wrapper>
    {/* revenue month by month bar graph */}
    <Wrapper style={{gridArea:"c" }} >

    <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={revenueByMonth}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name"   style={{ fontSize: "10px" }} />
          <YAxis   style={{ fontSize: "10px" }} domain={[8000, 23000]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" fill="#19cfb4ce" />
          
        </BarChart>
      </ResponsiveContainer>
    </Wrapper>
            
        </>
    )
}

export default Row1
