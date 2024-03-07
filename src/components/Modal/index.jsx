import classnames from 'classnames/bind'
import styles from './Modal.module.scss'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
const cx = classnames.bind(styles)

function Modal({ isOpen, children, onClose, closeBtn = false }) {
  const modelRef = useRef(null)

  useEffect(() => {
    //handle click outside
    const handleClickOutside = (e) => {
      // Check if (e.target) is inside modelRef.current
      // This means that if you click outside the model content, the modal will be closed, for example, clicking on the overlay (modelRef.current does not contain the overlay)
      if (modelRef.current && !modelRef.current.contains(e.target)) {
        onClose()
      }
    }

    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [onClose])

  if (!isOpen) return null

  return createPortal(
    <div className={cx('wrapper')}>
      <div className={cx('content')} ref={modelRef}>
        {children}
      </div>
      {closeBtn && (
        <button type="button" onClick={onClose}>
          Close Modal
        </button>
      )}
    </div>,
    document.getElementById('modal'),
  )
}

export default Modal
