import classnames from 'classnames/bind'
import styles from './AsideButton.module.scss'
import { HearIcon, HearIconActive, ShareIcon } from '../Icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'

const cx = classnames.bind(styles)
function AsideButton({ reaction, isLiked, onUnLike, onLike }) {
  const { like, comment, share } = reaction
  return (
    <div className={cx('wrapper')}>
      <div className={cx('action-list')}>
        <div className={cx('action-item')}>
          {isLiked ? (
            <button className={cx('action-btn')} onClick={onUnLike}>
              <HearIconActive />
            </button>
          ) : (
            <button className={cx('action-btn')} onClick={onLike}>
              <HearIcon />
            </button>
          )}
          <span>{like}</span>
        </div>
        <div className={cx('action-item')}>
          <button className={cx('action-btn')}>
            <FontAwesomeIcon className={cx('comment-icon')} icon={faComment} />
          </button>
          <span>{comment}</span>
        </div>
        <div className={cx('action-item')}>
          <button className={cx('action-btn')}>
            <ShareIcon />
          </button>
          <span>{share}</span>
        </div>
      </div>
    </div>
  )
}

export default AsideButton
