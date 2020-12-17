import ExploreContainer from "./ExploreContainer";
import { connect } from "react-redux";
import { getRestaurants, increasePage } from "../../../redux/restaurantsSlice";

function mapStateToProps(state) {
  return {
    restaurants: state.restaurantsReducer.explore.restaurants,
    page: state.restaurantsReducer.explore.page,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getRestaurants: (page) => dispatch(getRestaurants(page)),
    increasePage: () => dispatch(increasePage()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExploreContainer);
