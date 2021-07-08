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

    return (
        <div>
            <TestNoteBook />
            <TestNoteBook />
            <TestNoteBook />
            <TestNoteBook />
        </div>
    )
}

export default Notebooks
