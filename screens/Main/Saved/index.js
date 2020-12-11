import SavedContainer from "./SavedContainer";
import { getFavs } from "../../../redux/usersSlice";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { restaurants: state.restaurantsReducer.favs };
}

function mapDispatchToProps(dispatch) {
  return {
    getFavs: () => dispatch(getFavs()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedContainer);
