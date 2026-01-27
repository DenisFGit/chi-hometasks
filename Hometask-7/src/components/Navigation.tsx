import React from "react";
import { useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";

import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
    Divider,
    Button,
    Box
} from "@mui/material";

const drawerWidth = 240;

const Navigation = () => {
    const navigate = useNavigate();
    const { isDark, toggleTheme } = useTheme();

    const menuItems = [
        { text: "Home", path: "/" },
        { text: "About", path: "/about" },
        { text: "Heroes", path: "/heroes" },
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    backgroundColor: isDark ? "black" : "#A1C0C2",
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    pt: 2,
                    pb: 2,
                },
            }}
        >
            <Typography variant="h6" sx={{ mb: 2, textAlign: "center", width: "100%" }}>
                Menu
            </Typography>

            <List sx={{ width: "100%" }}>
                {menuItems.map((item, index) => (
                    <React.Fragment key={item.text}>
                        <ListItem disablePadding sx={{ textAlign: "center" }}>
                            <ListItemButton
                                onClick={() => navigate(item.path)}
                                sx={{
                                    textAlign: "center",
                                    borderTop: '1px solid white',
                                    px: 3,
                                    "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                                }}
                            >
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>

                        {index < menuItems.length - 1 && (
                            <Divider sx={{ borderColor: "white" }} />
                        )}
                    </React.Fragment>
                ))}
            </List>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={toggleTheme}
                >
                    {"Switch theme"}
                </Button>
            </Box>

        </Drawer>
    );
};

export default Navigation;