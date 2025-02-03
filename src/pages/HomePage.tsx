import MainLayout from "../components/Layouts/MainLayout"
import RecipeList from "../components/RecipeList/RecipeList"

function HomePage() {

  return (
    <MainLayout>
      <RecipeList headingTitle="Przepisy" />
    </MainLayout>
  )
}

export default HomePage
