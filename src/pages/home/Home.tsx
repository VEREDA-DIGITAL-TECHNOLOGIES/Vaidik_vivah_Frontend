import Ai from '../../components/home/Ai'

// import Archive from '../../components/home/Archive'

import GetApp from '../../components/home/GetApp'
import Hero from '../../components/home/Hero'

import Matching from '../../components/home/Matching'
import Feature from '../../components/home/Feature'
import MembershipPlans from '../../components/home/MembershipPlans'

import "./home.css"
import WeddingSlider from '../../components/home/WeddingSlider'
import Pre from '../../components/home/Pre'
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
