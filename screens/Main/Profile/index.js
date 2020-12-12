import ProfileContainer from "./ProfileContainer";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { user: state.usersReducer };
}

export default connect(mapStateToProps)(ProfileContainer);
