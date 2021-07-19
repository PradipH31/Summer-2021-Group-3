import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CircularProgress, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import { Link } from "react-router-dom";
import AddFromGithub from "./AddFromGithub"
import DeleteIcon from '@material-ui/icons/Delete';
import AddFile from './AddFile';
import axios from 'axios';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
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

function ClassFilesT(props) {
    let id = props.classId
    console.log(props);

    const classes = useStyles();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [delId, setDelId] = useState('');
    const [open, setOpen] = React.useState(false);
    const [items, setItems] = useState([]);

    const handleClickOpen = (delId) => {
        setOpen(true);
        setDelId(delId);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetch(`https://localhost:44377/api/FileManagement/course/${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                    console.log(result)
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

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
        console.log(items)
        itemList = items.map((item,) => {
            return (
                <div key={item.infoFileId}
                    style={{
                        margin: '3% 30%',
                        display: 'flex',

                    }}>
                    <Link to={`/api/FileManagement/${item.infoFileId}?courseId=${item.courseId}&download=true`} target="_blank">

                        <Card className={classes.root} style={{
                            margin: "1%",
                            borderStyle: 'solid',
                            borderWidth: '1px'
                            // backgroundImage: 'radial-gradient(circle, red, yellow, green);'
                        }}>
                            <CardContent>
                                <Typography variant="h5" component="h2" style={{
                                    backgroundColor: '#8B7BE0',
                                    color: 'white',
                                    // margin: '0% 30%  '
                                }}>
                                    {item.name}
                                </Typography>
                            </CardContent>
                        </Card >
                    </Link>
                    {/* <Card> */}
                    <CardContent>
                        <Button onClick={() => { handleClickOpen(item.infoFileId) }}>
                            <DeleteIcon />
                        </Button>
                    </CardContent>
                    {/* </Card> */}
                </div >
            )
        })


        return (
            <div>
                {itemList.length > 0 ? itemList : 'Class Files'}
                <AddFromGithub classId={id} />
                <AddFile classId={id} />
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title"><center>Are you sure you want to delete?</center></DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => {
                            handleClose()
                            axios.delete(`https://localhost:44377/api/FileManagement/${id}/${delId}`, {})
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

export default ClassFilesT
