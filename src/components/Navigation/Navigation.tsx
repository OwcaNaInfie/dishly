import Button from '../Button/Button'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebaseConfig'
import { useNavigate } from 'react-router-dom'

const Navigation: React.FC = () => {
  const navigateTo = useNavigate()
  const user = auth.currentUser;

  if (!user) {
    return <p>Nie jesteś zalogowany.</p>;
  }

  const handleSignOutClick = () => {
    signOut(auth).then(val => {
      console.log(val);
      navigateTo("/singin")
    })
  };

  return (
    <div className="dropdown relative inline-flex ;tr:[--placement:bottom-end]">
      <button id="dropdown-header" type="button" className="dropdown-toggle btn btn-secondary" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
        <span className="icon-[tabler--menu-2] size-8"></span>
      </button>
      <ul className="dropdown-menu shadow-none rounded-none border border-neutral dropdown-open:opacity-100 hidden min-w-60" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-header">
        <li className="dropdown-header gap-2">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={ user.photoURL || "https://cdn.flyonui.com/fy-assets/avatar/avatar-2.png" } alt="User Avatar" />
            </div>
          </div>
          <div>
            <h6 className="text-base-content text-base font-semibold">{ user.displayName || "Jane Doer"}</h6>
            <small className="text-base-content/50 text-sm font-normal">{ user.email }</small>
          </div>
        </li>
        <li><a className="dropdown-item" href="/profile">Profil</a></li>
        <li><a className="dropdown-item" href="/">Przepisy</a></li>

        <li className="dropdown-footer gap-2">
          <Button onClick={handleSignOutClick} className="btn btn-error btn-soft btn-block">Wyloguj</Button>
        </li>
      </ul>
    </div>
  )
}

export default Navigation
