//留言板

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { Divider, Grid, Paper } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import { Typography } from '@mui/material';

export default function CommentsBox({data}) {
    const subtitle = { 
        width: "150px" 
      };

    return (
        <Box
        sx={{
          display: 'flex',
          '@media (max-width: 600px)': {
            display: 'block', 
          },
        }}
        >
          <div style={subtitle}><Typography variant="h6"> 討論串 </Typography></div>
            <Paper style={{ padding: "30px 30px", width: "100%" }}>
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <Avatar alt="Remy Sharp"/>
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                  <h4 style={{ margin: 0, textAlign: "left" }}> name </h4>
                  <p style={{ textAlign: "left" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                    luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
                    Suspendisse congue vulputate lobortis. Pellentesque at interdum
                    tortor. Quisque arcu quam, malesuada vel mauris et, posuere
                    sagittis ipsum. Aliquam ultricies a ligula nec faucibus.{" "}
                  </p>
                </Grid>
              </Grid>
              <Divider variant="fullWidth" style={{ margin: "20px 0" }} />
              <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar alt="Remy Sharp"/>
                  </Grid>
                  <Grid justifyContent="left" item xs zeroMinWidth>
                    <h4 style={{ margin: 0, textAlign: "left" }}> name </h4>
                    <p style={{ textAlign: "left" }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                      luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
                      Aliquam ultricies a ligula nec faucibus.{" "}
                    </p>
                  </Grid>
              </Grid>
              <Divider variant="fullWidth" style={{ margin: "20px 0" }} />
              <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar alt="Remy Sharp"/>
                  </Grid>
                  <Grid justifyContent="left" item xs zeroMinWidth>
                    <h4 style={{ margin: 0, textAlign: "left" }}> name </h4>
                    <p style={{ textAlign: "left" }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                      luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
                      Suspendisse congue vulputate lobortis.Quisque arcu quam, malesuada vel mauris et, posuere
                      sagittis ipsum. Aliquam ultricies a ligula nec faucibus.{" "}
                    </p>
                  </Grid>
              </Grid>
              <Divider variant="fullWidth" style={{ margin: "10px 0" }} />
              <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar alt="Remy Sharp"/>
                  </Grid>
                  <Grid justifyContent="left" item xs zeroMinWidth>
                    <h4 style={{ margin: 0, textAlign: "left" }}> name </h4>
                    <TextField
                      fullWidth
                      variant="outlined"
                      sx={{ mt: 1}}
                      label="Add comment"
                    />
                  </Grid>
              </Grid>
            </Paper>   
        </Box>
    );
}