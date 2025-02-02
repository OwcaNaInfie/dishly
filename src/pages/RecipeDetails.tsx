import Heading from "../components/Heading/Heading"
import MainLayout from "../components/Layouts/MainLayout"
import Recipe from "../components/Recipe/Recipe"

function HomePage() {

  return (
    <MainLayout>
      <Heading type="h1" title="Przepis" />
      <Recipe />
    </MainLayout>
  )
}

export default HomePage
