import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'
import { Link } from 'react-router-dom'
const cx = classNames.bind(styles)

function SideBar() {
  return (
    <aside className={cx('wrapper')}>
      <ul>
        <li>
          <Link to="/">For You</Link>
        </li>
        <li>
          <Link to="/following">Follwing</Link>
        </li>
        <li>
          <Link to="/">Friends</Link>
        </li>
        <li>
          <Link to="/">Explore</Link>
        </li>
        <li>
          <Link to="/">LIVE</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>{' '}
        </li>
      </ul>
    </aside>
  )
}

export default SideBar
