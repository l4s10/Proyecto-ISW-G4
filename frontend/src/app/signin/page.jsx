import { Form } from './Form';
import Typography from "@mui/material/Typography";
import { colors } from "@/utils/colors";
import Navbar from '@/components/Navbar';

const Signin = () => {
  return (
    <>
    <div>
      <Navbar></Navbar>
    </div>
    <div style={{ 
      backgroundColor: colors.primaryBlack, 
      color: colors.white, 
      padding: '20px 0', 
      minHeight: '100vh', // Añadido aquí
      display: 'flex', // Añadido para permitir el alineamiento vertical
      flexDirection: 'column', // Añadido para permitir el alineamiento vertical
      justifyContent: 'space-between' // Añadido para empujar el footer al fondo
    }}>
      <Form />
      <footer style={{ marginTop: '20px', textAlign: 'center', backgroundColor: colors.primaryBlack, color: colors.white }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} Brigadistas Unidos
        </Typography>
      </footer>
    </div>
    </>
  );
};

export default Signin;
