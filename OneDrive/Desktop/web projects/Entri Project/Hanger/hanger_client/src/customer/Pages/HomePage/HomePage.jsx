import React from 'react'
import MainCarousel from '../../components/HomeCarousel/MainCarousel'
import HomeSectionCarousel from '../../components/HomeSectionCarousel/HomeSectionCarousel'
import { mens_kurta } from '../../Data/Men/mens_kurta';


const HomePage = () => {
  return (
    <div>
      <MainCarousel/>
      <div>
        <HomeSectionCarousel data={mens_kurta} sectionName={"Mens Kurta"}/>
        <HomeSectionCarousel data={mens_kurta} sectionName={"Mens Kurta"}/>
        <HomeSectionCarousel data={mens_kurta} sectionName={"Mens Kurta"}/>
        <HomeSectionCarousel data={mens_kurta} sectionName={"Mens Kurta"}/>
        <HomeSectionCarousel data={mens_kurta} sectionName={"Mens Kurta"}/>
      </div>
    </div>
  )
}

export default HomePage
