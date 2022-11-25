import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { poeFlipApi } from './apiConfig'

export const makeStore = () =>
  configureStore({
    reducer: {
      [poeFlipApi.reducerPath]: poeFlipApi.reducer
    },
    middleware: (gDM) => gDM().concat(poeFlipApi.middleware)
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppChunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
export const wrapper = createWrapper<AppStore>(makeStore)
