import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'
import { NavLink } from 'react-router-dom'
import { ExploreIcon, FollowIcon, FriendIcon, HomeIcon } from '~/components/Icons'
import AccountItem from '~/components/AccountItem'
import Button from '~/components/Button'
import { useContext, useEffect, useState } from 'react'
import { userApi } from '~/apis/user.api'
import { AppContext } from '~/contexts/app.context'

const cx = classNames.bind(styles)

function SideBar() {
  const { isAuththenticated } = useContext(AppContext)
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (!isAuththenticated) return
    ;(async () => {
      const res = await userApi.getFollowingUser()
      if (res) {
        setUsers(res.data.metadata.followings)
      }
    })()
  }, [isAuththenticated])
  return (
    <aside className={cx('wrapper')}>
      <ul>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? cx('sidebar-link-active') : cx('sidebar-link')
            }
            to="/"
          >
            <div className={cx('icon')}>
              <HomeIcon />
            </div>
            <span>For You</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? cx('sidebar-link-active') : cx('sidebar-link')
            }
            to="/following"
          >
            <div className={cx('icon')}>
              <FollowIcon />
            </div>
            <span>Follwing</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? cx('sidebar-link-active') : cx('sidebar-link')
            }
            to="/friends"
          >
            <div className={cx('icon')}>
              <FriendIcon />
            </div>
            <span>Friends</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? cx('sidebar-link-active') : cx('sidebar-link')
            }
            to="/explore"
          >
            <div className={cx('icon')}>
              <ExploreIcon />
            </div>
            <span>Explore</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? cx('sidebar-link-active') : cx('sidebar-link')
            }
            to="/profile/123"
          >
            <div>
              <img
                className={cx('avatar')}
                src="https://images.unsplash.com/photo-1659646240684-a405b508c41f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdva3V8ZW58MHx8MHx8fDA%3D"
                alt="avatar"
              />
            </div>
            <span>Profile</span>
          </NavLink>
        </li>
      </ul>

      <div className={cx('following-area')}>
        <h2 className={cx('following-title')}>Following accounts</h2>
        <ul className={cx('following-list')}>
          {users &&
            users.map((user) => (
              <li key={user?._id}>
                <AccountItem user={user} className={cx('account-small')} />
              </li>
            ))}
        </ul>
        <Button text className={cx('seemore-btn')}>
          See more
        </Button>
      </div>
    </aside>
  )
}

export default SideBar
