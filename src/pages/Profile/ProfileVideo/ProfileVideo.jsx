import classnames from 'classnames/bind'
import styles from './ProfileVideo.module.scss'

const cx = classnames.bind(styles)
export default function ProfileVideo({ video }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('video-wrap')}>
        <video controls loop>
          <source src={video.media_url} type="video/mp4"></source>
        </video>
      </div>
      <p className={cx('content')}>{video.content}</p>
    </div>
  )
}
