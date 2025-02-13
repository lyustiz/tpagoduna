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
          title="Pago Movil Banesco"
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
                  <CopyToClipboardButton textToCopy="0412998862" />
                }
              >
                <ListItemIcon>
                  <PhoneAndroidIcon />
                </ListItemIcon>
                <ListItemText primary="0412998862" secondary="telefono" />
              </ListItem>
            </Grid2>
            <Grid2 size={12}>
              <ListItem
                secondaryAction={
                  <CopyToClipboardButton textToCopy="13479149" />
                }
              >
                <ListItemIcon>
                  <BadgeRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="13479149" secondary="cedula" />
              </ListItem>
            </Grid2>
            <Grid2 size={12}>
              <ListItem
                secondaryAction={
                  <CopyToClipboardButton textToCopy="Luis Yustiz" />
                }
              >
                <ListItemIcon>
                  <PersonOutlineRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Luis Yustiz" secondary="titular" />
              </ListItem>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    </>
  );
}
