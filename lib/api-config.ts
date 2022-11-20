import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { PoeFlipDataType } from '../src/types/card-types'

export const poeFlipApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  // eslint-disable-next-line consistent-return
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({
    getPoeFlipData: builder.query<PoeFlipDataType, void>({
      query: () => '/poe-data'
    })
  })
})

// Export hooks for usage in functional components
export const {
  useGetPoeFlipDataQuery,
  util: { getRunningQueriesThunk }
} = poeFlipApi

// export endpoints for use in SSR
export const { getPoeFlipData } = poeFlipApi.endpoints
