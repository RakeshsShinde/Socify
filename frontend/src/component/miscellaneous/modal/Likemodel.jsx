import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Typography } from '@mui/material';
import SingleSuggestion from '../../Layout/HomeLayout/suggestion/SingleSuggestion';


const LikeDialog = ({ heading, open, handleClose, users }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title">{users?.length} {heading}</DialogTitle>
            <Divider sx={{ width: '100%' }} />
            <DialogContent sx={{ width: '450px', maxHeight: '450px' }} dividers={scroll === 'paper'}>
                <DialogContentText
                    id="scroll-dialog-description"
                    tabIndex={-1}
                >
                    {users?.length > 0 ? users?.map((u) => (
                        <SingleSuggestion user={u} key={u._id} />
                    )) : <Typography variant='subtitle1'>No {heading} yet</Typography>}

                </DialogContentText>
            </DialogContent>
            <Divider sx={{ width: '100%' }} />
            <DialogActions>
                <Button variant='contained' color='error' sx={{
                    width: '50px',
                    height: '30px',
                    margin: '8px 15px 3px 0px',
                    textTransform: 'lowercase'
                }} onClick={handleClose}>close </Button>
            </DialogActions>
        </Dialog>
    );
}

export default LikeDialog;
