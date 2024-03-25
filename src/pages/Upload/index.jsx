import classnames from 'classnames/bind'
import styles from './Upload.module.scss'
import VideoUpload from './VideoUpload'

const cx = classnames.bind(styles)

function Upload() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <VideoUpload />
      </div>
    </div>
  )
}

export default Upload
