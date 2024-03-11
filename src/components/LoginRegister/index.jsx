import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import classnames from 'classnames/bind'
import styles from './LoginRegister.module.scss'
import Button from '../Button'
import { loginSchema, registerSchema } from '~/utils/rules'
import { authApi } from '~/apis/auth.api'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import { AppContext } from '~/contexts/app.context'

import {
  AppleIcon,
  FacebookIcon,
  GoogleIcon,
  UserIcon,
  LineIcon,
  KakaoIcon,
  QrCodeIcon,
  TwitterIcon,
} from '../Icons'
import Input from '../Input'

const cx = classnames.bind(styles)

function LoginRegister() {
  const [showAllButton, setShowAllButton] = useState(false)
  const [toggleScreen, setToggleScreen] = useState(true)
  const [loginScreen, setLoginScreen] = useState(false)
  const [registerScreen, setRegisterScreen] = useState(false)
  const { setIsAuthenticated } = useContext(AppContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerScreen ? registerSchema : loginSchema),
    defaultValues: {
      fullname: '',
      username: '',
      password: '',
      confirm_password: '',
    },
  })

  const onSubmit = handleSubmit((data) => {
    if (registerScreen) {
      //call api register
      //pick username and password from data
      const { fullname, username, password } = data
      const payload = { name: fullname, email: username, password }

      const fetchApi = async () => {
        try {
          const res = await authApi.register(payload)
          setIsAuthenticated(true)

          toast.success('Register success!!')
        } catch (error) {
          toast.error(error.response.data.message)
        }
      }
      fetchApi()
    } else {
      // capp api login
    }
  })

  return (
    <div className={cx('wrapper')}>
      {!loginScreen ? (
        <h2 className={cx('title')}>{toggleScreen ? 'Log in to TikTok' : 'Sign up form TikTok'}</h2>
      ) : (
        <h2 className={cx('title')}>{registerScreen ? 'Sign up' : 'Log in'}</h2>
      )}

      <div
        className={cx('inner', {
          'inner-form': loginScreen,
        })}
      >
        {!loginScreen ? (
          <>
            <div className={cx('method')}>
              {toggleScreen && (
                <Button className={cx('method-btn')} outline>
                  <QrCodeIcon />
                  <span>Use QR code</span>
                </Button>
              )}

              {toggleScreen ? (
                <Button
                  className={cx('method-btn')}
                  outline
                  onClick={() => {
                    setLoginScreen(true)
                    setRegisterScreen(false)
                  }}
                >
                  <UserIcon />
                  <span>Use phone / email / username</span>
                </Button>
              ) : (
                <Button
                  className={cx('method-btn')}
                  outline
                  onClick={() => {
                    setLoginScreen(true)
                    setRegisterScreen(true)
                  }}
                >
                  <UserIcon />
                  <span>Use phone or email</span>
                </Button>
              )}

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
                  <button
                    onClick={() => setShowAllButton(true)}
                    type="button"
                    className={cx('more-btn')}
                  >
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
          </>
        ) : (
          <>
            <form className={cx('form')} onSubmit={onSubmit}>
              <div className={cx('form-label')}>
                <span className={cx('text')}>{registerScreen ? 'Email' : 'Email or username'}</span>
                <span className={cx('form-label-btn')}>
                  {registerScreen ? 'Sign up with phone' : 'Log in with phone'}
                </span>
              </div>
              <div className={cx('input-box')}>
                {registerScreen && (
                  <Input
                    register={register}
                    name="fullname"
                    type="text"
                    placeholder="Full name"
                    errorMessage={errors.fullname?.message || ''}
                  />
                )}
                <Input
                  register={register}
                  name="username"
                  type="text"
                  placeholder="Email or username"
                  errorMessage={errors.username?.message || ''}
                />
              </div>
              <div className={cx('input-box')}>
                <Input
                  register={register}
                  name="password"
                  type="password"
                  placeholder="Password"
                  errorMessage={errors.password?.message || ''}
                />

                {!registerScreen && <button className={cx('forgot-btn')}>Forgot password?</button>}
              </div>
              {registerScreen && (
                <div className={cx('input-box')}>
                  <Input
                    register={register}
                    name="confirm_password"
                    type="password"
                    placeholder="Confirm password"
                    errorMessage={errors.confirm_password?.message || ''}
                  />
                </div>
              )}
              <Button primary className={cx('submit-btn')}>
                {registerScreen ? 'Sign up' : 'Log in'}
              </Button>
            </form>
          </>
        )}
      </div>

      <div className={cx('footer')}>
        {!loginScreen ? (
          <>
            {toggleScreen ? (
              <span>Don’t have an account? </span>
            ) : (
              <span>Already have an account?</span>
            )}
            <Button
              text
              className={cx('footer-btn')}
              onClick={() => {
                setToggleScreen((prev) => !prev)
                setLoginScreen(false)
              }}
            >
              {toggleScreen ? 'Sign up' : 'Log in'}
            </Button>
          </>
        ) : (
          <>
            <span>{registerScreen ? 'Already have an account?' : 'Don’t have an account? '}</span>
            <Button
              text
              className={cx('footer-btn')}
              onClick={() => {
                setToggleScreen((prev) => !prev)
                setLoginScreen(false)
              }}
            >
              {registerScreen ? ' Log in' : 'Sign up'}
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default LoginRegister
