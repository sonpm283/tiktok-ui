import classnames from 'classnames/bind'
import styles from './Home.module.scss'
import Video from '~/components/Video'

const cx = classnames.bind(styles)

function Home() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
      </div>
    </div>
  )
}

export default Home
