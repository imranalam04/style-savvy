import { Outlet , Link} from "react-router-dom";
import { Fragment,useContext} from "react";
import './navigation.styles.scss';
import Img1  from '../../assets/stylesavvy-logo.png'
import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { CartContext } from "../../context/cart.context";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";

const NavigationBar = () => {
  const {currentUser} = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext)
 
    return (
      <Fragment>
      <div className="navigation">
      <Link className="logo-container" to='/'>
      <img alt="" src={Img1} className="logo"/>
      </Link>
      <div className="nav-links-container">
      <Link className='nav-link' to='/shop'>
      SHOP
      </Link>
      {currentUser ? (
        <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>): (<Link className='nav-link' to='/auth'>
        SIGN IN
       </Link>
      )}
      <CartIcon/>
      </div>
      {isCartOpen && <CartDropDown />}
      </div>
      <Outlet />
      {/*<h2 style={{justifyContent:'center',display:'flex'}}>Made by Imran Alam | web developer ❤️</h2>*/}
      </Fragment>
    )
  }

  export default NavigationBar;