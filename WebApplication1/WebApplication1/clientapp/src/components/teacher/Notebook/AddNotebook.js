import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import { CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

const initialFieldValues = {
    title: '',
    description: '',
    githubLink: ''
}

const AddNotebook = (props) => {
    let id = props.classId
    const [values, setValues] = useState(initialFieldValues)

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }
    const useStyles = makeStyles((theme) => ({
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        root: {
            maxWidth: 345,
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: red[500],
        },
    }));
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div onClick={handleClickOpen} style={{
                cursor: 'pointer'
            }}>
                <Card style={{
                    margin: "1%",
                    borderStyle: 'solid',
                    borderWidth: '.1px'
                    // backgroundImage: 'radial-gradient(circle, red, yellow, green);'
                }}>
                    <CardContent>
                        <Typography variant="h5" component="h2" style={{
                            backgroundColor: '#F8B77F',
                            color: 'white',
                            margin: '0% 30%  '
                        }}>
                            Add Notebook
                        </Typography>
                    </CardContent>
                </Card >
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"><center>Add Notebook</center></DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Notebook Name"
                        type="text"
                        fullWidth
                        value={values.title}
                        onChange={handleInputChange}
                        name="title"
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        label="Notebook Description"
                        type="email"
                        fullWidth
                        name="description"
                        value={values.description}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="githubLink"
                        label="Github Link"
                        type="email"
                        name="githubLink"
                        fullWidth
                        value={values.githubLink}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        handleClose()
                        //add
                        axios.post("https://localhost:44377/api/Notebooks", {
                            githubLink: values.githubLink,
                            title: values.title,
                            description: values.description,
                            classId: id
                        }).then(response=>{
                            console.log(response)
                        })
                    }} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </ >
    )
}

export default AddNotebook