import { Box, styled } from "@mui/material";
import { COLORS } from "../../constants/colors";

export const RoomContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  border: `5px solid ${COLORS.greenBorder}`,
  padding: "20px",
  backgroundColor: COLORS.greenBackground,
  borderRadius: "5px",
  minHeight: "400px",
});

export const UsersAndQuestionContainer = styled(Box)({
  display: "flex",
  borderTop: `5px solid ${COLORS.greenBorder}`,
  height: "100%",
});

export const UsersContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  borderRight: `5px solid ${COLORS.greenBorder}`,
  padding: "10px",
});

export const QuestionContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "10px",
  width: "500px",
});

export const UserNicknameContainer = styled(Box)({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  maxWidth: "250px",
  wordBreak: "break-word",
});
