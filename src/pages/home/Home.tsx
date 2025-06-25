import Ai from '../../Components/home/Ai'

// import Archive from '../../components/home/Archive'

import GetApp from '../../Components/home/GetApp'
import Hero from '../../Components/home/Hero'

import Matching from '../../Components/home/Matching'
import Feature from '../../Components/home/Feature'
import MembershipPlans from '../../Components/home/MembershipPlans'

import "./home.css"
import WeddingSlider from '../../Components/home/WeddingSlider'
import Pre from '../../Components/home/Pre'
const Home = () => {
    return (
        <div>
            <Hero />
            {/* <Archive /> */}
            <Matching />
            
            <MembershipPlans />
            <Feature />
            <WeddingSlider/>
            <Pre/>
            <Ai />
            <GetApp />
          


        </div>
    )
}

export default Home
