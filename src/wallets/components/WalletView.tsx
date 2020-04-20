import { Grid, List, Typography } from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import React from 'react';
import { Severity } from '../../shared/alert/AlertModel';
import { DataComponentProps } from '../../shared/BaseProps';
import AddButton from '../../shared/buttons/AddButton';
import AuthenticationContext, {
  AuthenticationContextValue,
} from '../../shared/context/AuthenticationContext';
import { Wallet } from '../models/Wallet';
import {
  deleteWallet,
  editWallet,
  getAllWallets,
  postWallet,
} from '../service/WalletService';
import AddWalletDialog from './AddWalletDialog';
import DeleteWalletDialog from './DeleteWalletDialog';
import EditWalletDialog from './EditWalletDialog';
import WalletCard from './WalletCard';

interface IWalletViewProps extends DataComponentProps {}

interface IWalletViewState {
  wallets: Wallet[];
  addDialog: boolean;
  deleteDialog: {
    open: boolean;
    selected: Wallet;
  };
  editDialog: {
    open: boolean;
    selected: Wallet;
  };
}

const WalletViewStyles = () =>
  createStyles({
    list: {
      width: '90%',
    },
    addButton: {
      position: 'fixed',
      right: '50px',
      bottom: '5%',
    },
  });

class WalletView extends React.Component<
  WithStyles<typeof WalletViewStyles> & IWalletViewProps,
  IWalletViewState
> {
  context: AuthenticationContextValue = this.context;
  state: IWalletViewState = {
    addDialog: false,
    deleteDialog: { open: false, selected: { name: '', balance: 0 } },
    wallets: [],
    editDialog: { open: false, selected: { name: '', balance: 0 } },
  };

  postWallet = async (item: Wallet) => {
    try {
      await postWallet(this.context.token, item);
      this.fetchWallets();
      this.props.functionSet.openAlert({
        message: 'Wallet created',
        severity: Severity.success,
      });
      this.setState({ addDialog: false });
    } catch (error) {
      this.props.functionSet.openAlert({
        message: 'Error creating Wallet',
        severity: Severity.error,
      });
      this.setState({ addDialog: false });
    }
  };
  deleteWallet = async (item: Wallet) => {
    try {
      await deleteWallet(this.context.token, item);
      this.props.functionSet.openAlert({
        message: 'Wallet and all connected records deleted',
        severity: Severity.success,
      });
      this.fetchWallets();
    } catch (error) {
      this.props.functionSet.openAlert({
        message: 'Error creating Wallet',
        severity: Severity.error,
      });
    } finally {
      this.setState({
        deleteDialog: {
          open: false,
          selected: this.state.deleteDialog.selected,
        },
      });
    }
  };

  editWallet = async (item: Wallet) => {
    try {
      await editWallet(
        this.context.token,
        this.state.editDialog.selected,
        item
      );
      this.props.functionSet.openAlert({
        message: 'Updated Wallet',
        severity: Severity.success,
      });
      this.fetchWallets();
    } catch (error) {
      this.props.functionSet.openAlert({
        message: error.message,
        severity: Severity.error,
      });
    } finally {
      this.setState({
        editDialog: { open: false, selected: this.state.editDialog.selected },
      });
    }
  };

  componentDidMount() {
    this.fetchWallets();
  }

  fetchWallets = async () => {
    try {
      const response = await getAllWallets(this.context.token);
      this.setState({ wallets: response });
    } catch (e) {
      this.props.functionSet.openAlert({
        message: 'Error fetching wallets',
        severity: Severity.error,
      });
    }
  };
  render() {
    const { classes } = this.props;
    console.log('renders WalletView');
    return (
      <div>
        <Grid
          container
          direction='column'
          justify='flex-start'
          alignItems='center'
        >
          <AddWalletDialog
            open={this.state.addDialog}
            confirmClickhandler={this.postWallet}
            onCancel={() => this.setState({ addDialog: false })}
          />
          <DeleteWalletDialog
            confirmClickhandler={this.deleteWallet}
            open={this.state.deleteDialog.open}
            onCancel={() =>
              this.setState({
                deleteDialog: {
                  open: false,
                  selected: this.state.deleteDialog.selected,
                },
              })
            }
            item={this.state.deleteDialog.selected}
          />
          <EditWalletDialog
            open={this.state.editDialog.open}
            confirmClickhandler={this.editWallet}
            onCancel={() =>
              this.setState({
                editDialog: {
                  open: false,
                  selected: this.state.editDialog.selected,
                },
              })
            }
            item={this.state.editDialog.selected}
          />
          <Typography variant='h2'>Wallets</Typography>
          <List className={classes.list}>
            {this.state.wallets.map((wallet) => (
              <WalletCard
                key={wallet.name}
                deleteHandler={(wallet) =>
                  this.setState({
                    deleteDialog: { open: true, selected: wallet },
                  })
                }
                editHandler={(wallet) =>
                  this.setState({
                    editDialog: { open: true, selected: wallet },
                  })
                }
                wallet={wallet}
              />
            ))}
          </List>
        </Grid>
        <AddButton
          type='add'
          horizontalAlignment='flex-end'
          verticalAlignment='flex-end'
          className={classes.addButton}
          onClick={(e) => this.setState({ addDialog: !this.state.addDialog })}
        />
      </div>
    );
  }
}
export default withStyles(WalletViewStyles, { withTheme: false })(WalletView);

WalletView.contextType = AuthenticationContext;
