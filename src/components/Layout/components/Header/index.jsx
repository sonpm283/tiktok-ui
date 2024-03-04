import classnames from 'classnames/bind'
import styles from './Header.module.scss'
import images from '~/assets/images'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons'
const cx = classnames.bind(styles)

function Header() {
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('logo')}>
          <Link to="/">
            <img src={images.logo} alt="TikTok" />
          </Link>
        </div>
        <div className={cx('search')}>
          <input type="text" placeholder="Search accounts and videos" spellCheck={false} />
          <button type="button" className={cx('clear')}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
          <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
          <button type="button" className={cx('search-btn')}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        <div className={cx('action')}>
          <button type="button">Upload</button>
          <button type="button">Log in</button>
          <button type="button">Menu</button>
        </div>
      </div>
    </header>
  )
}

export default Header
