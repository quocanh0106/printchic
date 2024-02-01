import { configureStore, MiddlewareArray } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import reduxSaga, { rootReducer } from '~/ReduxSaga/index'
import { authReducer } from '~/ReduxSaga/Auth'
import { commonReducer } from '~/ReduxSaga/Common'
import { HRReducer } from '~/ReduxSaga/HR'
import { CandidateReducer } from '~/ReduxSaga/Candidate'
import { postsReducer } from '~/ReduxSaga/Posts'
import { dashboardReducer } from '~/ReduxSaga/Dashboard'
import { advReducer } from '~/ReduxSaga/Adv'
import { newsReducer } from '~/ReduxSaga/News'
import { SettingPricesReducer } from '~/ReduxSaga/SettingPrices'

const sagaMiddleware = createSagaMiddleware()

const reducers = {
  root: rootReducer,
  auth: authReducer,
  common: commonReducer,
  hr: HRReducer,
  candidate: CandidateReducer,
  posts: postsReducer,
  dashboard: dashboardReducer,
  adv: advReducer,
  news: newsReducer,
  setting_prices: SettingPricesReducer
}

const logger = createLogger({
  // ...options
})

export const store = configureStore({
  reducer: reducers,
  middleware: new MiddlewareArray(sagaMiddleware, logger)
})

sagaMiddleware.run(reduxSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
