import classnames from 'classnames/bind'
import styles from './LoginRegister.module.scss'
import Button from '../Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { AppleIcon, FacebookIcon, GoogleIcon, UserIcon, LineIcon, KakaoIcon, QrCodeIcon, TwitterIcon } from '../Icons'
import { useState } from 'react'

const cx = classnames.bind(styles)

function LoginRegister() {
  const [showAllButton, setShowAllButton] = useState(false)
  const [login, setLogin] = useState(true)

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('title')}>{login ? 'Log in to TikTok' : 'Sign up form TikTok'}</h2>

      <div className={cx('inner')}>
        <div className={cx('method')}>
          {login && (
            <Button className={cx('method-btn')} outline>
              <QrCodeIcon />
              <span>Use QR code</span>
            </Button>
          )}

          <Button className={cx('method-btn')} outline>
            <UserIcon />
            <span> Use phone / email / username</span>
          </Button>
          <Button className={cx('method-btn')} outline>
            <FacebookIcon />
            <span>Continue with Facebook</span>
          </Button>
          <Button className={cx('method-btn')} outline>
            <GoogleIcon />
            <span>Continue with Google</span>
          </Button>

          {showAllButton && (
            <>
              <Button className={cx('method-btn')} outline>
                <LineIcon />
                <span>Continue with LINE</span>
              </Button>
              <Button className={cx('method-btn')} outline>
                <TwitterIcon />
                <span>Continue with Twitter</span>
              </Button>
              <Button className={cx('method-btn')} outline>
                <KakaoIcon />
                <span>Continue with KakaoTalk</span>
              </Button>
              <Button className={cx('method-btn')} outline>
                <AppleIcon />
                <span>Continue with Apple</span>
              </Button>
            </>
          )}

          {!showAllButton && (
            <div className={cx('btn-box')}>
              <button onClick={() => setShowAllButton(true)} type="button" className={cx('more-btn')}>
                <FontAwesomeIcon icon={faChevronDown} />
              </button>
            </div>
          )}
        </div>

        <div className={cx('line')}>
          <span>OR</span>
        </div>

        <Button primary className={cx('confirm-btn')}>
          Continue á guest
        </Button>
        <p className={cx('notice')}>
          By continuing with an account located in <a href="#none">Vietnam</a>, you agree to our
          <a href="#none"> Terms of Service</a> and acknowledge that you have read our
          <a href="#none"> Privacy Policy.</a>
        </p>
      </div>

      <div className={cx('footer')}>
        {login ? <span>Don’t have an account? </span> : <span>Already have an account?</span>}
        <Button text className={cx('footer-btn')} onClick={() => setLogin((prev) => !prev)}>
          {login ? ' Sign up' : 'Log in'}
        </Button>
      </div>
    </div>
  )
}

export default LoginRegister
