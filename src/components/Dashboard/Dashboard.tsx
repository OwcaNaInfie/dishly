import EditUserProfile from "../UserProfile/EditUserProfile"
import UserProfile from "../UserProfile/UserProfile"

function Dashboard() {
  const userId = 'userId123'; // Zalogowany użytkownik

  return (
    <>
    <UserProfile userId={userId} />
    <EditUserProfile userId={userId} />
    </>
  )
}

export default Dashboard
