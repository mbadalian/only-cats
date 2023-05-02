import React, {useEffect, useState} from "react";
import CatsDataService from "./services/service";
import {
    Paper,
    Table,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Container,
    ImageList,
    ImageListItem,
    Button,
    Skeleton
} from "@mui/material";
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import {NotificationManager} from 'react-notifications';
import './App.css';

const CatsList = () => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    retrieveCats();
  }, []);

  const retrieveCats = () => {
    CatsDataService.getByAmount(9)
      .then(response => {
        setCats(response.data);
      })
      .catch(error => {
        NotificationManager.error(`$error`, "Error obtaining cats");
      });
  };

  return (
    <Container maxWidth="md">
      <ImageList>
        {cats.map((cat) => (
          <ImageListItem key={cat.url}>
            <img
            src={`${cat.url}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${cat.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={cat.id}
            loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Button onClick={retrieveCats} variant="contained" endIcon={<RefreshRoundedIcon />}>Refresh</Button>
    </Container>
  );
};

// const ImageListItemContainer = (props) => {
//   return (
//       <>
//         loadingContext && <Skeleton />
//         <ImageListItem {...props} onload={() => setLoadingContext(false)}>
//         </ImageListItem>
//       </>
// )};

export default CatsList;
