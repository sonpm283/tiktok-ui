import classnames from 'classnames/bind'
import styles from './AccountItem.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

const cx = classnames.bind(styles)
function AccountItem({ className, user }) {
  if(!user) return null
  return (
    <div
      className={cx('wrapper', {
        [className]: className,
      })}
    >
      <img
        className={cx('avatar')}
        src="https://images.unsplash.com/photo-1659646240684-a405b508c41f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdva3V8ZW58MHx8MHx8fDA%3D"
        alt="hoaanhdao2k3"
      />
      <div className={cx('info')}>
        <p className={cx('name')}>
          <span className="">{user.name}</span>
          {user.tick && <FontAwesomeIcon className={cx('check')} icon={faCircleCheck} />}
        </p>
        <span className={cx('username')}>Kimbelhin</span>
      </div>
    </div>
  )
}

export default AccountItem
