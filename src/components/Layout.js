import { Avatar, makeStyles } from "@material-ui/core";
import React from "react";
import {
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import { AddBoxRounded, SubjectOutlined } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router-dom";
import { format } from "date-fns";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
    },
    appbar: {
      width: `calc(100% - ${drawerWidth}px) `,
      background: "#FFFFFF",
    },
    appbarDate: {
      fontWeight: 700,
      flexGrow: "1",
    },
    appbarUser: {
      fontWeight: 700,
    },
    toolbar: theme.mixins.toolbar,
    page: {
      background: "#f9f9f9",
      width: "100%",
      padding: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
    },
    drawerTitle: {
      padding: theme.spacing(2),
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerActiveTab: {
      background: "#f4f4f4",
    },
    avatar: {
      marginLeft: theme.spacing(2),
    },
  };
});

export default function Layout({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    {
      text: "My Notes",
      icon: <SubjectOutlined color="secondary" />,
      path: "/",
    },
    {
      text: "Create Note",
      icon: <AddBoxRounded color="secondary" />,
      path: "/create",
    },
  ];

  //TODO: Make drawer responsive for small window sizes

  return (
    <div className={classes.root}>
      {/* App Bar */}
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar>
          <Typography className={classes.appbarDate} color="textSecondary">
            Today is {format(new Date(), "do MMMM Y")}
          </Typography>
          <Typography className={classes.appbarUser} color="textSecondary">
            User
          </Typography>
          <Avatar src="/user.png" className={classes.avatar} />
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography variant="h5" className={classes.drawerTitle}>
            Ultra Pro Notes
          </Typography>
        </div>

        {/* List Items */}

        <List>
          {menuItems.map((item) => {
            return (
              <ListItem
                key={item.text}
                button
                onClick={() => {
                  history.push(item.path);
                }}
                className={
                  location.pathname == item.path
                    ? classes.drawerActiveTab
                    : null
                }
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}
