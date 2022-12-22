import { CircularProgress, Container, Typography, Box, Button, Stack, FormControl, TextField, FormLabel, RadioGroup, FormControlLabel, Radio, Slider } from '@mui/material'
import Head from 'next/head'
import { Fragment, useEffect, useState } from 'react'
import NavBar from '../common/components/Header/Navbar'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { green, grey, red } from '@mui/material/colors';
// Used to include thumbnail data for safely rendering user models on dashboard


enum Holidays {
  'Christmas' = 0,
  'Hanukkah' = 1,
  'Kwanzaa' = 2,
  'New Years' = 3,
  'Non-Denominational' = 4
}
enum Protagonists {
  'Santa' = 0,
  'Rudolph' = 1,
  'Jesus' = 2,
  'Judah Macabee' = 3,
  'Moses' = 4,
  'Stone Cold Steve Austin' = 5
}

type SongDataType = {
  title: string,
  lyrics: string,
} | null



const Home = () => {
  // const Home = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { loadingUser, setLoadingUser } = useAuth()
  const router = useRouter();



  const songForm = useFormik({
    initialValues: {
      'artist': '',
      'song': '',
      'niceScale': 0,
      'holiday': 0,
      'protagonist': 0
    }, onSubmit: async values => {
      console.log("sending");
      fetch('/api/song/search', {
        method: 'POST', body: JSON.stringify(values)
      }).then(res => {
        if (res.status == 200) {
          return res.json().then(data => {
            console.log(data.lyrics);
            setSongData(data);
          })
        } else {
          res.json().then(data => {
            console.log("Error getting song");
          })
        }
      }).catch(err => {
        console.log(err);
      })


      // const res = await register(values.email, values.password, values.fname, values.lname);
      //router.push('/');
    }
  });



  useEffect(() => {
    console.log(loadingUser.isLoading);
    console.log(loadingUser.user);
    if (loadingUser.isLoading) {
      return;
    }
    else if ((!loadingUser.isLoading && !loadingUser.user)) {
      console.log("redirecting to login...");
      router.push('/login');
    }

  }, [loadingUser]);

  let [songData, setSongData] = useState<SongDataType>(null);
  let [naughtyLevel, setNaughtyLevel] = useState<number>(0);
  let buttonColor;
  let buttonText;
  switch (naughtyLevel) {
    case -2:
      buttonColor = red[500];
      buttonText = "Ho Ho Ho 👹"
      break;
    case -1: buttonColor = red[200];
      buttonText = "Naughty"
      break;
    case 0: buttonColor = "#fff";
      buttonText = "Submit 😐"
      break;
    case 1: buttonColor = green[300];
      buttonText = "Aren't you sweet"
      break;
    case 2: buttonColor = green['A400'];
      buttonText = "Santa's Little Helper 😇"
      break;
  }

  return (
    (loadingUser.isLoading) ? <Container><Box component="div" width='100%' margin={10} display="flex" alignItems={'center'} justifyContent='center'><CircularProgress /></Box> </Container> :
      <Fragment>
        <Head>
          <title>HoliFi❄️</title>
          <meta name="description" content="Generated by create next app" />
          {/* <Link rel="icon" href="/favicon.ico" /> */}
        </Head>
        <NavBar bg='black' p={4} />
        <Container maxWidth='md'>

          <Box component="div" textAlign='center'>
            <Box margin='0 auto' marginTop={5} alignItems={'center'}>
              <Stack direction={'column'}>
                <Box margin={5}>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                      row
                      onChange={e => songForm.setFieldValue('holiday', e.target.value)}
                    >
                      <FormLabel id="demo-radio-buttons-group-label" sx={{ alignItems: 'center', display: 'flex' }}>Holiday</FormLabel>
                      <FormControlLabel value={0} control={<Radio />} label="Christmas" labelPlacement='top' />
                      <FormControlLabel value={1} control={<Radio />} label="Hanukkah" labelPlacement='top' />
                      <FormControlLabel value={2} control={<Radio />} label="Kwanzaa" labelPlacement='top' />
                      <FormControlLabel value={3} control={<Radio />} label="New Years" labelPlacement='top' />
                      <FormControlLabel value={4} control={<Radio />} label="Non-Denominational" labelPlacement='top' />

                    </RadioGroup>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                      row
                      onChange={e => songForm.setFieldValue('protagonist', e.target.value)}
                    >
                      <FormLabel id="demo-radio-buttons-group-label" sx={{ alignItems: 'center', display: 'flex' }}>Protagonist</FormLabel>
                      <FormControlLabel value={0} control={<Radio />} label="Santa Clause" labelPlacement='top' />
                      <FormControlLabel value={1} control={<Radio />} label="Jesus Christ" labelPlacement='top' />
                      <FormControlLabel value={2} control={<Radio />} label="Judah Maccabee" labelPlacement='top' />
                      <FormControlLabel value={3} control={<Radio />} label="Moses" labelPlacement='top' />
                      <FormControlLabel value={4} control={<Radio />} label="Stone Cold Steve Austin" labelPlacement='top' />
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Stack>
              <Box width={500} margin='0 auto' marginY={5}>
                  <Slider min={-2} max={2} step={1} marks={[
                    { value: -2, label: 'Naughty' },
                    { value: -1, label: '' },
                    { value: 0, label: 'Neutral' },
                    { value: 1, label: '' },
                    { value: 2, label: 'Nice' },
                  ]}
                    onChange={(e, value) => {
                      setNaughtyLevel(value as number);
                      songForm.setFieldValue('naughtyNice', value)
                    }}
                    defaultValue={0}

                  />
                </Box>
            </Box>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent='center' >
              <FormControl id='email'>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="Artist"
                  label='Artist'
                  autoFocus
                  onChange={e => songForm.setFieldValue('artist', e.target.value)}
                />
              </FormControl>
              <FormControl id='email'>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="Song"
                  label='Song'
                  autoFocus
                  onChange={e => songForm.setFieldValue('song', e.target.value)}
                />
              </FormControl>
             

            </Stack>
            {songData !== null ? <Typography>Selected: {songData.title}</Typography> : <Typography>Search for song above</Typography>}
              <Button sx={{ 'backgroundColor': buttonColor }} onClick={songForm.submitForm}>{buttonText}</Button>
            <Box margin={4} sx={{ 'backgroundColor': grey[500] }} width={'100%'} minHeight='400px'>

              <TextField
                multiline
                maxRows={Infinity}
                fullWidth
                sx={{ 'backgroundColor': grey[500], 'color': 'white', 'boxShadow': 'none !important' }}
                disabled
                value={songData !== null ? songData.lyrics : "Lyrics will appear here"}

              />
            </Box>
          </Box>
          
        </Container>
      </Fragment>

  )
}


// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
//   const uid = await verifyAuthSSR(ctx);
//   if (uid == null) {

//     return {
//       props: {
//         data: null
//       }
//     }
//   }
//   console.log("Successfully Authenticated", uid)
//   // FETCH STUFF HERE!! 🚀
//   console.log("Trying to fetch: " + 'data/quotes/');
//   console.log("UID: " + uid)
//   const db = firebaseAdmin.firestore();
//   const itemObjects: ItemType[] = [];
//   const draftCollection = await db.collection("users/" + uid + "/data").get()
//   for (const doc of draftCollection.docs) {
//     const dataTypeResponse: ItemType | null = itemTypeFromFirebase(doc.id, doc.data());
//     if (dataTypeResponse != null) {
//       itemObjects.push(dataTypeResponse);
//     }
//   }
//   return {
//     props: {
//       data: JSON.parse(JSON.stringify(itemObjects))
//     }
//   }
// }


export default Home
