import React from "react";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

export default function Navbar() {
    return (
        <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Brigadistas Unidos
            </Typography>
            <Button component={Link} href="/" color="inherit">
            Inicio
            </Button>
            <Button component={Link} href="/cuadrillas" color="inherit">
            Cuadrillas
            </Button>
            <Button component={Link} href="/asistencias" color="inherit">
            Asistencias
            </Button>
            <Button component={Link} href="/reportes" color="inherit">
            Reportes
            </Button>
        </Toolbar>
        </AppBar>
    );
}

