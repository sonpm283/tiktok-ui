import classnames from 'classnames/bind'
import styles from './Video.module.scss'
import { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faMusic } from '@fortawesome/free-solid-svg-icons'
import Button from '../Button'
import AsideButton from '../AsideButton'
import useElementOnScreen from '~/hooks/useElementOnScreen'
import { checkvalidImageURL } from '~/utils/utils'

const cx = classnames.bind(styles)

function Video({ video }) {
  const options = { root: null, rootMargin: '0px', threshold: 0.8 }
  const videoRef = useRef()
  const isVisible = useElementOnScreen(options, videoRef)

  useEffect(() => {
    const playVideo = async () => {
      if (isVisible && videoRef.current) {
        try {
          videoRef.current.curentTime = 0
          await videoRef.current.play()
        } catch (error) {
          console.log('error', error)
        }
      } else {
        videoRef.current.pause()
      }
    }

    playVideo()
  }, [isVisible])

  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('avatar')}>
          <img
            src={
              // (checkvalidImageURL(video.user.avatar) && video.user.avatar) ||
              'https://images.unsplash.com/photo-1659646240684-a405b508c41f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdva3V8ZW58MHx8MHx8fDA%3D'
            }
            alt="sonpm"
          />
        </div>
        <div className={cx('content')}>
          <div className={cx('author')}>
            <div className={cx('name')}>SonHivelab</div>
            <div className={cx('icon')}>
              <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} />
            </div>
            <div className={cx('nick-name')}>VILMEI</div>
          </div>
          <div className={cx('description')}>{video.content}</div>
          <div className={cx('tag')}>#livephotos #interface #capcut #trending #vibes #mood</div>

          {video.music && (
            <div className={cx('song')}>
              <FontAwesomeIcon className={cx('music-icon')} icon={faMusic} />
              <span>{video.music}</span>
            </div>
          )}

          <div className={cx('tagname')}>
            <img src="https://p9-sg.tiktokcdn.com/obj/tiktok-obj/capcut_logo_64px_bk.png" alt="" />
            CapCut · Edit like a pro CapCut · Edit like a pro
          </div>
          <div className={cx('video')}>
            <div className={cx('video-wrap')}>
              <video autoPlay controls loop ref={videoRef}>
                <source src={video.media_url} type="video/mp4"></source>
              </video>
            </div>
            <AsideButton
              reaction={{
                like: 1,
                comment: 1,
                share: 0,
              }}
            />
          </div>
        </div>

        <Button outline className={cx('follow-btn')}>
          Follow
        </Button>
      </div>
    </div>
  )
}

export default Video
