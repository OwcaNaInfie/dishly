import Logo from "../../assets/images/logo.svg"
import Navigation from "../Navigation/Navigation"

const Header: React.FC<React.HTMLAttributes<HTMLElement>> = (
) => {

  return (
    <nav className="navbar bg-primary justify-between">
        <a href="#" aria-label="Homepage Link">
          <img width="140" src={Logo} alt="Logo dishly" />
        </a>
      <Navigation />
    </nav>
  )
}

export default Header
