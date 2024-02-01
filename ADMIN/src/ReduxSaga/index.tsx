import { all, fork } from 'redux-saga/effects'
import { watchRootSaga } from './Root/RootSaga'
import { watchAuthSaga } from './Auth/AuthSaga'
import { watchHRSaga } from './HR/HRSaga'
import { watchCandidateSaga } from './Candidate/CandidateSaga'
import { watchPostsSaga } from './Posts/PostsSaga'
import { watchDashboardSaga } from './Dashboard/DashboardSaga'
import { watchAdvSaga } from './Adv/AdvSaga'
import { watchNewsSaga } from './News/NewsSaga'
import { watchSettingPricesSaga } from './SettingPrices/SettingPricesSaga'

export * from './Root'

export default function* reduxSaga() {
  yield all([
    fork(watchRootSaga),
    fork(watchDashboardSaga),
    fork(watchAuthSaga),
    fork(watchHRSaga),
    fork(watchCandidateSaga),
    fork(watchPostsSaga),
    fork(watchAdvSaga),
    fork(watchNewsSaga),
    fork(watchSettingPricesSaga)
  ])
}
