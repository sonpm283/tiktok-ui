import classnames from 'classnames/bind'
import styles from './Tab.module.scss'

const cx = classnames.bind(styles)
function Tab({ children }) {
  return <div className={cx('wrapper')}>{children}</div>
}

export default Tab
