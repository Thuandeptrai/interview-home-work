
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { AUTH_ACTIONS, USER_ACTIONS, REGISTER_ACTIONS } from './action'
import { loginAPI, registerAPI } from '../services/authAPI'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
  try {

    yield put({ type: 'FETCH_USER_SUCCESS', user: "adasd" })
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}
function* logout(action) {
  yield put({ type: 'LOGOUT_SUCCESS' })
}
// register
function* register(action) {
  try {
    // Call api from 3rd party

    const response = yield registerAPI(action.username, action.name, action.dob, action.password)
    yield put({ type: REGISTER_ACTIONS.REGISTER_SUCCESS })
  }
  catch (e) {
    console.log(e)
    yield put({ type: REGISTER_ACTIONS.REGISTER_ERROR, payload: e.response.data.message })
  }
}
function* login(action) {
  try {
    // Call api from 3rd party
    const response = yield loginAPI(action.username, action.password)
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user', JSON.stringify(response.data.user))
    yield put({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload:{
      token: response.data.token,
      user: response.data.user
    } })
  }
  catch (e) {
    console.log(e)
    yield put({ type: AUTH_ACTIONS.LOGIN_ERROR, payload: e.response.data.message })
  }
}
function* setUserData() {
    // get from local storage
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    yield put({ type: AUTH_ACTIONS.SET_USER_DATA, payload: { token: token, user: JSON.parse(user) }})
}
/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
  yield takeEvery( setUserData)
  yield takeEvery(AUTH_ACTIONS.LOGIN, login)
  yield takeEvery(REGISTER_ACTIONS.REGISTER, register)
  yield takeEvery('LOGOUT', logout)
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/

export default mySaga
