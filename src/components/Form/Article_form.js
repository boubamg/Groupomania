import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // display: 'none'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        '& > *': {
        margin: theme.spacing(1),
    },
    },
    input: {
        display: 'none',
    },
    label: {
        margin: theme.spacing(1)
    },
    button: {
        margin: theme.spacing(1),
    },
    container: {
        boxShadow: " -7px 11px 34px 15px rgba(0,0,0,0.24)",
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    }
}));

export default function Signup({buttonContent, contentValue, contentChange, attachmentChange, fileName, Submit}) {
  const classes = useStyles();
  
  return (
    <Container  component="main" maxWidth="xs" className={classes.container}>
        <div className={classes.paper}>
        
        <form className={classes.form} onSubmit={Submit}>
        <Grid container justify="center" spacing={0}>
            <Grid item xs={8}>
                <TextField
                name="content"
                id="content"
                variant="outlined"
                multiline
                placeholder="Que voulez vous dire ?"
                value={contentValue}
                onChange={contentChange}
                required
                />
            </Grid>
            <input
                accept="image/*"
                className={classes.input}
                id="attachment"
                name="attachment"
                type="file"
                onChange={attachmentChange}
            />
            <label htmlFor="attachment">
                <Button variant="contained" color="primary" component="span" className={classes.label}>
                    <PhotoCamera />
                </Button>
            </label>

            {fileName}
            
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}>
            {buttonContent}
            </Button> 

        </Grid>
        </form>
    </div>
    </Container>
    
  );
}
