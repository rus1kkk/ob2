import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  AppBar,
  Toolbar,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import logoWithText from "../assets/hiking.png";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers = [], time = 0, userName = "Вы" } = location.state || {};

  const score = answers.filter((a) => a.answer === a.correctAnswerId).length;
  const total = answers.length;

  const [leaders, setLeaders] = useState([]);
  const [factOpen, setFactOpen] = useState(false);

  const fact =
    "Термин «алевролит» введён в геологическую практику в конце XIX века российским геологом А.П. Карпинским при систематизации осадочных пород.";

  useEffect(() => {
    const demoLeaders = [
      { id: 1, name: "Иван Петров", score: 3, time: 10 },
      { id: 2, name: "Анна Смирнова", score: 2, time: 7 },
      { id: 3, name: userName, score, time },
      { id: 4, name: "Алексей Иванов", score: 1, time: 15 },
      { id: 5, name: "Мария Кузнецова", score: 0, time: 20 },
    ];
    setLeaders(demoLeaders);
  }, [score, time, userName]);

  useEffect(() => {
    if (!answers || answers.length === 0) {
      navigate("/");
    }
  }, [answers, navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#0032C9",
        color: "white",
        pb: 5,
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{ backgroundColor: "transparent", py: 2 }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <img
              src={logoWithText}
              alt="Логотип"
              style={{ width: "160px", height: "auto" }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Результаты
        </Typography>
        <Typography variant="h6" gutterBottom>
          Ваш результат: {score}/{total} (
          {total ? Math.round((score / total) * 100) : 0}%)
        </Typography>
        <Typography variant="body1" gutterBottom>
          Время прохождения:{" "}
          {Math.floor(time / 60)
            .toString()
            .padStart(2, "0")}
          :{(time % 60).toString().padStart(2, "0")}
        </Typography>

        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Место</b>
                </TableCell>
                <TableCell>
                  <b>Имя Фамилия</b>
                </TableCell>
                <TableCell>
                  <b>Результат</b>
                </TableCell>
                <TableCell>
                  <b>Время (сек)</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaders.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{
                    backgroundColor:
                      row.name === userName
                        ? "rgba(25, 118, 210, 0.2)"
                        : "inherit",
                  }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.score}</TableCell>
                  <TableCell>{row.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setFactOpen(true)}
          >
            Показать интересный факт
          </Button>
        </Box>

        <Dialog open={factOpen} onClose={() => setFactOpen(false)}>
          <DialogTitle>Интересный факт о кварце</DialogTitle>
          <DialogContent>
            <DialogContentText>{fact}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setFactOpen(false)} color="primary">
              Закрыть
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default ResultsPage;
