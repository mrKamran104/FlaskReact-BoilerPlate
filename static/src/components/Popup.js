import { Dialog, DialogActions,Button,withStyles, DialogContent, DialogTitle, TextField } from '@material-ui/core'
import {Component} from 'react'
import axios from 'axios'


const styles = {
    input:{
        width:"300px"
    },
}

class Popup extends Component{

    state = {
        val:'',
        id:''
    }

    componentDidMount=()=>{
        this.setState({val:this.props.val})
        this.setState({id:this.props.id})
    }

    editTask= ()=>{
        const task_name = {
            task_name: this.state.val
          }
        axios.put('/api/editTodo/' + this.state.id, task_name)
      .then(res => this.props.update());
    }

    render(){
        const { classes } = this.props;
        return(
            <Dialog open={this.props.edit} maxWidth='xl' aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Item</DialogTitle>
        <DialogContent>
          <TextField
          className={classes.input}
            autoFocus
            margin="dense"
            variant='outlined'
            label="Task Value"
            value={this.state.val}
            onChange={(e)=>this.setState({val:e.target.value})}
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.closeDialog}  color="secondary">
            Cancel
          </Button>
          <Button onClick={this.editTask}  color="primary">
            Edit Task
          </Button>
        </DialogActions>
      </Dialog>
        )
    }
}

export default withStyles(styles)(Popup);