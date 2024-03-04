import classnames from 'classnames/bind'
import Styles from './AccountItem.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

const cx = classnames.bind(Styles)
function AccountItem() {
  return (
    <div className={cx('wrapper')}>
      <img
        className={cx('avatar')}
        src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/7e12cc1e90c4139b7387f2c7131624aa~c5_300x300.webp?lk3s=a5d48078&x-expires=1709715600&x-signature=ZKOGE9iviCZLn%2BUPs5WvpRKXpSY%3D"
        alt="hoaanhdao2k3"
      />
      <div className={cx('info')}>
        <p className={cx('name')}>
          <span className="">hoaanhdao2k3</span>
          <FontAwesomeIcon className={cx('check')} icon={faCircleCheck} />
        </p>
        <span className={cx('username')}>Kimbelhin</span>
      </div>
    </div>
  )
}

export default AccountItem
