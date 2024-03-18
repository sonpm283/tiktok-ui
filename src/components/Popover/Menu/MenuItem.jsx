import Button from '~/components/Button'
import classnames from 'classnames/bind'
import styles from './Menu.module.scss'

const cx = classnames.bind(styles)

function MenuItem({ menu, onClick }) {
  return (
    <Button
      className={cx('menu-item')}
      leftIcon={menu.icon}
      to={menu?.to}
      href={menu?.href}
      onClick={onClick}
    >
      {menu.title}
    </Button>
  )
}

export default MenuItem
