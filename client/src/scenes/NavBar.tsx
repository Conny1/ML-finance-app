import {useState} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {SiPixiv} from 'react-icons/si'

const Components = styled.div`
width:100%;
height:50px;
display:flex;
justify-content:space-between;
align-items:center;
background-color:#1b1b1e;
`
const FlexBetween = styled.div`
display:flex;
gap:10px;
align-items:center;
width:fit-content;
`
const Text = styled.h4`
color:#e0d9d9;
`
type Props = {}

const NavBar = (props: Props) => {
    const [selected, setselected] = useState('darshboard')
  return (
    <Components>
        <FlexBetween style={{marginLeft:'20px'}} >
            <SiPixiv style={{fontSize:'25px' , color:'#e0d9d9' }} />
            <Text>
                Finanseer
            </Text>
        </FlexBetween>
        <FlexBetween style={{marginRight:'20px'}} >
            <Link
            to='/'
            onClick={()=>setselected('darshboard')}
            style={{
                color: selected !== 'darshboard'?'#817d7d':'#e0d9d9'
            }}

            >
            Darshboard
            </Link>

            <Link
            to='/predictions'
            onClick={()=>setselected('predictions')}
            style={{
                color: selected !== 'predictions'?'#817d7d':'#e0d9d9'
            }}

            >
            Predictions
            </Link>
        </FlexBetween>
    </Components>
  )
}

export default NavBar