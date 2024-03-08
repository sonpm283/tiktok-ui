import classnames from 'classnames/bind'
import styles from './AsideButton.module.scss'
import { HearIcon, ShareIcon } from '../Icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'

const cx = classnames.bind(styles)
function AsideButton() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('action-list')}>
        <div className={cx('action-item')}>
          <button className={cx('action-btn')}>
            <HearIcon />
          </button>
          <span>657K</span>
        </div>
        <div className={cx('action-item')}>
          <button className={cx('action-btn')}>
            <FontAwesomeIcon className={cx('comment-icon')} icon={faComment} />
          </button>
          <span>3937</span>
        </div>
        <div className={cx('action-item')}>
          <button className={cx('action-btn')}>
            <ShareIcon />
          </button>
          <span>4761</span>
        </div>
      </div>
    </div>
  )
}

export default AsideButton
