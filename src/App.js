import React, {useEffect, useState} from "react";
import CatsDataService from "./services/service";
import {
    Autocomplete,
    TextField,
    Box,
    AppBar,
    Toolbar,
    Typography,
    Container,
    ImageList,
    ImageListItem,
    Button,
    ButtonGroup,
    Skeleton,
    Fab
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import {NotificationManager} from 'react-notifications';

const fab = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
};
const vertical = {
  margin: 0,
  top: 'auto',
  left: 20,
  bottom: 20,
  right: 'auto',
  position: 'fixed',
};

const CatsList = () => {
  const [cats, setCats] = useState([]);
  const [breeds, setBreeds] = useState();
  const [selectedBreed, setSelectedBreed] = useState();
  const [amount, setAmount] = useState(9);

  useEffect(() => {
    retrieveCats();
    retrieveBreeds();
  }, []);

  const retrieveCats = () => {
    CatsDataService.getByAmount(amount)
      .then(response => {
        setCats(response.data);
      })
      .catch(error => {
        NotificationManager.error(`$error`, "Error obtaining cats");
      });
  };

  const retrieveBreeds = () => {
    CatsDataService.getBreeds()
      .then(response => {
        setBreeds(response.data);
      })
      .catch(error => {
        NotificationManager.error(`$error`, "Error obtaining breeds");
      });
  };

  const retrieveById = () => {
    CatsDataService.getByBreed(selectedBreed, amount)
      .then(response => {
        setCats(response.data);
      })
      .catch(error => {
        NotificationManager.error(`$error, "Error obtaining by breed`)

      });
  };

  const handleRefresh = () => {
    selectedBreed ? retrieveById() : retrieveCats()
  }

  const handleIncrement = () => {
    setAmount(amount + 1);
  };

  const handleDecrement = () => {
    setAmount(amount - 1);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            OnlyCats
          </Typography>
          <Autocomplete
            sx={{ml: 2, width: 300}}
            disablePortal
            id="combo-box"
            options={breeds?.map(option => ({ id: option.id, label: option.name}))}
            onChange={(e, value) => setSelectedBreed(value?.id)}
            renderInput={(params) => <TextField {...params} label="Breed Search" />}
          />
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
    </Box>
        <ImageList>
          {cats.map((cat) => (
            <ImageListItemContainer key={cat.ids} url={cat.url} />
          ))}
        </ImageList>
      <Fab style={fab} color="primary" aria-label="add" onClick={handleRefresh}>
        <RefreshRoundedIcon />
      </Fab>
      <ButtonGroup style={vertical} variant="contained" orientation="vertical" aria-label="outlined primary button group">
        <Button onClick={handleIncrement}>
          <AddIcon />
        </Button>
        <Button>
          <Typography>{amount}</Typography>
        </Button>
        <Button onClick={handleDecrement}>
          <RemoveIcon />
        </Button>
      </ButtonGroup>
    </Container>
  );
};

function ImageListItemContainer({ props, url }) {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <Skeleton sx={{display: loading ? "block" : "none" }} variant="rectangular"/>
      <ImageListItem sx={{display: loading ? "none" : "block"}} {...props}>
        <img
          src={`${url}`}
          srcSet={`${url}`}
          onLoad={() => setLoading(false)}
          alt=""
        />
      </ImageListItem>
    </>
)}

export default CatsList;
