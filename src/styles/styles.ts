import { Button, TextField, Typography, styled } from "@mui/material";
import { COLORS } from "../constants/colors";

export const TitleTypography = styled(Typography)({
  fontSize: "32px",
  fontWeight: "800",
  color: COLORS.greenBorder,
});

export const NormalTypography = styled(Typography)({
  fontSize: "22px",
});

export const WhiteTextField = styled(TextField)({
  backgroundColor: "white",
});

export const DefaultButton = styled(Button)({
  backgroundColor: COLORS.greenBorder,
});
