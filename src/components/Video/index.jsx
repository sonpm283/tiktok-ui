import classnames from 'classnames/bind'
import styles from './Video.module.scss'
import video from '~/assets/videos/video.mp4'
import { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faMusic } from '@fortawesome/free-solid-svg-icons'
import Button from '../Button'
import AsideButton from '../AsideButton'

const cx = classnames.bind(styles)

function Video() {
  const vidRef = useRef()

  useEffect(() => {}, [])

  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('avatar')}>
          <img
            src="https://images.unsplash.com/photo-1659646240684-a405b508c41f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdva3V8ZW58MHx8MHx8fDA%3D"
            alt="Son Hivelab"
          />
        </div>
        <div className={cx('content')}>
          <div className={cx('author')}>
            <div className={cx('name')}>Son Hivelab</div>
            <div className={cx('icon')}>
              <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} />
            </div>
            <div className={cx('nick-name')}>VILMEI</div>
          </div>
          <div className={cx('description')}>
            Transform your hair from flat to fabulous with our volumizing powder.
          </div>
          <div className={cx('tag')}>#livephotos #interface #capcut #trending #vibes #mood</div>
          <div className={cx('song')}>
            <FontAwesomeIcon className={cx('music-icon')} icon={faMusic} />
            <span>original sound - CAPCUT TEMPLATE TRENDS - CAPCUT TEMPLATES</span>
          </div>
          <div className={cx('tagname')}>
            <img src="https://p9-sg.tiktokcdn.com/obj/tiktok-obj/capcut_logo_64px_bk.png" alt="" />
            CapCut · Edit like a pro CapCut · Edit like a pro
          </div>

          <div className={cx('video')}>
            <div className={cx('video-wrap')}>
              <video autoPlay controls loop muted ref={vidRef}>
                <source src={video} type="video/mp4"></source>
              </video>

              <AsideButton />
            </div>
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
