import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { PoeFlipDataType } from '../src/types/flipItemTypes'
import { FlipQueryTypes, NewFlipQueryType } from '../src/types/flipQueryTypes'

interface ErrorType {
  data: { statusCode: number; message: string[]; error: string }
}
export const poeFlipApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/api'
  }) as unknown as BaseQueryFn<string | FetchArgs, unknown, ErrorType>,

  // eslint-disable-next-line consistent-return
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: ['flipQueries', 'flip-data'],
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
    getPoeFlipQuery: builder.query<FlipQueryTypes[], void>({
      query: () => ({
        url: 'flipQueries'
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(
                (data) => ({ type: 'flipQueries', ...data } as const)
              )
            ]
          : []
    }),
    deletePoeFlipQuery: builder.mutation<void, FlipQueryTypes>({
      query: (arg) => ({
        url: 'flipQueries',
        method: 'DELETE',
        body: arg
      }),
      invalidatesTags: (result, error, { uuid }) => [
        { type: 'flipQueries', uuid }
      ]
    }),
    addFlipQuery: builder.mutation<void, NewFlipQueryType>({
      query: (arg) => ({
        url: 'flipQueries',
        method: 'POST',
        body: arg
      }),
      invalidatesTags: () => [{ type: 'flipQueries' }]
    }),
    editFlipQuery: builder.mutation<void, FlipQueryTypes>({
      query: (arg) => ({
        url: 'flipQueries',
        method: 'PUT',
        body: arg
      }),
      invalidatesTags: (result, error, data) => [
        { type: 'flipQueries', ...data }
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
