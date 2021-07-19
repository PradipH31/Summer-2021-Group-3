import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { Card, CardContent, makeStyles, Typography } from '@material-ui/core'
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import React from 'react'
import SaveIcon from '@material-ui/icons/Save';


function AddFile(props) {
    let id = props.classId
    const [open, setOpen] = React.useState(false);
    const [file, setFile] = React.useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div onClick={handleClickOpen} style={{
                cursor: 'pointer'
            }}>
                <Card style={{
                    margin: "1%",
                    borderStyle: 'solid',
                    borderWidth: '.1px'
                }}>
                    <CardContent>
                        <Typography variant="h5" component="h2" style={{
                            backgroundColor: '#8B7BE0',
                            color: 'white',
                            margin: '0% 30%  '
                        }}>
                            Add File
                        </Typography>
                    </CardContent>
                </Card >
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth='sm'>
                <DialogTitle id="form-dialog-title"><center>Add File</center></DialogTitle>
                <DialogContent>
                    <input
                        type="file"
                        onChange={(e) => {
                            console.log(e)
                            let imageFile = e.target.files[0];
                            const reader = new FileReader();
                            reader.onload = x => {
                                setFile(imageFile)
                            }
                            reader.readAsDataURL(imageFile)
                        }}
                        style={{
                            display: 'none'
                        }}
                        id="contained-button-file"
                        multiple
                    />
                    <label htmlFor="contained-button-file" style={{
                        display: 'flex',
                        justifyContent: 'space-evenly'
                    }}>
                        <Button
                            variant="contained"
                            color="default"
                            component="span"
                            // className={classes.button}
                            startIcon={<SaveIcon />}
                        >
                            Select File
                        </Button>
                        {file ?
                            <Button variant="outlined">{file.name}</Button>
                            :
                            ""
                        }
                    </label>
                </DialogContent>
                <DialogActions style={{
                    justifyContent: 'space-between'
                }}>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        // className={classes.button}
                        startIcon={<CloudUploadIcon />}
                        onClick={
                            () => {
                                const formData = new FormData()
                                formData.append('postedFile', file)
                                axios.post(`https://localhost:44377/api/FileManagement/${id}`, formData)
                                handleClose()
                                setFile(null)
                            }}
                    >
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddFile
