import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import TabComponent from './TabComponent';
import AddClass from './AddClass';
import axios from 'axios';

const initialFieldValues = {
    classId: '',
    className: '',
    classDescription: '',
    classOwner: '',
    imageName: '',
    imageSrc: ''
}

const TeacherClassList = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [classId, setId] = useState(null);
    const [values, setValues] = useState(initialFieldValues)
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [className, setName] = useState(null);
    const [delId, setDelId] = useState('');

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    useEffect(() => {
        fetch("https://localhost:44377/api/Class")
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
    }, [])

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

    const handleClickOpenEdit = (editClass) => {
        setOpenEdit(true);
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

    const classes = useStyles();
    let itemList;
    let [currentActive, setActive] = useState(null);

    const SelectedCard = (props) => {
        let classItem = props.class
        return (
            <CardContent style={{
                color: 'black',
                backgroundColor: 'aliceblue'
            }}>
                <Typography variant="h5" component="h2" style={{
                    backgroundColor: '#F8B77F',
                    margin: '0% 20%'
                }}>
                    {classItem.className}
                </Typography>
                <Typography variant="body2" component="p">
                    {classItem.classDescription.substring(0, 30)}
                </Typography>
            </CardContent>
        )
    }

    const NormalCard = (props) => {
        let classItem = props.class
        return (
            <CardContent>
                <Typography variant="h5" component="h2" style={{
                    backgroundColor: '#F8B77F',
                    color: 'white',
                    margin: '0% 20%'
                }}>
                    {classItem.className}
                </Typography>
                <Typography variant="body2" component="p">
                    {classItem.classDescription.substring(0, 30)}
                </Typography>
            </CardContent>
        )
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return (
            <div>
                <CircularProgress size={'30%'} />
            </div>
        );
    } else {
        itemList = items.map((item,) => {
            return (
                <div key={item.classId}>
                    <Card className={classes.root} style={{
                        margin: "10%",
                        maxWidth: 'unset',
                        borderStyle: 'groove',
                        cursor: 'context-menu'
                    }}
                    >
                        <div key={item.classId}
                            onClick={() => {
                                setId(item.classId)
                                setName(item.className)
                                setActive(item.classId)
                                window.scrollTo({
                                    top: 0,
                                    left: 0,
                                    behavior: 'smooth'
                                })
                            }}>
                            {!(currentActive && currentActive === item.classId) ? <NormalCard class={item} /> : <SelectedCard class={item} />}
                        </div >
                        <CardActions style={{ justifyContent: 'space-between' }}>
                            <Button size="small" onClick={() => { handleClickOpenEdit(item) }}>Edit</Button>
                            <Button size="small" onClick={() => { handleClickOpenDelete(item.classId) }}>Delete</Button>
                        </CardActions>
                    </Card>
                </div>
            )
        })

        return (
            <>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    margin: '0% 3%'
                }}>
                    <div
                        style={{
                            flexGrow: '3',
                            margin: '1%',
                            borderRight: 'solid'
                        }}>
                        <span style={{ fontSize: '30px' }}>Classes</span>
                        {itemList}
                        <Dialog open={openEdit} onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Edit Class</DialogTitle>
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
                                <Button
                                    onClick={handleCloseEdit}
                                    color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={() => {
                                    handleCloseEdit()
                                    axios.put(`https://localhost:44377/api/Class/${values.classId}`, {
                                        classId: values.classId,
                                        className: values.className,
                                        classDescription: values.classDescription,
                                        classOwner: values.classOwner
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
                                    axios.delete(`https://localhost:44377/api/Class/${delId}`, {})
                                        .then(response => console.log(response))
                                }} color="secondary">
                                    Yes, delete.
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <AddClass />
                    </div>
                    <div
                        style={{
                            flexGrow: '5',
                        }}>
                        <div style={{
                            fontSize: '50px',
                            paddingBottom: '5%'
                        }}>
                            {className}
                        </div>
                        {classId ? <TabComponent classId={classId} /> : ""}
                    </div>
                </div>
            </>
        );
    }
}

export default TeacherClassList