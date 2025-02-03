import MainLayout from "../components/Layouts/MainLayout"
import RecipeList from "../components/RecipeList/RecipeList"
import Profile from "../components/UserProfile/Profile"
import { auth } from "../firebaseConfig"

function HomePage() {

  return (
    <MainLayout>
      <div className="flex justify-between gap-4">
      <Profile />
      <RecipeList headingTitle="Moje prywatne przepisy" showRestricted={true} currentUserId={auth.currentUser?.uid} />
      </div>
    </MainLayout>
  )
}

export default HomePage
