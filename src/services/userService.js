import * as httpRequest from '~/utils/httpRequest'

export const getSuggestedUsers = async ({ page, perPage, accessToken }) => {
  try {
    const res = await httpRequest.get('users/suggested', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        page,
        per_page: perPage,
      },
    })

    return res.data
  } catch (error) {
    console.log(error)
  }
}
