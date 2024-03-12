import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { DefaultButton, NormalTypography } from "../../../styles/styles";
import { useEffect, useState } from "react";
import { Database, get, onValue, ref, remove, set } from "firebase/database";
import { User } from "../../../interfaces/User";
import { shuffleArray } from "../../../helpers/array";

interface UserScreenProps {
  database: Database;
  roomId: string;
  user: User;
}

export const UserScreen = ({ database, roomId, user }: UserScreenProps) => {
  const [question, setQuestion] = useState<string>("");
  const [answer1, setAnswer1] = useState<string>("");
  const [answer2, setAnswer2] = useState<string>("");
  const [answer3, setAnswer3] = useState<string>("");
  const [answer4, setAnswer4] = useState<string>("");
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [sentAnswer, setSentAnswer] = useState<boolean>(false);

  const handleSendAnswer = () => {
    const userAnswerRef = ref(
      database,
      `answers/rooms/${roomId}/users/${user.id}`
    );
    remove(userAnswerRef);
    set(userAnswerRef, { selectedAnswer, userNickname: user.nickname });
    setSentAnswer(true);
  };

  useEffect(() => {
    const questionsRef = ref(database, `questions/rooms/${roomId}`);

    onValue(questionsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      setQuestion(data.question);
      const values = shuffleArray([
        data.correctAnswer,
        data.answer2,
        data.answer3,
        data.answer4,
      ]);
      setAnswer1(values[0]);
      setAnswer2(values[1]);
      setAnswer3(values[2]);
      setAnswer4(values[3]);
    });
  }, []);

  useEffect(() => {
    const correctAnswerRef = ref(database, `correctAnswer/rooms/${roomId}`);
    const userRef = ref(database, `rooms/${roomId}/users/${user.id}`);
    const userAnswerRef = ref(
      database,
      `answers/rooms/${roomId}/users/${user.id}`
    );

    onValue(correctAnswerRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      get(userAnswerRef).then((answerSnapshot) => {
        if (answerSnapshot.exists()) {
          const answerData = answerSnapshot.val();
          if (data.correctAnswer === answerData.selectedAnswer) {
            get(userRef).then((userSnapshot) => {
              if (userSnapshot.exists()) {
                const userData = userSnapshot.val();
                remove(userRef);
                set(userRef, { ...userData, points: userData.points + 1 });
              }
            });
          }
          remove(userAnswerRef);
          setQuestion("");
          setSentAnswer(false);
        }
      });
    });
  }, []);

  return (
    <>
      {question && (
        <>
          <NormalTypography>
            Selecione uma opção e aguarde o administrador
          </NormalTypography>
          <FormControl>
            <Typography fontSize="24px" fontWeight="500" textAlign="center">
              {question}
            </Typography>
            <RadioGroup
              name="radio-buttons-group"
              value={selectedAnswer}
              onChange={(e) => {
                setSelectedAnswer(e.target.value);
              }}
            >
              <FormControlLabel
                value={answer1}
                control={<Radio />}
                label={answer1}
              />
              <FormControlLabel
                value={answer2}
                control={<Radio />}
                label={answer2}
              />
              <FormControlLabel
                value={answer3}
                control={<Radio />}
                label={answer3}
              />
              <FormControlLabel
                value={answer4}
                control={<Radio />}
                label={answer4}
              />
            </RadioGroup>
            <DefaultButton variant="contained" onClick={handleSendAnswer}>
              Enviar resposta
            </DefaultButton>
            {sentAnswer && (
              <NormalTypography>Resposta enviada!</NormalTypography>
            )}
          </FormControl>
        </>
      )}
    </>
  );
};
