import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import CardActions from '@material-ui/core/CardActions';
import TabComponent from './TabComponent';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

const initialFieldValues = {
    className: '',
    classDescription: '',
    classOwner: '',
    imageName: '',
    imageSrc: ''
}

const AddClass = () => {
    const [values, setValues] = useState(initialFieldValues)
    const [open, setOpen] = React.useState(false);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleImageChange = e => {
        let imageFile = e.target.files[0];
        const reader = new FileReader();
        reader.onload = x => {
            setValues({
                ...values,
                imageFile,
            })
        }
        reader.readAsDataURL(imageFile)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const useStyles = makeStyles((theme) => ({
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

    return (
        <div>
            <div onClick={handleClickOpen} style={{
                cursor: 'pointer'
            }}>
                <Card className={classes.root} style={{
                    margin: "10%",
                    maxWidth: 'unset',
                    borderStyle: 'groove',
                }}>
                    <CardContent>
                        <Typography variant="h5" component="h2" style={{
                            backgroundColor: '#F8B77F',
                            color: 'white',
                            margin: '0% 30%'
                        }}>
                            Add Class
                        </Typography>
                        <Typography variant="body2" component="p">

                        </Typography>
                    </CardContent>
                    <CardActions>
                    </CardActions>
                </Card >
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Class</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="className"
                        label="Class Name"
                        type="text"
                        name="className"
                        value={values.className}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="classDescription"
                        label="Class Description"
                        type="text"
                        name="classDescription"
                        value={values.classDescription}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="classOwner"
                        label="Instructor"
                        type="text"
                        name="classOwner"
                        value={values.classOwner}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        handleClose()
                        console.log(values)
                        axios.post("https://localhost:44377/api/Class", {
                            ClassName: values.className,
                            ClassOwner: values.classOwner,
                            ClassDescription: values.classDescription,
                            ImageName: values.imageName,
                            ImageSrc: values.imageSrc
                        }).then(response => console.log(response))
                    }} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddClass