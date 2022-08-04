import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Container, Box, Typography, TextField, rgbToHex, } from '@mui/material';
import './SignIn.css';
import { signIn } from '../../../app/store/user/UserSlice';
import { login } from '../../../api/AuthAPI'
import { useNavigate } from 'react-router-dom';
import { setHeaderAuthorizationToken, TOKEN_KEY } from '../../../api/APIUtils';
import { setLocalStorage } from '../../../utils/LocalStorage';

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const [messageSignInFailed, setMessageSignInFailed] = useState('');
    const [isEmailInputError, setIsEmailInputError] = useState(false);
    const [isPasswordInputError, setIsPasswordInputError] = useState(false);

    const onSignInClick = () => {
        const email = emailInputRef.current!.value;
        const password = passwordInputRef.current!.value;
        login(email, password)
            .then(function (res) {
                const data = res.data;

                setIsEmailInputError(false);
                setIsPasswordInputError(false);
                setMessageSignInFailed('');

                setLocalStorage(TOKEN_KEY, data.accessToken);
                setHeaderAuthorizationToken(data.accessToken);
                dispatch(signIn(data));

                navigate('/loggedIn');
            })
            .catch(function (error) {
                setIsEmailInputError(true);
                setIsPasswordInputError(true);
                setMessageSignInFailed('Sorry, the email addess and / or password you entered is incorrect. Please check and try again.');
            });

    }

    return (
        <Container>
            <Box
                sx={{
                    marginTop: '25%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h4" className="signIn-title">
                    Sign in
                </Typography>
                <Box sx={{ mt: 1 }} className="signIn-form">
                    <Typography className='message-signIn-failed'>
                        {messageSignInFailed}
                    </Typography>
                    <Typography sx={{ color: '#5c5c5c' }}>
                        Email address
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        size='small'
                        id="email"
                        name="email"
                        autoComplete="email"
                        placeholder='Enter your email address'
                        autoFocus
                        inputRef={emailInputRef}
                        error={isEmailInputError}
                        sx={{ mt: 1 }}
                    />
                    <Typography sx={{ color: '#5c5c5c' }}>
                        Password
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        size='small'
                        name="password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        placeholder='Enter your password'
                        inputRef={passwordInputRef}
                        error={isPasswordInputError}
                        sx={{ mt: 1 }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className="signIn-button"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => onSignInClick()}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default SignIn;