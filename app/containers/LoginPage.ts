import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { bindActionCreators, Dispatch } from 'redux'
import Login from '../components/Login'
import userActions from '../actions/user'

const mapStateToProps = (state: any) => {
  return state
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
