import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';



const columns = [
  { id: 'title', numeric: false, disablePadding: true, label: 'Song title'},
  { id: 'melody', numeric: false, disablePadding: false, label: 'Melody'},
  { id: 'extraInfo', numeric: false, disablePadding: false, label: 'Extra info'},
  { id: 'dateCreated', numeric: false, disablePadding: false, label: 'Added'},
  { id: 'editButton', numeric: false, disablePadding: false, label: ''},
]

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columns.map(column => {
            return (
              <TableCell
                key={column.id}
                aligh={column.numeric ? "right" : "left"}
                padding={column.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

class SongsList extends Component {
  componentDidMount() {
    if (!(this.props.songsList && this.props.songsList.songs && this.props.songsList.songs.length > 0)) {
      this.props.fetchSongs();
    }
  }

  renderSongs(songs) {
    return songs.map((song) => {
      return (
        <li className="list-group-item" key={song.id}>
          <Link style={{color:'black'}} to={"/song/" + song.id}>
            <h3 className="list-group-item-heading">{song.title}</h3>
          </Link>
        </li>
      );
    });
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  render() {
    const { songs, loading, error } = this.props.songsList;
    const {rowsPerPage, page, order, orderBy} = this.props.songList;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, songs.length - page * rowsPerPage);

    if(loading) {
      return <div className="container"><h1>Songs</h1><h3>Loading...</h3></div>
    } else if(error) {
      return <div className="alert alert-danger">Error: {error}</div>
    }

    return (
      <div className="container">
        <h1>Songs</h1>
        <div>
          <Table aria-labelledby="tableTitle">
          <EnhancedTableHead
              numSelected={songs.filter(song => song.selected).length || 0}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.props.selectAll}
              onRequestSort={this.props.sortList}
              rowCount={songs.length}
            />
            <TableBody>
              {stableSort(songs, getSorting(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                  const isSelected = n.selected;
                  return (
                    <TableRow
                      hover
                      onClick={() => this.props.selectSong(n)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <Link style={{color:'black'}} to={"/song/" + n.id}>
                          <h3 className="list-group-item-heading">{n.title}</h3>
                        </Link>
                      </TableCell>
                      <TableCell>{n.melody && n.melody.melody}</TableCell>
                      <TableCell>{n.extraInfo}</TableCell>
                      <TableCell>{n.dateCreated}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={songs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onPageChange={this.props.changePage}
          onRowsPerPageChange={this.props.setRowCount}
        />
      </div>
    );
  }
}

SongsList.propTypes = {
  songList: PropTypes.object,
  songsList: PropTypes.object,
  fetchSongs: PropTypes.func,
  selectAll: PropTypes.func,
  selectSong: PropTypes.func,
  setRowCount: PropTypes.func,
  sortList: PropTypes.func,
  changePage: PropTypes.func,
}

export default SongsList;
