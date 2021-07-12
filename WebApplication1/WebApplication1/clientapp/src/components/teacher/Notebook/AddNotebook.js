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
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
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

const AddNotebook = () => {
    const classes = useStyles();
    return (
        <Card className={classes.root} style={{
            margin: "1%",
            borderStyle: 'solid',
            borderWidth: '.1px'
            // backgroundImage: 'radial-gradient(circle, red, yellow, green);'
        }}>
            <CardContent>
                <Typography variant="h5" component="h2" style={{
                    backgroundColor: '#F8B77F',
                    color: 'white',
                    margin: '0% 30%  '
                }}>
                    Add Notebook
                </Typography>
            </CardContent>
        </Card >
    )
}

export default AddNotebook