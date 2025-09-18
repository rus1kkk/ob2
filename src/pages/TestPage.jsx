import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import logoWithText from "../assets/hiking.png";
import questionsData from "../data/questions.json";

const TestPage = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [time, setTime] = useState(0);

  const timerRef = useRef(null);

  useEffect(() => {
    // Функция перемешивания массива
    const shuffleArray = (array) => {
      return array
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
    };

    if (questionsData && questionsData.questions) {
      const shuffled = shuffleArray(questionsData.questions);
      const selected = shuffled.slice(0, 3); // берём первые 3
      setQuestions(selected);
    }

    timerRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  if (questions.length === 0 || !questions[currentQuestionIndex]) return null;

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    const newAnswers = [
      ...answeredQuestions,
      {
        questionId: currentQuestion.id,
        answer: selectedAnswer,
        correctAnswerId: currentQuestion.correctAnswerId,
      },
    ];
    setAnsweredQuestions(newAnswers);
    setSelectedAnswer("");

    if (isLastQuestion) {
      clearInterval(timerRef.current);
      navigate("/results", {
        state: {
          answers: newAnswers,
          time,
          userName: "Вы",
        },
      });
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: "100vh",
        backgroundColor: "#0032C9",
        color: "white",
        padding: "16px",
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
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            ⏱{" "}
            {Math.floor(time / 60)
              .toString()
              .padStart(2, "0")}
            :{(time % 60).toString().padStart(2, "0")}
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xs" sx={{ py: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          Вопрос №{currentQuestionIndex + 1}
        </Typography>

        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 4 }}
        >
          {currentQuestion.text}
        </Typography>

        {currentQuestion.image && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <img
              src={currentQuestion.image}
              alt="Вопрос"
              style={{ maxWidth: "100%", borderRadius: "8px" }}
            />
          </Box>
        )}

        <FormControl component="fieldset" sx={{ width: "100%", mb: 4 }}>
          <RadioGroup value={selectedAnswer} onChange={handleAnswerChange}>
            {currentQuestion.options.map((option) => (
              <FormControlLabel
                key={option.id}
                value={option.id}
                control={
                  <Radio
                    sx={{
                      py: 1,
                      color: "white",
                      "&.Mui-checked": { color: "primary.main" },
                    }}
                  />
                }
                label={<Typography variant="body1">{option.text}</Typography>}
                sx={{
                  border: "1px solid",
                  borderColor:
                    selectedAnswer === option.id
                      ? "primary.main"
                      : "rgba(255,255,255,0.3)",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  mb: "12px",
                  backgroundColor:
                    selectedAnswer === option.id
                      ? "rgba(25, 118, 210, 0.2)"
                      : "rgba(255, 255, 255, 0.1)",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: "primary.main",
                    backgroundColor: "rgba(25, 118, 210, 0.2)",
                  },
                }}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            size="large"
            onClick={handleNext}
            disabled={!selectedAnswer}
            sx={{
              minWidth: "200px",
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: "500",
              borderRadius: "15px",
              border: "solid 3px white",
              color: !selectedAnswer ? "grey" : "white",
              backgroundColor: !selectedAnswer ? "grey" : "transparent",
            }}
          >
            {isLastQuestion ? "Завершить тест" : "Следующий вопрос"}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TestPage;
