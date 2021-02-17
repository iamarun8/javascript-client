import React from 'react';
import { Mutation } from '@apollo/react-components';
import { CREATE_TRAINEE } from '../../mutation';
import AddDialog from './AddDialog';

export default class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const prop = this.props;
    return (
      <Mutation mutation={CREATE_TRAINEE}>
        {(createTrainee) => (
          <>
            <AddDialog createTrainee={createTrainee} {...prop} />
          </>
        )}
      </Mutation>
    );
  }
}