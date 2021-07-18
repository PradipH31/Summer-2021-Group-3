import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { Link } from "react-router-dom";
import axios from 'axios';

const initialFieldValues = {
    notebookId: '',
    githubLink: '',
    title: '',
    description: '',
    classId: '',
    createdDate: '',
    jupyterHubLink: '',
}

const useStyles = makeStyles({
    root: {
        // minWidth: 275,
    },
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
});

const NotebooksT = (props) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [classId, setId] = useState(null);
    const [values, setValues] = useState(initialFieldValues)
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [className, setName] = useState(null);
    const [delId, setDelId] = useState('');
    let id = props.classId

    const handleClickOpenEdit = (editClass) => {
        setOpenEdit(true);
        console.log('open edit')
        setValues(editClass)
    };

    const handleClickOpenDelete = (delId) => {
        setOpenDelete(true);
        setDelId(delId);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const classes = useStyles();

    useEffect(() => {
        fetch(`https://localhost:44377/api/NotebookJH/${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [id])

    let itemList;

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return (
            <div>
                <CircularProgress size={'10%'} />
            </div>
        );
    } else {
        itemList = items.map((item,) => {
            return (
                <div key={item.notebookId} style={{
                    paddingBottom: 'unset'
                }}>
                    <Card className={classes.root} style={{
                        margin: "1%",
                        borderStyle: 'solid',
                        borderWidth: '1px'
                    }}>
                        <CardContent>
                            <div style={{
                                display: 'flex',
                                // textAlign: 'left',
                                // justifyContent: 'space-between'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    // borderRight: 'solid',
                                    paddingRight: '3%',
                                    textAlign: 'left'
                                }}>
                                    <div>Name</div>
                                    <div>Description</div>
                                    <div>Github Link</div>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'space-between',
                                    paddingLeft: '3%',
                                    textAlign: 'left'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <div >
                                            {item.title.substring(0, 30)}
                                        </div>
                                        <div variant="body2" component="p">
                                            {item.description.substring(0, 30)}
                                        </div>
                                        <div>
                                            {item.githubLink.substring(0, 40)}...
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <CardActions style={{
                                justifyContent: 'space-between'
                            }} >
                                <Button size="small" onClick={() => { handleClickOpenEdit(item) }}>Edit</Button>
                                <Button size="small" onClick={() => { handleClickOpenDelete(item.notebookId) }}>Delete</Button>
                            </CardActions>
                        </CardContent>
                    </Card >
                </div >
            )
        })

        return (
            <div>
                {itemList.length > 0 ? itemList : 'Notebooks'}
                <Dialog open={openEdit} onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Edit Class</DialogTitle>
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
                        <TextField
                            margin="dense"
                            id="githubLink"
                            label="Github Link"
                            name="githubLink"
                            fullWidth
                            value={values.githubLink}
                            onChange={handleInputChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleCloseEdit}
                            color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => {
                            handleCloseEdit()
                            axios.put(`https://localhost:44377/api/Notebooks/${values.notebookId}`, {
                                notebookId: values.notebookId,
                                githubLink: values.githubLink,
                                title: values.title,
                                description: values.description,
                                classId: values.classId
                            }).then(response => console.log(response))
                        }} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog >
                <Dialog open={openDelete} onClose={handleCloseDelete} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Are you sure you want to delete?</DialogTitle>
                    <DialogActions>
                        <Button onClick={handleCloseDelete} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => {
                            handleCloseDelete()
                            axios.delete(`https://localhost:44377/api/Notebooks/${delId}`, {})
                                .then(response => console.log(response))
                        }} color="secondary">
                            Yes, delete.
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }
}

export default NotebooksT
