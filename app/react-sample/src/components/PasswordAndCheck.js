import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';

const atLeastMinimumLength = (password) => new RegExp(/(?=.{8,})/).test(password);
const atLeastOneUppercaseLetter = (password) => new RegExp(/(?=.*?[A-Z])/).test(password);
const atLeastOneLowercaseLetter = (password) => new RegExp(/(?=.*?[a-z])/).test(password);
const atLeastOneNumber = (password) => new RegExp(/(?=.*?[0-9])/).test(password);
const atLeastOneSpecialChar = (password) => new RegExp(/(?=.*?[#?!@$ %^&*-])/).test(password);

const PasswordStrength = {  
  WEAK: '弱',
  MEDIUM: '中',
  STRONG: '強'
};

function testingpasswordStrength(password){
    if (!password) return PasswordStrength.WEAK;
    let points = 0;
    if (atLeastMinimumLength(password)) points += 1;
    if (atLeastOneUppercaseLetter(password)) points += 1;
    if (atLeastOneLowercaseLetter(password)) points += 1;
    if (atLeastOneNumber(password)) points += 1;
    if (atLeastOneSpecialChar(password)) points += 1;
    if (points >= 5) return PasswordStrength.STRONG;
    if (points >= 3) return PasswordStrength.MEDIUM;
    return PasswordStrength.WEAK;
}

function generateColors(strength) {
    let result = [];
    const COLORS = {
      NEUTRAL: 'hsla(0, 0%, 88%, 1)',
      WEAK : 'hsla(353, 100%, 38%, 1)',
      MEDIUM: 'hsla(40, 71%, 51%, 1)',
      STRONG : 'hsla(134, 73%, 30%, 1)'
    };
    switch (strength) {
      case PasswordStrength.WEAK:
      result = [COLORS.WEAK, COLORS.NEUTRAL, COLORS.NEUTRAL, COLORS.NEUTRAL];
      break;
      case PasswordStrength.MEDIUM:
      result = [COLORS .MEDIUM, COLORS.MEDIUM, COLORS.NEUTRAL, COLORS.NEUTRAL];
      break;
      case PasswordStrength.STRONG:
      result = [ COLORS .STRONG, COLORS.STRONG, COLORS.STRONG, COLORS.STRONG];
      break;
    }
    return result;
}
// TODO remove, this demo shouldn't need to reset the theme.

const { useState } = React;

export default function PasswordAndCheck({setPassword, setConfirmPassword}) {
  const { t, i18n } = useTranslation();

  const [pwd, setPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  const handlePasswordChange = (event) => {
    setPwd(event.target.value);
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPwd(event.target.value);
    setConfirmPassword(event.target.value);
  };

  return (
    <Box>
        <Grid item xs={12}>
            
        <TextField
            required
            fullWidth
            name="password"
            label={t('密碼')}
            type="password"
            id="password"
            autoComplete="new-password"
            value={pwd}
            onChange={handlePasswordChange}
        />
        <CheckPasswordStrength password={pwd}/>
        </Grid>
        <Grid item xs={12}>
        <TextField
            required
            fullWidth
            name="comfirmPassword"
            label={t('再次輸入密碼')}
            type="password"
            id="confirm-password"
            autoComplete="new-password"
            value={confirmPwd}
            onChange={handleConfirmPasswordChange}
            color={pwd === confirmPwd ? 'primary' : 'warning'}
        />
        {pwd === confirmPwd ? null : <Box><Typography variant="subtitle2" fontSize="14px" fontWeight={500} color="text.bodyLight"
    margin="6px 0 24px 0px">{t('請輸入相同的密碼')}</Typography></Box>}
        </Grid>
    </Box>
  );
}


function CheckPasswordStrength({password}){
  const { t, i18n } = useTranslation();

  const passwordStrength = testingpasswordStrength(password);
  const colors = generateColors(passwordStrength);

  return(
  <Box>
      <Box display="flex" alignItems="center" justifyContent="center" gap="5px" margin="10px 0">
      {colors.map((color, index) => (
        <Box key={index} flex={1} height="5px" borderRadius="5px" bgcolor={color}></Box>
      ))}
      </Box>
      <Box display="flex" alignItems="center" justifyContent="flex-start" gap="5px" margin="0 0 15px">
        <Typography color={colors[0]}>{t(passwordStrength)}</Typography>
        </Box>
        {passwordStrength !== PasswordStrength.STRONG && (
          <Typography variant="subtitle2" fontSize="14px" fontWeight={500} color="text.bodyLight"
          margin="0 0 24px 0px">
            {t('密碼需包含至少 8 個字元，包含至少一個大寫字母、小寫字母、數字、特殊字元')}
          </Typography>)
        }
  </Box>
  

      );
    }