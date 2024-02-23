import * as React from 'react';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { Button, Typography } from '@mui/material';
import styled from '@emotion/styled';

// ** Icon Imports
import Icon from 'src/@core/components/icon'

export default function PopoverAddContent({handleAddEleContent, idContent}) {
    const [anchor, setAnchor] = React.useState(null);

    const handleClick = (event) => {
        setAnchor(anchor ? null : event.currentTarget);
    };

    const open = Boolean(anchor);
    const id = open ? 'simple-popper' : undefined;

    return (
        <div>
            <Button aria-describedby={id} type="button" onClick={handleClick}>
                <Icon icon='zondicons:add-outline' fontSize={20} />
            </Button>
            <BasePopup id={id} open={open} anchor={anchor}>
                <PopupBody>
                    <Typography sx={{mb: 3}}>
                        Add an element underneath
                    </Typography>
                    <Button variant='outlined' color='primary' sx={{ mr: 3 }} onClick={() => {
                        handleAddEleContent('title', idContent)
                        setAnchor(null)
                    }}>
                        Title
                    </Button>
                    <Button variant='outlined' color='primary' sx={{ mr: 3 }} onClick={() => {
                        handleAddEleContent('text', idContent)
                        setAnchor(null)
                    }}>
                        Text
                    </Button>
                    <Button variant='outlined' color='primary' sx={{ mr: 3 }} onClick={() => {
                        handleAddEleContent('img', idContent)
                        setAnchor(null)
                    }}>
                        Image
                    </Button>
                </PopupBody>
            </BasePopup>
        </div>
    );
}

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const PopupBody = styled('div')(
    ({ theme }) => `
    width: max-content;
    padding: 12px 16px;
    margin: 8px;
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    background-color: #fff;
    box-shadow: ${theme.palette.mode === 'dark'
            ? `0px 4px 8px rgb(0 0 0 / 0.7)`
            : `0px 4px 8px rgb(0 0 0 / 0.1)`
        };
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    z-index: 1;
  `,
);