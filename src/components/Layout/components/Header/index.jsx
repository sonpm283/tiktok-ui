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
  faSpinner,
  faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons'

import Tippy from '@tippyjs/react/headless'
import styles from './Header.module.scss'
import images from '~/assets/images'
import { Popover as PopoverWrapper } from '~/components/Popover'
import AccountItem from '~/components/AccountItem'
import Button from '~/components/Button'
import Menu from '~/components/Popover/Menu'

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

          children: {
            title: 'Language 1',
            data: [
              {
                code: 'en',
                title: 'English 1',

                children: {
                  title: 'Language 2',
                  data: [
                    {
                      code: 'en',
                      title: 'English 2',
                    },
                    {
                      code: 'vi',
                      title: 'Tiếng Việt 2',
                    },
                  ],
                },
              },
              {
                code: 'vi',
                title: 'Tiếng Việt 1',
              },
            ],
          },
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

function Header() {
  const [searchResult, setSearchResult] = useState([])
  useState(() => {
    setTimeout(() => {
      setSearchResult(['item'])
    }, 0)
  }, [])

  // handle when menu item not have children
  const handleMenuChange = (menuItem) => {
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
        <Tippy
          interactive={true}
          visible={searchResult.length > 0}
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
            <input type="text" placeholder="Search accounts and videos" spellCheck={false} />
            <button type="button" className={cx('clear')}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />

            <button type="button" className={cx('search-btn')}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </Tippy>
        <div className={cx('action')}>
          <Button outline leftIcon={<FontAwesomeIcon icon={faPlus} />}>
            Upload
          </Button>
          <Button primary>Login</Button>

          <Menu MenuItems={MenuItems} onChange={handleMenuChange}>
            <button type="button" className={cx('menu-btn')}>
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
          </Menu>
        </div>
      </div>
    </header>
  )
}

export default Header
