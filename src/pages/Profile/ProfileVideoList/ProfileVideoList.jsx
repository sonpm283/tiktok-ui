import classnames from 'classnames/bind'
import styles from './ProfileVideoList.module.scss'
import ProfileVideo from '../ProfileVideo'
import VideoCardSkeleton from '../VideoCardSkeleton/VideoCardSkeleton'

const cx = classnames.bind(styles)

function ProfileVideoList({ videos, isLoading }) {
  return (
    <ul className={cx('wrapper')}>
      {!!videos.length &&
        videos.map((video, index) => {
          if (isLoading) {
            return <VideoCardSkeleton />
          } else {
            return <ProfileVideo key={index} video={video} />
          }
        })}
    </ul>
  )
}

export default ProfileVideoList
