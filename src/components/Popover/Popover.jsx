import classnames from 'classnames/bind'
import Styles from './Popover.module.scss'
const cx = classnames.bind(Styles)

function Popover({ children }) {
  return <div className={cx('wrapper')}>{children}</div>
}

export default Popover
