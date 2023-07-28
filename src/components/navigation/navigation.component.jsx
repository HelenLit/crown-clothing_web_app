import './navigation.styles.scss';

import {Outlet, Link} from "react-router-dom";
import {Fragment, useContext} from "react";
import {ReactComponent as CrwnLogo} from "../../assets/crown.svg";

import CartIcon from "../cart-icon/cart-icon.component";
import {UserContext} from "../../contexts/user.context";
import {signOutUser} from "../../utils/firebase/firebase.utils";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

const Navigation = () => {
    const {currentUser, setCurrentUser} = useContext(UserContext);

    const signOutHandler = async () => {
        await signOutUser();
        setCurrentUser(null);
    }
    return (
        <Fragment>
            <div className="navigation">
                <Link className='logo-container' to='/'>
                    <CrwnLogo className='logo'/>
                </Link>
                <div className='links-container'>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                    { currentUser ? (
                           <span className='nav-link' onClick={signOutHandler}>SIGN OUT</span>
                        ) : (
                            <Link className='nav-link' to='/auth'>
                                SIGN IN
                            </Link>
                        )}
                    <CartIcon/>
                </div>
                <CartDropdown/>
            </div>
            <Outlet/>
        </Fragment>
    );
};

export default Navigation;