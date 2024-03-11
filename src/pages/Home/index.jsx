import classnames from 'classnames/bind'
import styles from './Home.module.scss'
import Video from '~/components/Video'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import * as timelineService from '~/services/timelineService'
import { getAccessToken } from '~/utils/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const cx = classnames.bind(styles)

function Home() {
  const INIT_PAGE = useRef(5)
  const [videos, setVideos] = useState([])
  const [page, setPage] = useState(INIT_PAGE.current)
  const [noMoreVideo, setNoMoreVideo] = useState(false)
  const accessToken = getAccessToken()

  const loadMore = useCallback(() => {
    return setTimeout(() => {
      timelineService
        .getVideos({ type: 'for-you', page: page, accessToken: accessToken })
        .then((res) => {
          if (Array.isArray(res.data)) {
            setVideos((prev) => [...prev, ...res.data])
            setPage((prev) => prev + 1)
          }
          if (res.data.length === 0 || page === res.meta.pagination.total) {
            setNoMoreVideo(true)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }, 200)
  }, [page, accessToken, setVideos])

  useEffect(() => {
    const timeout = loadMore()
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <Virtuoso
          data={videos}
          useWindowScroll
          endReached={() => {
            if (!noMoreVideo) {
              loadMore()
            }
          }}
          itemContent={(index, video) => <Video key={index} video={video} />}
          components={{
            Footer: () => {
              return (
                <div className={cx('loading')}>
                  {noMoreVideo ? (
                    <p>No more video</p>
                  ) : (
                    <FontAwesomeIcon className="" icon={faSpinner} />
                  )}
                </div>
              )
            },
          }}
        />
      </div>
    </div>
  )
}

export default Home
