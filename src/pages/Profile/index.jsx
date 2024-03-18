import UserProfile from './UserProfile'
import classnames from 'classnames/bind'
import styles from './Profile.module.scss'
import { useEffect, useState } from 'react'
import { userApi } from '~/apis/user.api'
import { useParams } from 'react-router-dom'

const cx = classnames.bind(styles)
function Profile() {
  const [userProfile, setUserProfile] = useState({})
  const params = useParams()
  const { id } = params

  useEffect(() => {
    ;(async () => {
      const res = await userApi.getInfo(id)
      if (!res) return null

      setUserProfile(res.data.metadata)
    })()
  }, [id])

  return (
    <div className={cx('wrapper')}>
      <UserProfile userInfo={userProfile} />
    </div>
  )
}

export default Profile
