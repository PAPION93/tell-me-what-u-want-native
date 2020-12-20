import MapContainer from "./MapContainer";
import { connect } from "react-redux";
import {
  searchRestaurants,
  increaseSearchPage,
} from "../../../redux/restaurantsSlice";

function mapStateToProps(state) {
  return {
    restaurants: state.restaurantsReducer.search.restaurants,
    page: state.restaurantsReducer.search.page,
    next_page_url: state.restaurantsReducer.search.next_page_url,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchRestaurants: (page, form) => dispatch(searchRestaurants(page, form)),
    increaseSearchPage: () => dispatch(increaseSearchPage()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
