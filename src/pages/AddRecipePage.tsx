import Heading from "../components/Heading/Heading"
import MainLayout from "../components/Layouts/MainLayout"
import AddRecipe from "../components/Recipe/AddRecipe"

function HomePage() {

  return (
    <MainLayout>
      <Heading type="h1" title="Twój nowy przepis" />
      <AddRecipe />
    </MainLayout>
  )
}

export default HomePage
