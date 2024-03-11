import * as httpRequest from '~/utils/httpRequest'

export const getVideos = async ({ type, page, accessToken = '' }) => {
  try {
    return await httpRequest.get('videos', {
      Headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        type,
        page,
      },
    })
  } catch (error) {
    throw error
  }
}
