import classnames from 'classnames/bind'
import styles from './UserProfile.module.scss'
import Button from '~/components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from '~/components/Image'
import { faCircleCheck, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

const cx = classnames.bind(styles)

export default function UserProfile({ userInfo }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('profile')}>
        <Image className={cx('avatar')} src={userInfo?.avatar} alt={userInfo?.name} />
        <div className={cx('info')}>
          <strong className={cx('user-id')}>
            <span>user809048549</span>
            {userInfo.tick && <FontAwesomeIcon className={cx('check')} icon={faCircleCheck} />}
          </strong>
          <p className={cx('user-name')}>{userInfo?.name}</p>
          <Button
            className={cx('edit-btn')}
            outline
            leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
          >
            Edit profile
          </Button>
        </div>
      </div>
      <div className={cx('interact')}>
        <span>
          <strong>{userInfo?.followings?.length || 0}</strong> Following
        </span>
        <span>
          <strong>{userInfo?.followers?.length || 0}</strong> Followers
        </span>
        <span>
          <strong>0</strong> Likes
        </span>
      </div>
    </div>
  )
}
