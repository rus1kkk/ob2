import { Box, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import objImage from "../assets/object.jpg";
import logoWithText from "../assets/hiking.png";

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="xs"
      sx={{
        textAlign: "center",
        py: 6,
        color: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#0032C9",
      }}
    >
      <Box>
        <img src={logoWithText} alt="" />
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom>
          Объект внимания:
        </Typography>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          АЛЕВРОЛИТ
        </Typography>
        <Box sx={{ mt: 4 }}>
          <img
            src={objImage}
            alt="Объект"
            style={{ width: "100%", borderRadius: "12px" }}
          />
        </Box>
      </Box>

      <Button
        variant="outlined"
        color="primary"
        size="large"
        onClick={() => navigate("/test")}
        sx={{
          mt: 6,
          py: 1.5,
          fontSize: "1.1rem",
          borderRadius: "15px",
          color: "white",
          border: "solid 3px white",
        }}
      >
        Начать
      </Button>
    </Container>
  );
};

export default StartPage;
