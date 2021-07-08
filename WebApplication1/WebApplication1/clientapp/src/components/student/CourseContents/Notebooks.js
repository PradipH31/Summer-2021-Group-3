import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
    return (
        <div>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Add in Jupyter
                    </Typography>
                    <Typography variant="h5" component="h2">
                        Notebook Title
                    </Typography>
                    <Typography variant="body2" component="p">
                        Notebook Description
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Open in Github</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default Notebooks
