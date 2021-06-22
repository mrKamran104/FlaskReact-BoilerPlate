import { withStyles, Paper, TextField, Button, ListItem, Grid} from '@material-ui/core';
import { Component } from 'react'
import axios from 'axios'
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import { HighlightOff } from '@material-ui/icons';
import Popup from './components/Popup'


const styles = {
  header: {
    textAlign: 'center'
  },
  paperStyle: {
    margin: '30px'
  },
  TextField: {
    width: '50%',
    marginLeft: '340px'
  },
  fabIcon: {
    margin: '0 10px 10px 0'
  },
  button: {
    margin: '10px 0px 10px 600px'
  },
  listItem: {
    '&:hover': {
      background: '#d3d9db',
      cursor: 'pointer'
    }
  },
};


class App extends Component {

  editItem = (id, val) => {
    this.setState({ edit: true })
    this.setState({ taskId: id })
    this.setState({ taskVal: val })
  }

  closePopup = () => {
    this.setState({ edit: false })
  }

  delItem = (id) => {
    axios.delete('/api/editTodo/' + id)
      .then(res => console.log(res.data));
    this.setState(prevState => ({
      tasks: prevState.tasks.filter(t => t.id !== id)
    }))
  }

  componentDidMount = () => {
    axios.get('/api/addTodo')
      .then(res => this.setState({ tasks: res.data }))
      .catch(err => console.log(err))
  }

  state = {
    vError: false,
    val: '',
    tasks: [],
    edit: false,
    taskVal: '',
    taskId: ''
  }

  update = () => {
    this.setState({ edit: false })
    axios.get('/api/addTodo')
      .then(res => this.setState({ tasks: res.data }))
      .catch(err => console.log(err))
  }

  createTask = () => {
    if (this.state.val === '') {
      this.setState({ vError: true })
    }
    else {
      const task_name = {
        task_name: this.state.val
      }
      axios.post('/api/addTodo', task_name)
        .then(() => axios.get('/api/addTodo')
          .then(res => this.setState({ val: '', tasks: res.data }))
          .catch(err => console.log(err)));
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <Paper className={classes.paperStyle}>
          <h1 className={classes.header}>React Crud App</h1>
          <br />
          <TextField
            helperText={this.state.vError ? 'This Field Is Requird' : ''}
            error={this.state.vError}
            value={this.state.val} onChange={(e) => this.setState({ vError: false, val: e.target.value })} className={classes.TextField} variant='outlined' label='Enter The Value'></TextField>
          <br></br>
          <Button variant="contained" color="secondary" onClick={this.createTask} className={classes.button}>
            Submit
        </Button>
          <hr></hr>
          {this.state.tasks.map(t => (
            <div>
              <hr />
              <Grid container>
                <Grid item xs={6}>
                  <ListItem className={classes.listItem} key={t.id}>{t.name}</ListItem>
                </Grid>
                <Grid item xs={6}>
                  <Fab size="small" color="secondary" aria-label="edit" className={classes.fabIcon} onClick={() => this.editItem(t.id, t.name)}>
                    <EditIcon />
                  </Fab>
                  <Fab size="small" color="secondary" aria-label="Close" className={classes.fabIcon} onClick={() => this.delItem(t.id)}>
                    <CloseIcon />
                  </Fab>
                  {/* <Button onClick={() => this.editItem(t._id, t.task_name)}><EditIcon className={classes.icon} fontSize='default'></EditIcon></Button>
                  <Button onClick={() => this.delItem(t._id)}><HighlightOff className={classes.icon}></HighlightOff></Button> */}
                </Grid>
              </Grid>
            </div>
          ))}
          {this.state.edit ? <Popup update={this.update} id={this.state.taskId} val={this.state.taskVal} edit={this.state.edit} closeDialog={this.closePopup}></Popup> : null}
        </Paper>
      </>
    );
  }
}

export default withStyles(styles)(App);
