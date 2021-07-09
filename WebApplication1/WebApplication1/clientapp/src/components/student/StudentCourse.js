import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import { CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Notebooks from './CourseContents/Notebooks';
import '../../css/studentcourse.css'

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const StudentCourse = () => {
    let { id } = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItem] = useState([]);

    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };


    useEffect(() => {
        fetch(`https://localhost:44377/api/Class/${id}`)
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
                <div style={{
                    color: 'white',
                    backgroundImage: "linear-gradient(to top, #ff0844 0%, #ffb199 100%)"
                }}>
                    <h1 style={{ marginBlockStart: 'unset', paddingTop: '5%' }}>{item.className}</h1>
                    <h3 style={{ textAlign: 'right' }}>{item.classOwner}</h3>
                </div>
                <AppBar position="static" color="default" style={{
                    backgroundColor: '#AED1B1'
                }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Notebooks" {...a11yProps(0)} />
                        <Tab label="Flashcard" {...a11yProps(1)} />
                        <Tab label="Class Updates" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction} >
                        <Notebooks classId={{ id }} />
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        Flashcard
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        Class Updates
                    </TabPanel>
                </SwipeableViews>
            </React.Fragment>
        )
    }
}

export default StudentCourse
