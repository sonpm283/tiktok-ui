import classnames from 'classnames/bind'
import styles from './Button.module.scss'
import { Link } from 'react-router-dom'

const cx = classnames.bind(styles)

function Button({
  to,
  href,
  primary = false,
  outline = false,
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

  const props = {
    onClick,
    ...passProps,
  }

  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') || typeof props[key] === 'function') {
        delete props[key]
      }
    })
  }

  console.log(props)

  if (to) {
    props.to = to
    Button = Link
  } else if (href) {
    props.href = href
    Button = 'a'
  }

  const classes = cx('wrapper', {
    [className]: className,
    primary,
    outline,
    large,
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
