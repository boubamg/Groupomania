import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { yellow } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: yellow[500],
  },
}));

export default function Comment({isAdmin, creator, profilePicture, name, comment, handleDeleteComment}) {
  const classes = useStyles();

  const canUpdate = () => {
    if(parseInt(localStorage.getItem("userId")) === creator ||  isAdmin ){
      return true
    }
    return false
  }

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" src={profilePicture} className={classes.avatar}>
          </Avatar>
        }
        title={name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {comment}
        </Typography>
        
      </CardContent>

      {canUpdate() ? 
      <Button style={{ display:"flex", marginLeft:"auto"}} color="secondary" onClick={handleDeleteComment}>
        supprimer
      </Button> : null}

    </Card>
  );
}
