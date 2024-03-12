import { useEffect, useState } from "react";
import {
  DefaultButton,
  NormalTypography,
  WhiteTextField,
} from "../../../styles/styles";
import { AdminScreenContainer } from "./styles";
import { Database, onValue, ref, remove, set } from "firebase/database";
import { UserAnswer } from "../../../interfaces/UserAnswer";

interface AdminScreenProps {
  database: Database;
  roomId: string;
}

export const AdminScreen = ({ database, roomId }: AdminScreenProps) => {
  const [question, setQuestion] = useState<string>("");
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [answer2, setAnswer2] = useState<string>("");
  const [answer3, setAnswer3] = useState<string>("");
  const [answer4, setAnswer4] = useState<string>("");
  const [step, setStep] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

  const handleCreateQuestion = () => {
    if (!question || !correctAnswer || !answer2) return;

    const questionData = {
      question,
      correctAnswer,
      answer2,
      answer3,
      answer4,
    };

    const questionsRef = ref(database, `questions/rooms/${roomId}`);
    remove(questionsRef);
    set(questionsRef, questionData);
    setStep(1);
  };

  const validateQuestion = () => {
    const correctAnswerRef = ref(database, `correctAnswer/rooms/${roomId}`);
    remove(correctAnswerRef);
    set(correctAnswerRef, { correctAnswer });
    setStep(0);
  };

  useEffect(() => {
    const usersAnswers = ref(database, `answers/rooms/${roomId}/users`);

    onValue(usersAnswers, (snapshot) => {
      setUserAnswers([]);
      const data = snapshot.val();
      if (!data) return;
      setUserAnswers(Object.values(data));
    });
  }, []);

  return (
    <AdminScreenContainer>
      {step === 0 && (
        <>
          <NormalTypography>Pergunta:</NormalTypography>
          <WhiteTextField
            label="Pergunta"
            onChange={(e) => setQuestion(e.target.value)}
            size="small"
          />
          <NormalTypography>Resposta correta:</NormalTypography>
          <WhiteTextField
            label="Resposta correta"
            onChange={(e) => setCorrectAnswer(e.target.value)}
            size="small"
          />
          <NormalTypography>Resposta 2:</NormalTypography>
          <WhiteTextField
            label="Resposta 2"
            onChange={(e) => setAnswer2(e.target.value)}
            size="small"
          />
          <NormalTypography>Resposta 3:</NormalTypography>
          <WhiteTextField
            label="Resposta 3"
            onChange={(e) => setAnswer3(e.target.value)}
            size="small"
          />
          <NormalTypography>Resposta 4:</NormalTypography>
          <WhiteTextField
            label="Resposta 4"
            onChange={(e) => setAnswer4(e.target.value)}
            size="small"
          />
          <DefaultButton variant="contained" onClick={handleCreateQuestion}>
            Enviar
          </DefaultButton>
        </>
      )}
      {step === 1 && (
        <>
          <NormalTypography>
            Quando todos os usuários tiverem respondido, clique em validar
          </NormalTypography>
          {userAnswers.map((userAnswer, index) => (
            <NormalTypography key={`${userAnswer.userNickname}-${index}`}>
              {userAnswer.userNickname} escolheu "{userAnswer.selectedAnswer}"
            </NormalTypography>
          ))}
          <DefaultButton variant="contained" onClick={validateQuestion}>
            Validar
          </DefaultButton>
        </>
      )}
    </AdminScreenContainer>
  );
};
