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
    const [item, setItem] = useState([]);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        fetch(`https://localhost:44377/api/Classes/${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItem(result);
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
                <div>
                    <h1 style={{ marginBlockStart: 'unset', paddingTop: '5%' }}>{item.className}</h1>
                    <h3 style={{ textAlign: 'right' }}>{item.classOwner}</h3>
                </div>
                <Paper >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Notebooks" />
                        <Tab label="Flashcard" />
                        <Tab label="Class Updates" />
                    </Tabs>
                </Paper>
            </React.Fragment>
        )
    }
}

export default StudentCourse
