import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { red } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

const initialFieldValues = {
    courseid: '',
    githubpath: '',
    fileName: ''
}

const AddNotebook = (props) => {

    let id = props.classId
    const [values, setValues] = useState(initialFieldValues)
    values.courseid = id;

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
        error: {
            borderStyle: 'groove'
        }
    }));
    const useErrorStyles = makeStyles((theme) => ({
        borderStyle: 'groove',
        color: 'green'
    }
    ));
    const classes = useStyles();
    const errorClass = useErrorStyles();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    console.log(values)

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
                            Add File From Github
                        </Typography>
                    </CardContent>
                </Card >
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"><center>Add File</center></DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="githubpath"
                        label="Github Path"
                        type="text"
                        fullWidth
                        value={values.githubpath}
                        onChange={handleInputChange}
                        name="githubpath"
                    />
                    <TextField
                        required
                        margin="dense"
                        id="fileName"
                        label="File Name"
                        type="text"
                        fullWidth
                        value={values.fileName}
                        onChange={handleInputChange}
                        name="fileName"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        handleClose()
                        axios.post(`https://localhost:44377/api/FileManagement/${values.courseid}/${values.githubpath}/false?saveas=${values.fileName}`, {
                            // githubLink: values.githubLink,
                            // title: values.title,
                            // description: values.description,
                            // classId: id
                        }).then(response => {
                            console.log(response)
                        })
                    }}
                        color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </ >
    )
}

export default AddNotebook