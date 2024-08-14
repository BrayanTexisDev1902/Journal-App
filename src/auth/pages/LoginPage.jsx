import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { startGoogleSingIn, startLoginWithEmailPassword } from "../../store/auth";
import { useMemo, useState } from "react";

const formData = {
  email: "",
  password: "",
};

const formValidations = {
  email: [(value) => value.includes("@"), "El email debe de tener una @."],
  password: [(value) => value.length >= 6, "El password debe de tener mas de 6 caracteres."],
};

export const LoginPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const dispatch = useDispatch();
  
  const { email, password, onInputChange, isFormValid, emailValid, passwordValid } = useForm(
    formData,
    formValidations
  );

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;
    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  const onGoogleSignIn = () => {
    console.log("onGoogleSingIn");
    dispatch(startGoogleSingIn());
  };

  return (
    <AuthLayout title="Inicio de sesión">
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="correo"
              type="email"
              placeholder="correo@gmail.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="contraseña"
              type="password"
              placeholder="contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
            <Alert severity="error">{errorMessage}</Alert>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button type="submit" variant="contained" disabled={isAuthenticating} fullWidth>
              Iniciar Sesión
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              startIcon={<Google />}
              disabled={isAuthenticating}
              fullWidth
              onClick={onGoogleSignIn}
            >
              <Typography>Google</Typography>
            </Button>
          </Grid>
        </Grid>

        <Grid container direction="row" justifyContent="end">
          <Link
            component={RouterLink}
            color="inherit"
            sx={{ cursor: "pointer" }}
            to="/auth/register"
          >
            Crear una cuenta
          </Link>
        </Grid>
      </form>
    </AuthLayout>
  );
};
