
import Categories from "../Categories"
import Hero from "../Hero"
import ProductsSection from "../ProductsSection"
import Recommended from "../Recommended"
import SearchBar from "../SearchBar"


const HomePage = () => {
  return (
    <>
      <Hero />
      <SearchBar />
      <Categories />
      <Recommended />
      <ProductsSection />
    </>
  )
}

export default HomePage
