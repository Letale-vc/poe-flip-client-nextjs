import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { PoeFlipDataType } from '../src/types/card-types'
import { FlipQueryType, NewFlipQueryType } from '../src/types/flip-queries'

interface ErrorType {
  data: { statusCode: number; message: string[]; error: string }
}
export const poeFlipApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api'
  }) as unknown as BaseQueryFn<string | FetchArgs, unknown, ErrorType>,

  // eslint-disable-next-line consistent-return
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: ['poeQueries', 'poeFlipData'],
  endpoints: (builder) => ({
    getPoeFlipData: builder.query<PoeFlipDataType, void>({
      query: () => ({ url: 'poe-data' })
    }),
    startUpdatePoeFlipData: builder.mutation<void, void>({
      query: () => ({
        url: 'poe-data',
        method: 'PUT'
      })
    }),
    getPoeFlipQuery: builder.query<FlipQueryType[], void>({
      query: () => ({
        url: 'poeQueries'
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(
                ({ uuid }) => ({ type: 'poeQueries', uuid } as const)
              )
            ]
          : [{ type: 'poeQueries', uuid: 'newQuery' }]
    }),
    deletePoeFlipQuery: builder.mutation<void, FlipQueryType>({
      query: (arg) => ({
        url: 'poeQueries',
        method: 'DELETE',
        body: arg
      }),
      invalidatesTags: (result, error, { uuid }) => [
        { type: 'poeQueries', uuid }
      ]
    }),
    addFlipQuery: builder.mutation<void, NewFlipQueryType>({
      query: (arg) => ({
        url: 'poeQueries',
        method: 'POST',
        body: arg
      }),
      invalidatesTags: () => [{ type: 'poeQueries', uuid: 'newQuery' }]
    }),
    editFlipQuery: builder.mutation<void, FlipQueryType>({
      query: (arg) => ({
        url: 'poeQueries',
        method: 'PUT',
        body: arg
      }),
      invalidatesTags: (result, error, { uuid }) => [
        { type: 'poeQueries', uuid }
      ]
    })
  })
})

// Export hooks for usage in functional components
export const {
  useEditFlipQueryMutation,
  useGetPoeFlipQueryQuery,
  useDeletePoeFlipQueryMutation,
  useAddFlipQueryMutation,
  useGetPoeFlipDataQuery,
  useStartUpdatePoeFlipDataMutation,
  util: { getRunningQueriesThunk }
} = poeFlipApi

// export endpoints for use in SSR
export const { getPoeFlipData, startUpdatePoeFlipData, getPoeFlipQuery } =
  poeFlipApi.endpoints
