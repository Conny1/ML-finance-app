import {useMemo} from 'react'
import styled from 'styled-components'
import { useGetKpisQuery, useGetProductsQuery } from '../state/api'
import { CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts'
const Wrapper = styled.div`
/* width:100%; */
    background-color:#27262a;
    border-radius:1rem;
    box-shadow:0.5rem 0.2rem 0.15rem  rgba(0,0,0,.8);
    
`
const Container = styled.div`
    display:flex;
    justify-content:space-evenly;
    /* outline:1px solid red; */
    height:100%;
    color:#e0d9d9;
    align-items:center;
    /* width:100%; */
    
`
const Item = styled.div`
/* outline:1px solid red; */
/* flex-basis:40%; */
width:30%;

`
const Head = styled.h4`
   margin-bottom:0;
   margin-top:0;
font-size:13px;
`
const Text = styled.p`
    margin-top:0;
    margin-bottom:0;
    font-size:11px;
    color:#979595;
`
interface Props {
    
}

const Row1 = (props: Props) => {
    const {data: Operational} = useGetKpisQuery()
    
    const {data:product} = useGetProductsQuery()
    // console.log(product)

    // lineGraph data row2 column1
    const OperationalExpenses = useMemo(() => {
      return ( Operational &&
        Operational[0].monthlyData.map(({operationalExpenses, nonOperationalExpenses, month})=>{
            return{
                name:month.substring(0,3),
                "Operational Expenses": operationalExpenses ,
                "non Operational Expenses":nonOperationalExpenses
            }

        }))

    }, [Operational])

    
    // piechart data row2 column2
    const pieData = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
       
      ];
      const COLORS = ['#157a68', '#4bf1d3'];
    
    //  piechart data row2 column3 data
    const  priceAndExpenses = useMemo(() => {
        return( product &&
            product.map(({_id, price, expense})=>{
                return{
                 id:_id,
                 price,
                 expense
                }
            }) )

    }, [product])
    // console.log(priceAndExpenses)
    return (
        <>
        <Wrapper style={{gridArea:"d" }} >
        <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={OperationalExpenses}
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
          {/* <Legend  style={{ fontSize: "10px" }} /> */}
          <Line type="monotone"  yAxisId="left" dataKey="Operational Expenses" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line  type="monotone" yAxisId="right" dataKey="non Operational Expenses" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
        
        </Wrapper>
        
    <Wrapper style={{gridArea:"e" }} >
    <Container   >
    <PieChart width={110}
            height={100}
            margin={{
                top: 0,
                right: -10,
                left: 10,
                bottom: 0,
              }}
           >
        <Pie
          data={pieData}
          stroke="none"
          innerRadius={18}
          outerRadius={38}
          fill="#8884d8"
          paddingAngle={2}
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
       
      </PieChart>
      <Item style={{display:'flex', alignItems:'center', flexDirection:'column'}} >
        <Head>Target sales</Head>
        <Text style={{fontSize:'15px', fontWeight:'bold', color:'#4bf1d3'}} >83</Text>
        <Text>Finance goals of the company that is desired  </Text>
      </Item>
      <Item>
        <Head> Loss in revenue </Head>
        <Text> losses are down 25% </Text>
        <Head>Profit margins</Head>
        <Text>Margins are up by 30%</Text>
      </Item>
      </Container>
    </Wrapper>
    
    <Wrapper style={{gridArea:"f" }} >
    <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{
            top: 20,
            right: 25,
            bottom: 40,
            left: -10,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="price" name="price"  axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`} />
          <YAxis type="number" dataKey="expense" name="expense"  axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`} />
           <Tooltip formatter={(v) => `$${v}`} />
          <Scatter name="Product Expense Ratio" data={priceAndExpenses} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>

    </Wrapper>
            
        </>
    )
}

export default Row1
