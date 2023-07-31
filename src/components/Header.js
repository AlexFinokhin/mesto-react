import logo from "../images/LOGO.svg";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
    </header>
  );
}

export default Header;