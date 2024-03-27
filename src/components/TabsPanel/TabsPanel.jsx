import classnames from 'classnames/bind'
import styles from './TabsPanel.module.scss'
import { useState } from 'react'

const cx = classnames.bind(styles)
export default function TabsPanel(props) {
  const [selected, setSelected] = useState(props?.selected || 0)

  const renderTab = (index) => {
    setSelected(index)
  }

  const renderMenu = () => {
    const panels = props?.children
    return panels?.map((elem, index) => {
      let icon = elem.props.icon
      let display = elem.props.hide

      return display ? null : (
        <li
          key={index}
          className={cx('tab', {
            selected: index === selected,
          })}
          onClick={() => renderTab(index)}
        >
          {icon ? icon : null}
          <span> {elem.props.title}</span>
        </li>
      )
    })
  }

  return (
    <div>
      <ul className={cx('tabs')}>
        {renderMenu()}
        <div className={cx('line')}></div>
      </ul>
      <div className={cx('tab-content')}>{props.children[selected]}</div>
    </div>
  )
}
