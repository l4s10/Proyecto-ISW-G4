import React from "react";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { colors } from '../utils/colors';

    export default function Navbar() {
    return (
        <AppBar position="static" style={{ backgroundColor: colors.secondaryBlack }}>
        <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, color: colors.white }}>
            Brigadistas Unidos
            </Typography>
            <Button component={Link} href="/" color="inherit" style={{ color: colors.white }}>
            Inicio
            </Button>
            <Button component={Link} href="/cuadrillas" color="inherit" style={{ color: colors.white }}>
            Cuadrillas
            </Button>
            <Button component={Link} href="/asistencias" color="inherit" style={{ color: colors.white }}>
            Asistencias
            </Button>
            <Button component={Link} href="/reportes" color="inherit" style={{ color: colors.white }}>
            Reportes
            </Button>
        </Toolbar>
        </AppBar>
    );
    }
