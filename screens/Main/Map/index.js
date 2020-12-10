import MapContainer from "./MapContainer";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { restaurants: state.restaurantsReducer.explore.restaurants };
}

export default connect(mapStateToProps)(MapContainer);
