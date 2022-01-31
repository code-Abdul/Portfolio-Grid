import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import "./App.css";

function App() {
  const [portfolioData, setPortfolioData] = useState([]);
  const [cardIndex, setCardIndex] = useState();

  useEffect(() => {
    getPortfolioData();
  }, []);

  async function getPortfolioData() {
    const response = await fetch("https://api.imgflip.com/get_memes", {
      method: "GET",
    });
    response.json().then((res) => {
      setPortfolioData(res.data);
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-heading">Portfolio Grid 4</h1>
        <p>This grid shows the items pages in a popup</p>
      </header>
      <Box className="App-grid">
        <Grid container spacing={1.5}>
          {portfolioData?.memes?.map((meme, index) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
              <Card
                sx={{ maxWidth: 345 }}
                onMouseOver={() => setCardIndex(index)}
                onMouseOut={() => setCardIndex(null)}
              >
                {cardIndex !== index ? (
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="240"
                      image={meme?.url}
                      alt={meme?.name}
                    />
                  </CardActionArea>
                ) : (
                  <CardContent>
                    <Typography>
                      <h5>{meme?.name}</h5>
                    </Typography>
                  </CardContent>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default App;
