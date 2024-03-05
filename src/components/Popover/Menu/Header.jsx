import classnames from 'classnames/bind'
import styles from './Menu.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

const cx = classnames.bind(styles)

function Header({ title, onBack }) {
  return (
    <div className={cx('header')}>
      <button type="button" className={cx('btn-back')} onClick={onBack}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <h4 className={cx('header-title')}>{title}</h4>
    </div>
  )
}

export default Header
