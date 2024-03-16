import { useContext, useEffect, useState } from 'react'
import classnames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEarthAsia,
  faKeyboard,
  faCircleXmark,
  faEllipsisVertical,
  faMagnifyingGlass,
  faPlus,
  faSpinner,
  faCircleQuestion,
  faSignOut,
  faUser,
  faBookmark,
  faCoins,
  faVideo,
  faFileVideo,
  faGear,
  faMoon,
} from '@fortawesome/free-solid-svg-icons'

import Tippy from '@tippyjs/react'
import TippyHeadless from '@tippyjs/react/headless'
import 'tippy.js/dist/tippy.css' // optional

import styles from './Header.module.scss'
import images from '~/assets/images'
import { Popover as PopoverWrapper } from '~/components/Popover'
import AccountItem from '~/components/AccountItem'
import Button from '~/components/Button'
import Menu from '~/components/Popover/Menu'
import { InboxIcon, MessageIcon } from '~/components/Icons'
import Modal from '~/components/Modal'
import LoginRegister from '~/components/LoginRegister'
import { AppContext } from '~/contexts/app.context'
import { authApi } from '~/apis/auth.api'
import { toast } from 'react-toastify'
import useDebounce from '~/hooks/useDebounce'
import useFetch from '~/hooks/useFetch'
import { userApi } from '~/apis/user.api'
import { set } from 'react-hook-form'

const cx = classnames.bind(styles)

