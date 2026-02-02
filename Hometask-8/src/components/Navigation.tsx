import { Link } from 'react-router-dom'

import './Navigation.scss';

const Navigation = () => {
    return (
        <div className='nav'>
            <h2> Navigation</h2>
            <ul className='nav__menu'>
                <li>
                    <Link to='/home'>Home</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
                <li>
                    <Link to='/register'>Register</Link>
                </li>
                <li>
                    <Link to='/new-post'>New post</Link>
                </li>
                <li>
                    <Link to='/'>Stripe</Link>
                </li>
            </ul>

        </div>
    )
}

export default Navigation