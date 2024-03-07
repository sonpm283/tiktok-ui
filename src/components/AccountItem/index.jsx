import classnames from 'classnames/bind'
import styles from './AccountItem.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

const cx = classnames.bind(styles)
function AccountItem() {
  return (
    <div className={cx('wrapper')}>
      <img
        className={cx('avatar')}
        src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/f6728bdcb21eb1e814ba91f844738e53~c5_100x100.jpeg?lk3s=a5d48078&x-expires=1709946000&x-signature=HwC5akTRYJ2YLtjBOZzlRrS4PUk%3D"
        alt="hoaanhdao2k3"
      />
      <div className={cx('info')}>
        <p className={cx('name')}>
          <span className="">sonpm2k3dzvd</span>
          <FontAwesomeIcon className={cx('check')} icon={faCircleCheck} />
        </p>
        <span className={cx('username')}>Kimbelhin</span>
      </div>
    </div>
  )
}

export default AccountItem
