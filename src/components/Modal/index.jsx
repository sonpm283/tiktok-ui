import classnames from 'classnames/bind'
import styles from './Modal.module.scss'

const cx = classnames.bind(styles)

function Modal({ open, children, onClose, closeBtn = false }) {
  if (!open) return null
  return (
    <div className={cx('wrapper')}>
      {children}
      {closeBtn && (
        <button type="button" onClick={onClose}>
          Close Modal
        </button>
      )}
    </div>
  )
}

export default Modal
