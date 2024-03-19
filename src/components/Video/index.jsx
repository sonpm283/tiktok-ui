import classnames from 'classnames/bind'
import styles from './Video.module.scss'
import { useContext, useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faMusic } from '@fortawesome/free-solid-svg-icons'
import Button from '../Button'
import AsideButton from '../AsideButton'
import useElementOnScreen from '~/hooks/useElementOnScreen'
import { checkvalidImageURL } from '~/utils/utils'
import { videoApi } from '~/apis/video.api'
import { AppContext } from '~/contexts/app.context'
import { userApi } from '~/apis/user.api'

const cx = classnames.bind(styles)

function Video({ video }) {
  const options = { root: null, rootMargin: '0px', threshold: 0.8 }
  const videoRef = useRef()
  const isVisible = useElementOnScreen(options, videoRef)
  const { profile } = useContext(AppContext)
  const [likeCount, setLikeCount] = useState(video.likes?.length || 0)
  const [isFollow, setIsFollow] = useState(false)
  const [isLiked, setIsLiked] = useState(() => {
    if (!video.likes) return false
    return video.likes.includes(profile._id)
  })

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

  useEffect(() => {
    if (!profile?._id || !video.user_id?._id) return
    ;(async () => {
      const userLoginId = profile._id
      const res = await userApi.getInfo(userLoginId)
      const user = res.data.metadata

      if (user.followings?.includes(video.user_id._id)) {
        setIsFollow(true)
      }
    })()
  }, [profile, video.user_id])

  const handleFollow = (id) => async () => {
    try {
      await userApi.follow(id)
      setIsFollow(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUnFollow = (id) => async () => {
    try {
      await userApi.unFollow(id)
      setIsFollow(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLike = async () => {
    try {
      await videoApi.likeVideo(video._id)
      setIsLiked(true)
      setLikeCount((prev) => prev + 1)
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleUnLike = async () => {
    try {
      await videoApi.unLikeVideo(video._id)
      setIsLiked(false)
      setLikeCount((prev) => prev - 1)
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('avatar')}>
          <img
            src={
              // (checkvalidImageURL(video.user_id.avatar) && video.user_id.avatar) ||
              'https://images.unsplash.com/photo-1659646240684-a405b508c41f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdva3V8ZW58MHx8MHx8fDA%3D'
            }
            alt="sonpm"
          />
        </div>
        <div className={cx('content')}>
          <div className={cx('author')}>
            <div className={cx('name')}>{video.user_id?.name || 'user name'}</div>
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
              isLiked={isLiked}
              onLike={handleLike}
              onUnLike={handleUnLike}
              reaction={{
                like: likeCount,
                comment: 1,
                share: 0,
              }}
            />
          </div>
        </div>

        <Button
          onClick={isFollow ? handleUnFollow(video.user_id._id) : handleFollow(video.user_id._id)}
          outline
          className={cx('follow-btn', {
            'is-followed': isFollow,
          })}
        >
          {isFollow ? 'Following' : 'Follow'}
        </Button>
      </div>
    </div>
  )
}

export default Video
