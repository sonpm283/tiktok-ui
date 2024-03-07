import styles from './Input.module.scss'
import classnames from 'classnames/bind'

const cx = classnames.bind(styles)

function Input(props) {
  const { name, type, register, placeholder } = props
  return (
    <div className={cx('wrapper')}>
      <input
        autoComplete="on"
        name={name}
        type={type}
        className={cx('input')}
        placeholder={placeholder}
        {...register(name)}
      />
      <div className={cx('error-message')}>{props.errorMessage}</div>
    </div>
  )
}

export default Input
