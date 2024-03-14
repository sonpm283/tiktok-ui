import classnames from 'classnames/bind'
import styles from './Home.module.scss'
import Video from '~/components/Video'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { videoApi } from '~/apis/video.api'
const cx = classnames.bind(styles)

function Home() {
  const INIT_PAGE = useRef(1)
  const [videos, setVideos] = useState([])
  const [page, setPage] = useState(INIT_PAGE.current)
  const [noMoreVideo, setNoMoreVideo] = useState(false)

  const loadMore = useCallback(() => {
    return setTimeout(async () => {
      try {
        const res = await videoApi.getVideoList({ _page: page })
        if (Array.isArray(res.data.metadata.metadata)) {
          setVideos((prev) => [...prev, ...res.data.metadata.metadata])
          setPage((prev) => prev + 1)
        }
        if (
          res.data.metadata.metadata.length === 0 ||
          page === res.data.metadata.pagination.total
        ) {
          setNoMoreVideo(true)
        }
      } catch (error) {
        console.log(error)
      }
    }, 200)
  }, [page, setVideos])

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
                    <p className={cx('loading-text')}>No more video</p>
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
