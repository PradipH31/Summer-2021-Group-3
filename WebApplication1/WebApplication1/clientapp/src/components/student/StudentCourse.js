import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import { CircularProgress } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const StudentCourse = () => {
    let { id } = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        fetch(`/Classes/${id}`)
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
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return (
            <div>
                <CircularProgress size={'30%'} />
            </div>
        );
    } else {
        return (
            <React.Fragment>
                <h1>{items.className}</h1>
                <h3 style={{ textAlign: 'right' }}>{items.classOwner}</h3>
                <Paper >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Quiz" />
                        <Tab label="Flashcard" />
                        <Tab label="Announcement" />
                    </Tabs>
                </Paper>
            </React.Fragment>
        )
    }
}

export default StudentCourse
