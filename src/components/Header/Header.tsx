import Menu from "../Menu/Menu";

const Header: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  className,
  ...props
}) => {
  // Połącz przekazane klasy z domyślnymi klasami
  const headerClasses = `header bg-primary items-center px-6 py-4 ${className || ''}`;

  return (
    <header className={headerClasses} {...props}>
      <Menu />
    </header>
  )
}

export default Header
