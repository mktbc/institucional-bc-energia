import { NavbarDesktop } from './Desktop'
import { NavbarMobile } from './Mobile'

const Navbar = () => (
  <>
    <div className="hidden lg:flex">
      <NavbarDesktop />
    </div>
    <div className="flex lg:hidden">
      <NavbarMobile />
    </div>
  </>
)

export default Navbar
