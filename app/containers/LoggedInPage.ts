import { connect } from 'react-redux'
import LoggedIn from '../components/LoggedIn'
import { bindActionCreators, Dispatch } from 'redux'
import userActions from '../actions/user'

const mapStateToProps = (state: any) => {
  return state
}

const mapDispatchToProps = (dispatch: Dispatch) => { // eslint-disable-line no-unused-vars
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggedIn)
