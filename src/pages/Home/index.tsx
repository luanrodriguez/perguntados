import { useState } from "react";
import { ButtonsContainer, HomeContainer } from "./styles";
import { Button } from "@mui/material";
import {
  DefaultButton,
  TitleTypography,
  WhiteTextField,
} from "../../styles/styles";

interface HomeProps {
  handleAccessRoom: (nickname: string, passedRoomId: string) => void;
  handleCreateRoom: (nickname: string) => void;
}

export const Home = ({ handleAccessRoom, handleCreateRoom }: HomeProps) => {
  const [nickname, setNickname] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");

  return (
    <HomeContainer>
      <TitleTypography>Perguntados</TitleTypography>

      <WhiteTextField
        label="Digite um apelido"
        onChange={(event) => setNickname(event.target.value)}
        size="small"
      />
      <WhiteTextField
        label="Digite o id da sala"
        onChange={(event) => setRoomId(event.target.value)}
        size="small"
      />
      <ButtonsContainer>
        <DefaultButton
          variant="contained"
          onClick={() => handleAccessRoom(nickname, roomId)}
        >
          Acessar sala
        </DefaultButton>
        <DefaultButton
          variant="contained"
          onClick={() => handleCreateRoom(nickname)}
        >
          Criar uma sala
        </DefaultButton>
      </ButtonsContainer>
    </HomeContainer>
  );
};
