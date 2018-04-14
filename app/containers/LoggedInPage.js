import { connect } from 'react-redux'
import LoggedIn from '../components/LoggedIn'
import { bindActionCreators } from 'redux'
import userActions from '../actions/user'

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => { // eslint-disable-line no-unused-vars
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggedIn)
