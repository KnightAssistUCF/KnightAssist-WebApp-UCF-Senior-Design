import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', minWidth: '100%', bgcolor:'#EAEAEB'}}>
      <Container maxWidth="xl" sx={{p: 3}}>
        <Typography variant="body2" color="#3C3C3E" align="center">
          {"Copyright © "}
          <Link color="inherit" href="https://your-website.com/">
            KnightAssist
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </Box>
  );
}