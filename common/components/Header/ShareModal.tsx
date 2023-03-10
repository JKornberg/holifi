import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Typography,
} from '@mui/material'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { FiShare } from 'react-icons/fi'
import { useState } from 'react'
import { isMobile } from 'react-device-detect'

export default function ShareModal(props: {
  shareModal: any
  setShareModal: any
  shareImage: any
  songFile: any
  songData: any
}) {
  const { shareModal, setShareModal, shareImage, songFile, songData } = props
  const [dataUrl, setDataUrl] = useState(null)
  return (
    <Modal
      open={shareModal}
      onClose={() => setShareModal(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        width={{ xs: '90%', sm: '45%', md: '30%' }}
        style={{
          backgroundColor: '#090c24',
          padding: 5,
          borderRadius: 10,
          position: 'relative',
        }}
        height={{ xs: '80%', sm: '90%', md: '90%' }}
      >
        <IconButton
          style={{ position: 'absolute', top: 0, right: 0 }}
          children={<AiOutlineCloseCircle />}
          onClick={() => setShareModal(false)}
        />
        <Typography
          id='modal-modal-title'
          variant='h6'
          textAlign={'center'}
          fontFamily='Montserrat'
          color='#ef5350'
        >
          Share
        </Typography>
        <Divider
          light={true}
          variant={'fullWidth'}
          style={{
            margin: '5px auto',
            width: '100%',
            backgroundColor: 'lightgrey',
            height: '0.5px',
            border: 'none',
          }}
        />
        <Box
          width={'100%'}
          height={'80%'}
          style={{
            margin: '0 auto',
          }}
        >
          <img
            alt='test'
            style={{
              display: 'block',
              margin: '0 auto',
              maxWidth: '100%',
              maxHeight: '100%',
            }}
            src={shareImage}
          ></img>
        </Box>
        <Button
          style={{
            display: 'block',
            margin: '20px auto',
          }}
          onClick={() => {
            let share = {
              title: 'HoliFi Song',
              files: [songFile],
            }
            if (
              navigator.canShare != undefined &&
              navigator.canShare(share) &&
              isMobile
            ) {
              navigator.share(share).catch((error) => {}) // do nothing, user cancelled share
            } else {
              const link = document.createElement('a')
              link.download = `Holifi_${songData.title}.jpg`
              link.href = shareImage
              link.click()
            }
          }}
        >
          <FiShare />
        </Button>
        {dataUrl != null && (
          <a download={'image.jpg'} href={dataUrl}>
            asdf
          </a>
        )}
      </Box>
    </Modal>
  )
}
