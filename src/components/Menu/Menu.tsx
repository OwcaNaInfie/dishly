import Button from '../Button/Button'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebaseConfig'
import { useNavigate } from 'react-router-dom'


const Menu: React.FC = () => {
  const navigateTo = useNavigate()

  const handleSignOutClick = () => {
    signOut(auth).then(val => {
      console.log(val);
      navigateTo("/singin")
    })
  };

  return (
      <div className="dropdown relative inline-flex rtl:[--placement:bottom-end]">
  <button id="dropdown-header" type="button" className="dropdown-toggle btn btn-secondary" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
    Dropdown header
    <span className="icon-[tabler--chevron-down] dropdown-open:rotate-180 size-4"></span>
  </button>
  <ul className="dropdown-menu dropdown-open:opacity-100 hidden min-w-60" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-header">
    <li className="dropdown-header gap-2">
      <div className="avatar">
        <div className="w-10 rounded-full">
          <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-2.png" alt="User Avatar" />
        </div>
      </div>
      <div>
        <h6 className="text-base-content text-base font-semibold">John Doe</h6>
        <small className="text-base-content/50 text-sm font-normal">jhon@doe.com</small>
      </div>
    </li>
    <li><a className="dropdown-item" href="#">Profil</a></li>
    <li><a className="dropdown-item" href="#">Settings</a></li>
    <li><a className="dropdown-item" href="#">Billing</a></li>
    <li><a className="dropdown-item" href="#">FAQs</a></li>
    <li className="dropdown-footer gap-2">
      <Button onClick={handleSignOutClick} className="btn btn-error btn-soft btn-block">Wyloguj</Button>
    </li>
  </ul>
</div>
  )
}

export default Menu
