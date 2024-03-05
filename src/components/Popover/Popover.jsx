import classnames from 'classnames/bind'
import styles from './Popover.module.scss'
const cx = classnames.bind(styles)

function Popover({ children }) {
  return <div className={cx('wrapper')}>{children}</div>
}

export default Popover
