import Tippy from '@tippyjs/react/headless'
import classnames from 'classnames/bind'
import styles from './Menu.module.scss'

import { Popover as PopoverWrapper } from '~/components/Popover'
import MenuItem from './MenuItem'
import Header from './Header'
import { useState } from 'react'
const cx = classnames.bind(styles)

function Menu({ children, MenuItems = [], onChange }) {
  const [history, setHistory] = useState([{ data: MenuItems }])
  const currentMenu = history[history.length - 1]

  const renderMenuItems = () => {
    return currentMenu.data.map((menu, index) => (
      <MenuItem
        key={index}
        menu={menu}
        onClick={() => {
          // If the menu has children, add it to the history
          if (menu.children) {
            setHistory([...history, menu.children])
          } else {
            // Otherwise, call the onChange callback
            onChange && onChange(menu)
          }
        }}
      />
    ))
  }

  return (
    <div>
      <Tippy
        // visible={true}
        interactive={true}
        placement="bottom-end"
        render={(attrs) => (
          <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopoverWrapper className={cx('menu-popover')}>
              {history.length > 1 && (
                <Header
                  title={currentMenu.title}
                  onBack={() => {
                    // Remove the last item from the history
                    setHistory((prev) => prev.slice(0, -1))
                  }}
                />
              )}
              {renderMenuItems()}
            </PopoverWrapper>
          </div>
        )}
        onHide={() => {
          setHistory((prev) => prev.slice(0, 1))
        }}
      >
        {children}
      </Tippy>
    </div>
  )
}

export default Menu
