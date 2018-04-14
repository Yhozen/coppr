import { createAction } from 'redux-actions'

export default {
  login: createAction('USER_LOGIN'),
  change: createAction('USER_CHANGE')
}