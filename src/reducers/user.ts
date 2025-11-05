import { handleActions, Action } from 'redux-actions'
import actions from '../actions/user'

interface UserState {
  [key: string]: any;
}

export default handleActions<UserState, any>({
  [actions.login.toString()]: (state: UserState, action: Action<any>) => {
    return { ...state, ...action.payload }
  }
}, {})
