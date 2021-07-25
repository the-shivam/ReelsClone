import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { database } from '../firebase'
import './AddComment.css';

const useStyles = makeStyles({
    cbtn: {
        marginRight: '1%',
        marginTop: '4%'
    }
})

function AddComment({ userData = null, postData = null }) {
    const classes = useStyles();
    const [text, setText] = useState('');
    const manageText = (e) => {
        let comment = e.target.value;
        setText(comment);
    }
    const handleOnEnter = () => {
        let obj = {
            text: text,
            nName: userData.username,
            uUrl: userData.profileUrl
        }
        database.comments.add(obj).then((docRef) => {
            database.posts.doc(postData.postId).update({
                comments: [...postData.comments, docRef.id]
            })
        }).catch((e) => {
            console.log(e);
        })
        setText('');
    }
    return (
        <div className='emojibox'>
            <TextField value={text} fullWidth={true} label='Add a comment' onChange={manageText} />
            <Button onClick={handleOnEnter} disabled={text == '' ? true : false} className={classes.cbtn} color='primary'>Post</Button>
        </div>
    )
}

export default AddComment
