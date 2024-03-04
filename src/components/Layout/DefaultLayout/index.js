import classnames from 'classnames/bind'
import Header from '~/components/Layout/components/Header'
import SideBar from '~/components/Layout/DefaultLayout/Sidebar'
import Styles from './DefaultLayout.module.scss'
const cx = classnames.bind(Styles)

function DefaultLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('container')}>
        <SideBar />
        <div className={cx('content')}>{children}</div>
      </div>
    </div>
  )
}

export default DefaultLayout