const MenuItems = [
  {
    icon: <FontAwesomeIcon icon={faEarthAsia} />,
    title: 'English',

    children: {
      title: 'Language',
      data: [
        {
          code: 'en',
          title: 'English',
        },
        {
          code: 'vi',
          title: 'Tiếng Việt',
        },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: 'Feedback and help',
    href: '/feedback',
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: 'Keyboard shortcuts',
  },
]

const MenuItemsLogin = [
  {
    icon: <FontAwesomeIcon icon={faUser} />,
    title: 'View profile',
    href: '/@sonpm283',
  },
  // {
  //   icon: <FontAwesomeIcon icon={faBookmark} />,
  //   title: 'Favorites',
  // },
  // {
  //   icon: <FontAwesomeIcon icon={faCoins} />,
  //   title: 'Get Coins',
  //   href: '/coin',
  // },
  // {
  //   icon: <FontAwesomeIcon icon={faVideo} />,
  //   title: 'LIVE Studio',
  // },
  // {
  //   icon: <FontAwesomeIcon icon={faFileVideo} />,
  //   title: 'LIVE Creator Hub',
  // },
  // {
  //   icon: <FontAwesomeIcon icon={faGear} />,
  //   title: 'Settings',
  //   href: '/setting',
  // },
  {
    icon: <FontAwesomeIcon icon={faEarthAsia} />,
    title: 'English',

    children: {
      title: 'Language',
      data: [
        {
          code: 'العربية',
          title: 'العربية',
        },
        {
          code: 'العربية',
          title: 'العربية',
        },
        {
          code: 'Cebuano',
          title: 'Cebuano (Pilipinas)',
        },
        {
          code: 'vi',
          title: 'Tiếng Việt',
        },
        {
          code: 'en',
          title: 'English',
        },
        {
          code: '한국어',
          title: '한국어 (대한민국)',
        },
        {
          code: '简体中文',
          title: '简体中文',
        },
      ],
    },
  },
  // {
  //   icon: <FontAwesomeIcon icon={faCircleQuestion} />,
  //   title: 'Feedback and help',
  //   href: '/feedback',
  // },
  // {
  //   icon: <FontAwesomeIcon icon={faKeyboard} />,
  //   title: 'Keyboard shortcuts',
  // },
  // {
  //   icon: <FontAwesomeIcon icon={faMoon} />,
  //   title: 'Dark mode',
  // },
  {
    icon: <FontAwesomeIcon icon={faSignOut} />,
    type: 'logout',
    title: 'Log out',
  },
]

function Header() {
  // const [searchResult, setSearchResult] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [isOpenModal, setIsOpenModal] = useState(true)
  const { isAuththenticated, setIsAuthenticated, setProfile } = useContext(AppContext)
  const [searchResult, setSearchResult] = useState([])
  const [menuData, setMenuData] = useState([])
  const [searchTerm] = useDebounce(searchValue, 300)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isAuththenticated) {
      setMenuData(MenuItemsLogin)
    } else {
      setMenuData(MenuItems)
    }
  }, [isAuththenticated])

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResult([])
      return
    }
    let delaySetLoading

    const fetchSearchResult = async () => {
      setIsLoading(true)
      const res = await userApi.searchUser(searchTerm)
      if (res) {
        delaySetLoading = setTimeout(() => {
          setIsLoading(false)
        }, 300)
        setSearchResult(res.data.metadata)
      }
    }
    fetchSearchResult()

    return () => clearTimeout(delaySetLoading)
  }, [searchTerm])

  const handleChange = (e) => {
    const target = e.target
    setSearchValue(target.value)
  }

  // handle when menu item not have children
  const handleMenuChange = (menuItem) => {
    switch (menuItem.type) {
      case 'language':
        // handle change language
        break
      case 'logout':
        authApi.logout()
        setIsAuthenticated(false)
        setProfile(null)
        toast.warning('Logout success!')
        break
      default:
    }
    // do something with menu item
    // console.log(menuItem)
  }

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('logo')}>
          <Link to="/">
            <img src={images.logo} alt="TikTok" />
          </Link>
        </div>
        <TippyHeadless
          interactive={true}
          // visible={searchResult.length > 0}
          visible={searchResult.length > 0}
          render={(attrs) => (
            <div className={cx('search-result')} tabIndex="-1" {...attrs}>
              <PopoverWrapper>
                <h4 className={cx('search-title')}>Accounts</h4>
                {!!searchResult.length &&
                  searchResult.map((user) => <AccountItem key={user._id} user={user} />)}
              </PopoverWrapper>
            </div>
          )}
        >
          <div className={cx('search')}>
            <input
              value={searchValue}
              onChange={handleChange}
              type="text"
              placeholder="Search accounts and videos"
              spellCheck={false}
            />

            {!isLoading && searchValue && (
              <button type="button" className={cx('clear')} onClick={() => setSearchValue('')}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            )}

            {isLoading && searchValue && (
              <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
            )}

            <button type="button" className={cx('search-btn')}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </TippyHeadless>

        <div
          className={cx('actions', {
            'actions-login': isAuththenticated,
          })}
        >
          <Button outline leftIcon={<FontAwesomeIcon icon={faPlus} />}>
            Upload
          </Button>
          {isAuththenticated ? (
            <>
              <Tippy placement="bottom" content="Messages">
                <button type="button" className={cx('action-btn')}>
                  <MessageIcon />
                </button>
              </Tippy>

              <Tippy content="Inbox" placement="bottom">
                <button type="button" className={cx('action-btn')}>
                  <InboxIcon />
                </button>
              </Tippy>
            </>
          ) : (
            <>
              <Button primary onClick={() => setIsOpenModal(true)}>
                Login
              </Button>
            </>
          )}

          <Menu MenuItems={menuData} onChange={handleMenuChange}>
            {isAuththenticated ? (
              <button type="button" className={cx('avatar')}>
                <img
                  src="https://images.unsplash.com/photo-1659646240684-a405b508c41f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdva3V8ZW58MHx8MHx8fDA%3D"
                  alt="sonpm"
                />
              </button>
            ) : (
              <button type="button" className={cx('menu-btn')}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
      </div>

      {!isAuththenticated && (
        <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
          <LoginRegister />
        </Modal>
      )}
    </header>
  )
}

export default Header
