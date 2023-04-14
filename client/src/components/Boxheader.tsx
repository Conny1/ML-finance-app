
import styled from 'styled-components'

const Container = styled.div`
width:100%;
display:flex;
justify-content:space-between;
align-items:center;
/* outline:1px solid red; */
height:50px;
margin-bottom:0;
`
const Wrapper = styled.div``
const   Text = styled.p`color:#f2f8a1;
font-size:13px;
margin-top:0;
`
const H4 = styled.h4`
color:#ada5a5;
margin-bottom:0;
`

interface Props {
    title:string
    subtitle?:string
    sidetext:string
    icon?:string
}

const Boxheader = ({title, sidetext, icon, subtitle}: Props) => {
    return (
        <Container>
            <Wrapper>
                <H4>{title}</H4>
                <Text>{subtitle}</Text>
            </Wrapper>
            <Text>{sidetext}</Text>
        </Container>
    )
}

export default Boxheader
