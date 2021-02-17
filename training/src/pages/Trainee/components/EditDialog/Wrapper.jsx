import React from 'react';
import { Mutation } from '@apollo/react-components';
import { UPDATE_TRAINEE } from '../../mutation';
import EditDialog from './EditDialog';

export default class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const prop = this.props;
    return (
      <Mutation mutation={UPDATE_TRAINEE}>
        {(updateTrainee) => (
          <>
            <EditDialog updateTrainee={updateTrainee} {...prop} />
          </>
        )}
      </Mutation>
    );
  }
}