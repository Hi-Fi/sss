import { connect } from 'react-redux';
import LeafletInfo from '../components/LeafletInfo';

function mapStateToProps(state) {
  return {
    initialValues: state.leafletInfo,
  };
}

const mapDispatchToProps = () => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeafletInfo);