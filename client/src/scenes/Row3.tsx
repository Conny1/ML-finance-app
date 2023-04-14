import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionQuery } from '../state/api'
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import Boxheader from '../components/Boxheader';
import { Cell, Pie, PieChart } from 'recharts';


const Wrapper = styled.div`
/* width:100%; */
    background-color:#27262a;
    border-radius:1rem;
    box-shadow:0.5rem 0.2rem 0.15rem  rgba(0,0,0,.8);
    
`

const Box = styled.div`
 height: 80%;
 width:100%;
`
const Container = styled.div`
width:100%;
display:flex;
justify-content:space-between;
 `
const Item = styled.div`
/* outline:1px solid red; */
display:flex;
flex-direction:column;
align-items:center;
`
const Text = styled.p`
color:white;
`
const Typography = styled.p`
margin:0 1rem;
color:white;
`

interface Props {
    
}



const Row1 = (props: Props) => {
    const { data:transactions } = useGetTransactionQuery()
    const { data:products } = useGetProductsQuery()
    const { data:kpis } = useGetKpisQuery()

    console.log(kpis)

    const pieData = useMemo(() => {
      if(kpis){
        const totalexpense = kpis[0].totalExpenses
      return  Object.entries(kpis[0].expensesByCategory).map(([key, value])=>{
          return[{
            name:key,
            value:value
          },
        {
          name:`${key} of value`,
          value:totalexpense - Number(value)

        }];
        })

      }

    }, [kpis])
    const COLORS = ['#157a68', '#4bf1d3'];
    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        {
          field: 'expense',
          headerName: 'Expense',
          width: 100,
        
        },
        {
          field: 'price',
          headerName: 'price',
          width: 60,
          
          
        },
        
      ];


      const columns2 = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'buyer',
          headerName: 'Buyer',
          width: 150,
        
        },
        {
          field: 'amount',
          headerName: 'Amount',
          width: 65,
          
        },
        {field: "productIds",
        headerName: "Count",
        width: 20,
        renderCell: (params: GridCellParams) =>
          (params.value as Array<string>).length,
            
          },
        
      ];
      

    
    
    
    return (
        <>
        <Wrapper style={{gridArea:"g" }} >
            <Boxheader title='List of products' sidetext='124 products' />
            <Box>
            <DataGrid
             sx={{color:'white' }}
        rows={products || []}
        columns={columns}
        
        // pageSizeOptions={[1]}
        
        disableRowSelectionOnClick
      />
            </Box>
        </Wrapper>
    <Wrapper style={{gridArea:"h" }} >
    <Boxheader title='List of products' sidetext='124 products' />
            <Box>
            <DataGrid
             sx={{color:'white' }}
        rows={transactions || []}
        columns={columns2}
        
        // pageSizeOptions={[1]}
        
        disableRowSelectionOnClick
      />
            </Box>

    </Wrapper>
    <Wrapper style={{gridArea:"i" }} >
    <Container   >
    {
      pieData?.map((data,i)=>{
        return <Item key={i} >
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
          data={data}
          stroke="none"
          innerRadius={18}
          outerRadius={38}
          fill="#8884d8"
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entries, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
       
      </PieChart>
      <Text>{data[0].name}</Text>
        </Item>
      })
    }
      </Container>
    </Wrapper>
    <Wrapper style={{gridArea:"j" }} >
      <Box style={{ height:"15px",
          // margin:"1.25rem 1rem 0.4rem 1rem",
          backgroundColor: "#157a68" ,
          borderRadius:"1rem"}} >
        <Box 
        style={{height:"15px",
        backgroundColor:"#4bf1d3",
        borderRadius:"1rem",
        width:"40%"}}
        > </Box>
      </Box>
      <Typography  >
          Orci aliquam enim vel diam. Venenatis euismod id donec mus lorem etiam
          ullamcorper odio sed. Ipsum non sed gravida etiam urna egestas
          molestie volutpat et. Malesuada quis pretium aliquet lacinia ornare
          sed. In volutpat nullam at est id cum pulvinar nunc.
        </Typography>
    </Wrapper>
            
        </>
    )
}   

export default Row1
