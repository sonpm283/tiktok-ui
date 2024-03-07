import { useState } from 'react'
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
  // faSpinner,
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
  {
    icon: <FontAwesomeIcon icon={faBookmark} />,
    title: 'Favorites',
  },
  {
    icon: <FontAwesomeIcon icon={faCoins} />,
    title: 'Get Coins',
    href: '/coin',
  },
  {
    icon: <FontAwesomeIcon icon={faVideo} />,
    title: 'LIVE Studio',
  },
  {
    icon: <FontAwesomeIcon icon={faFileVideo} />,
    title: 'LIVE Creator Hub',
  },
  {
    icon: <FontAwesomeIcon icon={faGear} />,
    title: 'Settings',
    href: '/setting',
  },
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
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: 'Feedback and help',
    href: '/feedback',
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: 'Keyboard shortcuts',
  },
  {
    icon: <FontAwesomeIcon icon={faMoon} />,
    title: 'Dark mode',
  },
  {
    icon: <FontAwesomeIcon icon={faSignOut} />,
    title: 'Log out',
  },
]

function Header() {
  // const [searchResult, setSearchResult] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [isOpenModal, setIsOpenModal] = useState(true)

  const isAuthentication = false

  const handleChange = (e) => {
    const target = e.target
    setSearchValue(target.value)
  }

  // api call
  // useState(() => {
  //   setTimeout(() => {
  //     setSearchResult(['item'])
  //   }, 0)
  // }, [])

  // handle when menu item not have children
  const handleMenuChange = (menuItem) => {
    switch (menuItem.type) {
      case 'language':
        // handle change language
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
          visible={searchValue}
          render={(attrs) => (
            <div className={cx('search-result')} tabIndex="-1" {...attrs}>
              <PopoverWrapper>
                <h4 className={cx('search-title')}>Accounts</h4>
                <AccountItem />
                <AccountItem />
                <AccountItem />
                <AccountItem />
                <AccountItem />
                <AccountItem />
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
            <button type="button" className={cx('clear')} onClick={() => setSearchValue('')}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>

            {/* <FontAwesomeIcon className={cx('loading')} icon={faSpinner} /> */}

            <button type="button" className={cx('search-btn')}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </TippyHeadless>

        <div
          className={cx('actions', {
            'actions-login': isAuthentication,
          })}
        >
          <Button outline leftIcon={<FontAwesomeIcon icon={faPlus} />}>
            Upload
          </Button>
          {isAuthentication ? (
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

          <Menu MenuItems={isAuthentication ? MenuItemsLogin : MenuItems} onChange={handleMenuChange}>
            {isAuthentication ? (
              <button type="button" className={cx('avatar')}>
                <img
                  src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/7342149854531059717~c5_720x720.jpeg?lk3s=a5d48078&x-expires=1709863200&x-signature=15oNn5ykpW5uWx53EBhwbFFv6w4%3D&quot"
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
      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <LoginRegister />
      </Modal>
    </header>
  )
}

export default Header
