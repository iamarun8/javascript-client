import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { AddDialog } from './components/AddDialog';
import { EditDialog } from './components/EditDialog';
import { DeleteDialog } from './components/DeleteDialog'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { TableComponent } from '../../components/Table';
import { getDateFormatted } from '../../lib/utils/getDateFormatted';
import { withLoaderAndMessage } from '../../components/HOC/index';
import { graphql } from '@apollo/react-hoc';
import Compose from 'lodash.flowright';
import { GET_TRAINEE } from './query';
import { MyContext } from '../../contexts/index';
import { Mutation } from "@apollo/react-components";
import { UPDATE_TRAINEE, CREATE_TRAINEE, DELETE_TRAINEE } from "./mutation";
import { DELETED_TRAINEE_SUB, UPDATED_TRAINEE_SUB } from "./Subscription";


const useStyles = (theme) => ({
    root: {
        margin: theme.spacing(2),
    },
    dialog: {
        textAlign: 'right',
    },
});

class TraineeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selected: "",
      order: "asc",
      orderBy: "",
      EditOpen: false,
      RemoveOpen: false,
      editData: {},
      deleteData: {},
      page: 0,
      rowsPerPage: 6,
      count: 0,
      limit: 50,
      skip: 0,
      dataObj: [[]],
      refetchData: {}
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSort = field => () => {
    const { order } = this.state;
    this.setState({
      orderBy: field,
      order: order === "asc" ? "desc" : "asc"
    });
  };

  handleSelect = data => {
    console.log(data);
  };

  handleChangePage = refetch => async (event, newPage) => {
    const { rowsPerPage } = this.state;
    const refetchData = await refetch({
      skip: newPage * rowsPerPage,
      limit: rowsPerPage
    });
    const {
      data: { getAllTrainees: { data = [], count } = {} }
    } = this.props;
    this.setState({
      page: newPage,
      refetchData: { data, count }
    });
  };

  handleRemoveDialogOpen = element => {
    this.setState({
      RemoveOpen: true,
      deleteData: element
    });
  };

  handleRemoveClose = () => {
    this.setState({
      RemoveOpen: false
    });
  };

  handleRemove = () => {
    this.setState({
      RemoveOpen: false
    });
  };

  handleEditDialogOpen = element => {
    this.setState({
      EditOpen: true,
      editData: element
    });
  };

  handleEditClose = () => {
    this.setState({
      EditOpen: false
    });
  };

  handleEdit = (name, email) => {
    this.setState({
      EditOpen: false
    });
  };

  createData = async (data, openSnackBar, createTrainee) => {
    try {
      const { name, email, password } = data;
      await createTrainee({ variables: { name, email, password } });
      this.setState(
        {
          open: false
        },
        () => {
          openSnackBar("Trainee Created Successfully", "success");
        }
      );
    } catch (err) {
      console.log("err :", err);
      this.setState(
        {
          open: false
        },
        () => {
          openSnackBar("Error While Creating", "error");
        }
      );
    }
  };

  editData = async (data, openSnackBar, updateTrainee) => {
    try {
      const { name, email, id } = data;
      await updateTrainee({ variables: { name, email, id } });
      this.setState(
        {
          EditOpen: false
        },
        () => {
          openSnackBar("Trainee Updated Successfully", "success");
        }
      );
    } catch (err) {
      console.log("err :", err);
      this.setState(
        {
          open: false
        },
        () => {
          openSnackBar("Error While Updating", "error");
        }
      );
    }
  };

  deleteData = async (data, openSnackBar, deleteTrainee) => {
    try {
      const { originalId } = data;
      await deleteTrainee({ variables: { originalId } });
      this.setState(
        {
          RemoveOpen: false
        },
        () => {
          openSnackBar("Trainee Deleted Successfully", "success");
        }
      );
    } catch (err) {
      console.log("err :", err);
      this.setState(
        {
          open: false
        },
        () => {
          openSnackBar("Error While Deleting", "error");
        }
      );
    }
  };

  componentDidMount = () => {
    const { data: { subscribeToMore } } = this.props;

    subscribeToMore({
      document: UPDATED_TRAINEE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const { getAllTrainees: { data } } = prev;
        const { data: { traineeUpdated } } = subscriptionData;
        const updatedRecords = [...data].map(records => {
          if (records.originalId !== traineeUpdated[0].originalId) {
            return { ...data, ...traineeUpdated };
          }
          return data;
        });
        return {
          getAllTrainees: {
            ...prev.getAllTrainees,
            ...prev.getAllTrainees.totalCount,
            data: updatedRecords,
          }
        };
      }
    });

    subscribeToMore({
      document: DELETED_TRAINEE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const { getAllTrainees: { data } } = prev;
        const { data: { traineeDeleted } } = subscriptionData;
        const updatedRecords = [...data].filter( records => records.originalId !== traineeDeleted.data);
        return {
          getAllTrainees: {
            ...prev.getAllTrainees,
            ...(prev.getAllTrainees.totalCount - 1),
            data: updatedRecords
          }
        };
      }
    });
  };

  render() {
    const {
      open,
      order,
      orderBy,
      page,
      rowsPerPage,
      EditOpen,
      RemoveOpen,
      editData,
      deleteData,
      refetchData
    } = this.state;
    const { classes } = this.props;
    const { loader, dataLength, setdataLength, setloader } = this.props;
    const {
      data: { getAllTrainees: { data = [], count, totalCount } = {}, refetch }
    } = this.props;
    const variables = {
      skip: page * rowsPerPage,
      limit: rowsPerPage,
      sort: 'name'
    };
    const updatedCount = refetchData.count ? refetchData.count : count;
    const updatedData = refetchData.data ? refetchData.data : data;
    const updatedTotalCount = refetchData.totalCount || totalCount;
    if (updatedCount) {
      setloader(false);
      setdataLength(updatedCount);
    }
    if (!dataLength) return null;
    return (
      <>
        <Mutation
          mutation={CREATE_TRAINEE}
          refetchQueries={[{ query: GET_TRAINEE, variables }]}
          awaitRefetchQueries={true}
        >
          {createTrainee => (
            <Mutation
              mutation={UPDATE_TRAINEE}
              refetchQueries={[{ query: GET_TRAINEE, variables }]}
              awaitRefetchQueries={true}
            >
              {updateTrainee => (
                <Mutation
                  mutation={DELETE_TRAINEE}
                  refetchQueries={[{ query: GET_TRAINEE, variables }]}
                  awaitRefetchQueries={true}
                >
                  {deleteTrainee => (
                    <MyContext.Consumer>
                      {({ openSnackBar }) =>
                        !loader && (
                          <div className={classes.root}>
                            <div className={classes.dialog}>
                              <Button
                                variant="outlined"
                                color="primary"
                                onClick={this.handleClickOpen}
                              >
                                ADD TRAINEELIST
                              </Button>
                            </div>
                            <AddDialog
                              open={open}
                              onClose={this.handleClose}
                              onSubmit={data =>
                                this.createData(
                                  data,
                                  openSnackBar,
                                  createTrainee,
                                )
                              }
                            />
                            <br />
                            <EditDialog
                              Editopen={EditOpen}
                              handleEditClose={this.handleEditClose}
                              handleEdit={this.handleEdit}
                              data={editData}
                              onSubmit={data =>
                                this.editData(
                                  data,
                                  openSnackBar,
                                  updateTrainee,
                                )
                              }
                            />
                            <DeleteDialog
                              open={RemoveOpen}
                              onClose={this.handleRemoveClose}
                              onSubmit={this.handleRemove}
                              data={deleteData}
                              onSubmit={data =>
                                this.deleteData(
                                  data,
                                  openSnackBar,
                                  deleteTrainee,
                                )
                              }
                            />
                            <TableComponent
                              id="id"
                              data={updatedData}
                              columns={[
                                {
                                  field: "name",
                                  label: "Name"
                                },
                                {
                                  field: "email",
                                  label: "Email Address",
                                  format: value => value && value.toUpperCase()
                                },
                                {
                                  field: "createdAt",
                                  label: "Date",
                                  align: "right",
                                  format: getDateFormatted
                                }
                              ]}
                              actions={[
                                {
                                  icon: <EditIcon />,
                                  handler: this.handleEditDialogOpen
                                },
                                {
                                  icon: <DeleteIcon />,
                                  handler: this.handleRemoveDialogOpen
                                }
                              ]}
                              orderBy={orderBy}
                              order={order}
                              onSort={this.handleSort}
                              onSelect={this.handleSelect}
                              count={updatedTotalCount}
                              page={page}
                              onChangePage={this.handleChangePage(refetch)}
                              rowsPerPage={rowsPerPage}
                            />
                          </div>
                        )
                      }
                    </MyContext.Consumer>
                  )}
                </Mutation>
              )}
            </Mutation>
          )}
        </Mutation>
      </>
    );
  }
}
TraineeList.contextType = MyContext;
TraineeList.propTypes = {
    match: PropTypes.object.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    data: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Compose(withStyles(useStyles),
graphql(GET_TRAINEE,{
    options: { variables: {skip:0, limit:6, sort:'name'}, fetchPolicy: "network-only"}
}))(withLoaderAndMessage(TraineeList));