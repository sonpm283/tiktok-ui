import classnames from 'classnames/bind'
import styles from './VideoUpload.module.scss'
import Button from '~/components/Button'
import { UploadIcon } from '~/components/Icons'
import { Fragment, useRef, useState } from 'react'
import { videoApi } from '~/apis/video.api'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const cx = classnames.bind(styles)
export default function VideoUpload() {
  const [source, setSource] = useState(null)
  const [videoTitle, setVideoTitle] = useState('')
  const [selectFile, setSelectFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef()

  const handleFileChange = (event) => {
    updateSourceFile(event)
  }

  const handleDrop = (event) => {
    updateSourceFile(event, 'drop')
  }

  const updateSourceFile = (event, type = '') => {
    event.preventDefault()
    const file = type === 'drop' ? event.dataTransfer.files[0] : event.target.files[0]
    const url = URL.createObjectURL(file)
    const fileName = file.name.split('.')[0]
    setSelectFile(file)
    setSource(url)
    setVideoTitle(fileName)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('content', videoTitle)
    formData.append('file', selectFile)

    try {
      setIsLoading(true)
      const res = await videoApi.upload(formData)
      if (res) {
        setIsLoading(false)
        toast(res?.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // DragOver: prevent default behavior (Prevent file from being opened on browser)
  return (
    <div className="video-upload" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      <form className={cx('wrapper')} onSubmit={handleSubmit} encType={'multipart/form-data'}>
        {!source ? (
          <Fragment>
            <label htmlFor="upload-video" type="button" className={cx('upload-box')}>
              <UploadIcon />
              <h4 className={cx('title')}>
                Select video to upload
                <p className={cx('text')}>Or drag and drop a file</p>
              </h4>
              <p className={cx('text')}>MP4 or WebM</p>
              <p className={cx('text')}>720x1280 resolution or higher</p>
              <p className={cx('text', 'red')}>Up to 10 minutes</p>
              <p className={cx('text')}>Less than 10 GB</p>
              <Button
                type="button"
                onClick={() => inputRef.current.click()}
                primary
                className={cx('select-file-btn')}
              >
                Select file
              </Button>
            </label>
            <input
              ref={inputRef}
              onChange={handleFileChange}
              hidden
              type="file"
              className={cx('upload-input')}
              id="upload-video"
              accept=".mov,.mp4"
            ></input>
          </Fragment>
        ) : (
          <div className={cx('upload-content')}>
            <div className={cx('content')}>
              <h3 className={cx('upload-video-title')}>
                Upload video
                <p className={cx('sub-title')}>Post a video to your account</p>
              </h3>
              <div className={cx('input-box')}>
                <label htmlFor="input-caption">Caption</label>
                <input
                  type="text"
                  id="input-caption"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                />
              </div>

              <div className={cx('button-box')}>
                <Button outline onClick={() => setSource(null)}>
                  Discard
                </Button>
                <Button primary>Post</Button>
              </div>
            </div>

            <div className={cx('video-box')}>
              {isLoading ? (
                <div className={cx('loading-box')}>
                  <FontAwesomeIcon className={cx('spin')} icon={faSpinner} spin />
                  <span>Uploading...</span>
                </div>
              ) : (
                <video className="VideoInput_video" autoPlay loop controls src={source} />
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
