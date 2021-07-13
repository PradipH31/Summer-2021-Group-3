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
    title: '',
    description: '',
    githubLink: ''
}

const AddNotebook = (props) => {

    let id = props.classId
    const [values, setValues] = useState(initialFieldValues)
    const [error, setError] = useState('');

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
        if (e.target.name === 'githubLink') {
            const pattern = /https:\/\/github.com\/.*\/blob\/master\/.*ipynb/
            const result = pattern.test(e.target.value)
            if (result === true) {
                console.log("it works")
                setError('')
            } else {
                console.log("it doesn't work")
                setError('github')
            }
        }
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
                        required
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
                        required
                        id="description"
                        label="Notebook Description"
                        type="email"
                        fullWidth
                        name="description"
                        value={values.description}
                        onChange={handleInputChange}
                    />
                    {error === "github" ?
                        <TextField
                            margin="dense"
                            id="githubLink"
                            label="Github Link"
                            type="email"
                            name="githubLink"
                            fullWidth
                            error
                            value={values.githubLink}
                            onChange={handleInputChange}
                        />
                        :
                        <TextField
                            margin="dense"
                            id="githubLink"
                            label="Github Link"
                            type="email"
                            name="githubLink"
                            fullWidth
                            value={values.githubLink}
                            onChange={handleInputChange}
                        />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        if (error === "") {
                            handleClose()
                            //add
                            axios.post("https://localhost:44377/api/Notebooks", {
                                githubLink: values.githubLink,
                                title: values.title,
                                description: values.description,
                                classId: id
                            }).then(response => {
                                console.log(response)
                            })
                        } else {
                            console.log('Github Error')
                        }
                    }} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </ >
    )
}

export default AddNotebook