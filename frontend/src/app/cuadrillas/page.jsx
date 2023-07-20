import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Navbar from "@/components/Navbar";

export default function Page() {
    return (
        <>
        <Navbar />
        <div>
            <Typography variant="h1">Hello, Cuadrillas page!</Typography>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Card>
                <CardHeader title="Registrar Cuadrilla" />
                <CardContent>
                    <Typography variant="body1">
                    Aquí puedes registrar una nueva cuadrilla.
                    </Typography>
                    <Button variant="contained" color="primary">
                    Registrar Nueva Cuadrilla
                    </Button>
                </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card>
                <CardHeader title="Ver Cuadrillas" />
                <CardContent>
                    <Typography variant="body1">
                    Aquí puedes ver las cuadrillas registradas.
                    </Typography>
                    <Button variant="contained" color="secondary">
                    Ver Cuadrillas
                    </Button>
                </CardContent>
                </Card>
            </Grid>
            </Grid>
        </div>
        </>
    );
}

