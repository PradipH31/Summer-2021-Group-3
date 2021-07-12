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
import AddClass from './AddClass';

const TeacherClassList = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [classId, setId] = useState(null);
    const [className, setName] = useState(null);

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

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    let itemList;

    const changeBackground = (e) => {
        e.target.style.background = 'red';
    }

    let [currentActive, setActive] = useState(null);

    const SelectedCard = (props) => {
        let classItem = props.class
        return (
            <Card className={classes.root} style={{
                margin: "10%",
                maxWidth: 'unset',
                borderStyle: 'groove',
                color: 'black',
                cursor: 'context-menu',
                backgroundColor: 'aliceblue'
            }}
            >
                <CardContent>
                    <Typography variant="h5" component="h2" style={{
                        backgroundColor: '#F8B77F',
                        margin: '0% 30%'
                    }}>
                        {classItem.className}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {classItem.classDescription.substring(0, 30)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <a href={`${classItem.githubLink}`} target="_blank" rel="noreferrer">
                        <Button size="small">Edit</Button>
                    </a>
                </CardActions>
            </Card >
        )
    }

    const NormalCard = (props) => {
        let classItem = props.class
        return (
            <Card className={classes.root} style={{
                margin: "10%",
                maxWidth: 'unset',
                borderStyle: 'groove',
                cursor: 'context-menu'
            }}
            >
                <CardContent>
                    <Typography variant="h5" component="h2" style={{
                        backgroundColor: '#F8B77F',
                        color: 'white',
                        margin: '0% 30%'
                    }}>
                        {classItem.className}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {classItem.classDescription.substring(0, 30)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <a href={`${classItem.githubLink}`} target="_blank" rel="noreferrer">
                        <Button size="small">Edit</Button>
                    </a>
                </CardActions>
            </Card >
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
                    {/* < Card className={classes.root} style={{
                        margin: "10%",
                        maxWidth: 'unset',
                        borderStyle: 'groove',
                        cursor: 'context-menu'
                    }}
                    >
                        <CardContent>
                            <Typography variant="h5" component="h2" style={{
                                backgroundColor: '#F8B77F',
                                color: 'white',
                                margin: '0% 30%'
                            }}>
                                {item.className}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {item.classDescription.substring(0, 30)}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <a href={`${item.githubLink}`} target="_blank" rel="noreferrer">
                                <Button size="small">Edit</Button>
                            </a>
                        </CardActions>
                    </Card > */}
                </div >
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
                            flexGrow: '1',
                            margin: '1%',
                            borderRight: 'solid'
                        }}>
                        {itemList}
                        <AddClass />
                    </div>
                    <div
                        style={{
                            flexGrow: '7',
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