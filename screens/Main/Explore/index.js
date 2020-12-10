import ExploreContainer from "./ExploreContainer";
import { connect } from "react-redux";
import { getRestaurants, increasePage } from "../../../redux/restaurantsSlice";

function mapDispatchToProps(dispatch) {
  return {
    getRestaurants: (page) => dispatch(getRestaurants(page)),
    increasePage: () => dispatch(increasePage()),
  };
}

function mapStateToProps(state) {
  return state.restaurantsReducer.explore;
}

export default connect(mapStateToProps, mapDispatchToProps)(ExploreContainer);
