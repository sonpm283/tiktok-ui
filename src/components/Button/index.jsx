import classnames from 'classnames/bind'
import styles from './Button.module.scss'
import { Link } from 'react-router-dom'

const cx = classnames.bind(styles)

function Button({
  to,
  href,
  primary = false,
  outline = false,
  text = false,
  rounded = false,
  disabled = false,
  xsmall = false,
  small = false,
  large = false,
  className,
  leftIcon,
  rightIcon,
  children,
  onClick,
  ...passProps
}) {
  let Button = 'button'

  // Pass all props to the button
  const props = {
    onClick,
    ...passProps,
  }

  // Remove all event handlers if the button is disabled
  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') && typeof props[key] === 'function') {
        delete props[key]
      }
    })
  }

  if (to) {
    props.to = to
    Button = Link
  } else if (href) {
    props.href = href
    Button = 'a'
  }

  // [className]: className is a dynamic class name
  const classes = cx('wrapper', {
    [className]: className,
    primary,
    outline,
    large,
    text,
    small,
    disabled,
    rounded,
    xsmall,
  })

  return (
    <Button className={classes} {...props}>
      {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
      <span className={cx('name')}>{children}</span>
      {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
    </Button>
  )
}

export default Button
