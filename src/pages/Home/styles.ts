import { Box, styled } from "@mui/material";
import { COLORS } from "../../constants/colors";

export const HomeContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "20px",
  border: `5px solid ${COLORS.greenBorder}`,
  borderRadius: "5px",
  backgroundColor: COLORS.greenBackground,
});

export const ButtonsContainer = styled(Box)({
  display: "flex",
  gap: "10px",
});
