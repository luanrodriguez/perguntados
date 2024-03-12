import { Database, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { User } from "../../interfaces/User";
import {
  QuestionContainer,
  RoomContainer,
  UserNicknameContainer,
  UsersAndQuestionContainer,
  UsersContainer,
} from "./styles";
import { NormalTypography } from "../../styles/styles";
import { Fort } from "@mui/icons-material";
import { UserScreen } from "./UserScreen";
import { AdminScreen } from "./AdminScreen";

interface RoomProps {
  database: Database;
  user: User;
  roomId: string;
}

export const Room = ({ database, user, roomId }: RoomProps) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const usersRef = ref(database, `rooms/${roomId}/users`);
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      setUsers(Object.values(data));
    });
  }, []);

  return (
    <RoomContainer>
      <NormalTypography>Sala: {roomId}</NormalTypography>
      {user.admin && (
        <NormalTypography>Você é administrador da sala</NormalTypography>
      )}
      <UsersAndQuestionContainer>
        <UsersContainer>
          {users.map((user) => (
            <UserNicknameContainer key={user.id}>
              <NormalTypography>{user.nickname}</NormalTypography>
              {user.admin ? (
                <Fort color="info" />
              ) : (
                <NormalTypography>{user.points}</NormalTypography>
              )}
            </UserNicknameContainer>
          ))}
        </UsersContainer>
        <QuestionContainer>
          {!user.admin && (
            <UserScreen database={database} roomId={roomId} user={user} />
          )}

          {user.admin && <AdminScreen database={database} roomId={roomId} />}
        </QuestionContainer>
      </UsersAndQuestionContainer>
    </RoomContainer>
  );
};
