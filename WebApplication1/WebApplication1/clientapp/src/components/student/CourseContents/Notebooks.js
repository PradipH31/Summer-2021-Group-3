import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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



const Notebooks = (props) => {
    let { id } = props.classId
    console.log(props);

    const classes = useStyles();

    const TestNoteBook = () => {
        return (
            <Card className={classes.root} style={{
                margin: "1%"
            }}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Add in Jupyter
                    </Typography>
                    {/* <a href="localhost:12000/hub/user-redirect/
                    git-pull?repo=https:%2F%2Fgithub.com%2Frevbayes%2FRevNotebooks&
                    subPath=RB_Intro%2FRB_Intro.ipynb&app=lab"> */}
                    <a
                        href="#"
                        target="_blank"
                    >
                        <Typography variant="h5" component="h2">
                            Notebook Title
                        </Typography>
                    </a>
                    <Typography className={classes.pos} color="textSecondary">
                        Uploaded Date
                    </Typography>
                    <Typography variant="body2" component="p">
                        Notebook Description
                    </Typography>
                </CardContent>
                <CardActions>
                    <a
                        href="#"
                    >
                        <Button size="small">Open in Github</Button>
                    </a>
                </CardActions>
            </Card >
        );
    }


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
                <div key={item.notebookId}>
                    <Card className={classes.root} style={{
                        margin: "1%",
                        backgroundImage: 'radial-gradient(circle, red, yellow, green);'
                    }}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Add in Jupyter
                            </Typography>
                            {/* <a href="localhost:12000/hub/user-redirect/
                        git-pull?repo=https:%2F%2Fgithub.com%2Frevbayes%2FRevNotebooks&
                        subPath=RB_Intro%2FRB_Intro.ipynb&app=lab"> */}
                            <a
                                href={`${item.jupyterHubLink}`}
                                target="_blank"
                            >
                                <Typography variant="h5" component="h2" style={{
                                    backgroundColor: '#F8B77F',
                                    color: 'white',
                                    margin: '0% 30%  '
                                }}>
                                    {item.title}
                                </Typography>
                            </a>
                            <Typography className={classes.pos} color="textSecondary">
                                {item.createdDate.slice(0, 10)}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {item.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <a
                                href={`${item.githubLink}`}
                                target="_blank"
                            >
                                <Button size="small">Open in Github</Button>
                            </a>
                        </CardActions>
                    </Card >
                </div>
            )
        })

        return (
            <div>
                {itemList}
            </div>
        )
    }
}

export default Notebooks
