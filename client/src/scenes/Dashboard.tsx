import styled from 'styled-components'

import Row1 from './Row1'
import Row2 from './Row2'
import Row3 from './Row3'
import { useGetKpisQuery } from '../state/api'
import load from '../assets/load.gif'

const gridTemplateLargerScreens=`
"a b c"
"a b c"
"a b c"
"a b f"
"d e f"
"d e f"
"d h i"
"g h i"
"g h j"
"g h j"
`
const gridTemplateSmallerScreens=`
"a"
"a"
"a"
"a"
"b"
"b"
"b"
"b"
"c"
"c"
"c"
"d"
"d"
"d"
"e"
"e"
"f"
"f"
"f"
"g"
"g"
"g"
"h"
"h"
"h"
"h"
"i"
"i"
"j"
"j"
`

const Container = styled.div`

width:100%;
height:auto;
/* outline:1px solid red; */
display:grid;
justify-content: center;
gap:1.5rem;
grid-template-columns:repeat(3, 30%);
grid-template-rows:repeat(10, 80px );
grid-template-areas:${gridTemplateLargerScreens};
@media(max-width:1059px) {
/* grid-auto-columns:1fr; */
grid-template-columns:1fr;
grid-auto-rows:90px;
height:auto;
grid-template-areas:${gridTemplateSmallerScreens};
}
`
const LoadingIcon = styled.div`
width:100%;
height:100%;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
`
const Image = styled.img`
width:100px;
height:100px;

`
const Text = styled.p`
  color: #7c7b7b;

`


const Dashboard = () => {

  const {data:kpi} =  useGetKpisQuery()
  if(!kpi) return <LoadingIcon>
    <Image src={load} alt='loadicon' />
    <Text>Loading.... Please wait</Text>
  </LoadingIcon>
 
  return (
    <Container>
    <Row1/>   
    <Row2/>
   <Row3/>

    </Container>
  )
}

export default Dashboard