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
import NotebooksT from './Notebook/NotebooksT'
import '../../css/studentcourse.css'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import AddNotebook from './Notebook/AddNotebook';

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

function TabComponent(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItem] = useState([]);
    const classes = useStyles();

    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    let classId = props.classId

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <div>
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
                    <Tab label="Class Updates" {...a11yProps(1)} />
                    <Tab label="Students" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction} >
                    {classId ? <NotebooksT classId={classId} /> : ""}
                    {classId ? <AddNotebook classId={classId} /> : ""}
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    Class Updates
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}
                    // style={{
                    //     margin: '0% 20%',
                    //     backgroundColor: 'white',
                    //     padding: '1%',
                    //     borderRadius: '3%',
                    // }}
                >
                    Students
                </TabPanel>
            </SwipeableViews>
        </div>
    )
}

export default TabComponent
