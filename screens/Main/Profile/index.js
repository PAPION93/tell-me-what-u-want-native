import ProfileContainer from "./ProfileContainer";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { name: state.usersReducer.name };
}

export default connect(mapStateToProps)(ProfileContainer);
