
const Footer: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  className,
  ...props
}) => {
  // Połącz przekazane klasy z domyślnymi klasami
  const footerClasses = `footer bg-base-200/60 items-center rounded-t-box px-6 py-4 shadow ${className || ''}`;

  return (
    <footer className={footerClasses} {...props}>
      <aside className="grid-flow-col items-center">
        <p>&copy;2025 <a className="link link-hover font-medium" href="#">dishly</a></p>
      </aside>
      <nav className="text-base-content grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a className="link link-animated" href="#">License</a>
        <a className="link link-animated" href="#">Help</a>
        <a className="link link-animated" href="#">Contact</a>
        <a className="link link-animated" href="#">Policy</a>
      </nav>
    </footer>
  )
}

export default Footer
