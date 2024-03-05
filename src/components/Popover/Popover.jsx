import classnames from 'classnames/bind'
import styles from './Popover.module.scss'
const cx = classnames.bind(styles)

function Popover({ children, className }) {
  return <div className={cx('wrapper', className)}>{children}</div>
}

export default Popover
