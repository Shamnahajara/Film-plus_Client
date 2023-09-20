import Navbar from '../../../components/user_components/home_components/Navbar'
import Home_body from '../../../components/user_components/home_components/Home_body'
import Footer from '../../../components/user_components/home_components/Footer'
import Row from '../../../components/user_components/home_components/Row'
import {orginal,documentries,comedy} from '../../../api/constance'

function Home() {
  return (
    <>
    <Navbar/>
    <Home_body/> 
    <Row rowId='1' title='Film-Plus Orginals' url={orginal} isPoster/>
    <Row rowId="2" title='Documentries' url={documentries}/>
    <Row rowId='3' title='comedy' url={comedy}/>
    <Footer/> 
    </>
  )
}

export default Home