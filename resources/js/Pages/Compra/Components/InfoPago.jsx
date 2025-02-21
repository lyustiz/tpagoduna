import * as React from "react";
import {
  Avatar,
  ListItem,
  ListItemText,
  ListItemIcon,
  Grid2,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import CopyToClipboardButton from "@/Components/CopyToClipboardButton";

export default function InfoPago() {
  return (
    <>
      <Card sx={{ maxWidth: 275 }}>
        <CardHeader
          title="Pago Movil Venezuela (0102)"
          avatar={
            <Avatar>
              <AccountBalanceRoundedIcon />
            </Avatar>
          }
        ></CardHeader>
        <CardContent>
          <Grid2 container>
            <Grid2 size={12}>
              <ListItem
                secondaryAction={
                  <CopyToClipboardButton textToCopy="04129396107" />
                }
              >
                <ListItemIcon>
                  <PhoneAndroidIcon />
                </ListItemIcon>
                <ListItemText primary="04129396107" secondary="telefono" />
              </ListItem>
            </Grid2>
            <Grid2 size={12}>
              <ListItem
                secondaryAction={
                  <CopyToClipboardButton textToCopy="21415453" />
                }
              >
                <ListItemIcon>
                  <BadgeRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="21415453" secondary="cedula" />
              </ListItem>
            </Grid2>
            <Grid2 size={12}>
              <ListItem
                secondaryAction={
                  <CopyToClipboardButton textToCopy="Mauricio Tellez" />
                }
              >
                <ListItemIcon>
                  <PersonOutlineRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Mauricio Tellez" secondary="titular" />
              </ListItem>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    </>
  );
}
