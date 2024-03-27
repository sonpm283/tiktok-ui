import classnames from 'classnames/bind'
import styles from './UserProfile.module.scss'
import Button from '~/components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from '~/components/Image'
import { faCircleCheck, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import TabsPanel from '~/components/TabsPanel'
import Tab from '~/components/Tab'
import { LockIcon } from '~/components/Icons'
import ProfileVideoList from '../ProfileVideoList/ProfileVideoList'
import { useEffect, useState } from 'react'
import { videoApi } from '~/apis/video.api'
import { useLocation } from 'react-router-dom'

const cx = classnames.bind(styles)

export default function UserProfile({ userInfo }) {
  const location = useLocation()
  const userId = location.pathname.split('/')[2]
  const [profileVideos, setProfileVideos] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const res = await videoApi.getVideoByUserId(userId)
      if (!res) return null
      setIsLoading(false)
      setProfileVideos(res.data.metadata.metadata)
    })()
  }, [userId])
  return (
    <div className={cx('wrapper')}>
      <div className={cx('profile')}>
        <Image
          className={cx('avatar')}
          src={
            userInfo?.avatar
              ? userInfo?.avatar
              : 'https://images.unsplash.com/photo-1659646240684-a405b508c41f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdva3V8ZW58MHx8MHx8fDA%3D'
          }
          alt={userInfo?.name}
        />
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

      <div className={cx('tab-area')}>
        <TabsPanel>
          <Tab title="Videos">
            <ProfileVideoList videos={profileVideos} isLoading={isLoading} />
          </Tab>
          <Tab title="Favorites" icon={<LockIcon />}></Tab>
          <Tab title="Liked" icon={<LockIcon />}>
            Lorem ipsum dolor amet glossier vinyl fanny pack, echo park mustache helvetica hexagon.
            Pinterest enamel pin flexitarian cred literally air plant yr vape small batch ennui
            taiyaki af. Quinoa kombucha asymmetrical, pitchfork 3 wolf moon tilde enamel pin bitters
            XOXO. Gluten-free distillery semiotics, franzen DIY af green juice cornhole freegan
            cloud bread. Master cleanse pok pok edison bulb flannel, banjo mlkshk YOLO pour-over.
            Jean shorts intelligentsia snackwave pug.Lorem ipsum dolor amet glossier vinyl fanny
            pack, echo park mustache helvetica hexagon. Pinterest enamel pin flexitarian cred
            literally air plant yr vape small batch ennui taiyaki af. Quinoa kombucha asymmetrical,
            pitchfork 3 wolf moon tilde enamel pin bitters XOXO. Gluten-free distillery semiotics,
            franzen DIY af green juice cornhole freegan cloud bread. Master cleanse pok pok edison
            bulb flannel, banjo mlkshk YOLO pour-over. Jean shorts intelligentsia snackwave pug.
          </Tab>
        </TabsPanel>
      </div>
    </div>
  )
}
