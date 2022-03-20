import { connect } from 'react-redux';
import { Diagram } from '~/components';

function mapStateToProps({ ingame: { snapshot } }) {
  return { snapshot };
}

const DiagramContainer = connect(mapStateToProps)(Diagram);

export default DiagramContainer;
