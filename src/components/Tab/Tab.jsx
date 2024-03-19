import classnames from 'classnames/bind'
import styles from './Tab.module.scss'

const cx = classnames.bind(styles)
function Tab() {
  return <div className={cx('wrapper')}>Tab</div>
}

export default Tab
