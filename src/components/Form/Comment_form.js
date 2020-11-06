import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    comment: {
        marginTop: theme.spacing(3)
    },
}));

export default function CommentForm({commentValue, commentChange, commentSubmit}) {
  const classes = useStyles();

  
  return (
    <Container  component="main" maxWidth="xs" className={classes.container}>
        <div className={classes.paper}>
        
        <form className={classes.form} onSubmit={commentSubmit}>
        <Grid container justify="center" spacing={0}>
           
            <TextField
                name="comment"
                id="comment"
                multiline
                placeholder="Commentez..."
                value={commentValue}
                onChange={commentChange}
                className={classes.comment}
                required />
            
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}>
                Commenter
            </Button> 
                    
        </Grid>
        </form>
    </div>
    </Container>
    
  );
}
