import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';
import { Link } from "react-router-dom";

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

const NotebooksT = (props) => {
    let id = props.classId

    const classes = useStyles();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

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
                                textAlign: 'left',
                                // justifyContent: 'space-between'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRight: 'solid',
                                }}>
                                    <div>Name</div>
                                    <div>Description</div>
                                    <div>Github Link</div>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'space-between'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <div >
                                            {item.title}
                                        </div>
                                        <div variant="body2" component="p">
                                            {item.description}
                                        </div>
                                        <div>
                                            {item.githubLink}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <CardActions style={{
                                justifyContent: 'space-between'
                            }} >
                                <Button>
                                    Edit
                                </Button>
                                <Button>
                                    Delete
                                </Button>
                            </CardActions>
                        </CardContent>
                    </Card >
                </div >
            )
        })

        return (
            <div>
                {itemList.length > 0 ? itemList : 'Notebooks'}
            </div>
        )
    }
}

export default NotebooksT
