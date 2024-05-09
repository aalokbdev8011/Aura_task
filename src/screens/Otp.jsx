import React, {useRef} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Rapidlogo from '../assets/Rapidlogo.png';
import {OtpInput} from 'react-native-otp-entry';
import Checkboxes from '../assets/Checkboxes.png';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {addOtpValue, showSuccessMsg, showErrorMsg} from '../store/otp-slice';
import {
  otpHeading,
  otpSecondaryText,
  otpSub,
  errorMessage,
  successMessage,
  resend,
} from '../config';

const Otp = ({route}) => {
  const {countryCode} = route.params;
  const navigation = useNavigation();
  const otpInputRef = useRef(null);

  const disptach = useDispatch();
  const otpValue = useSelector(state => state.otp.otpValue);
  const successMsg = useSelector(state => state.otp.successMsg);
  const errorMsg = useSelector(state => state.otp.errorMsg);

  const handleOtpChange = text => {
    disptach(addOtpValue(text));
    disptach(showSuccessMsg(false));
    disptach(showErrorMsg(false));
  };

  const handleResendOtp = () => {
    disptach(showSuccessMsg(false));
    disptach(showErrorMsg(false));
    disptach(addOtpValue(''));
    if (otpInputRef.current) {
      otpInputRef.current.clear();
    }
  };

  const handleBack = () => {
    disptach(showSuccessMsg(false));
    disptach(showErrorMsg(false));
    navigation.goBack();
  };

  const handleOtpSubmit = async () => {
    if (otpValue.length < 6) {
      return;
    }
    try {
      const response = await axios.post(
        'https://43qnpd4vyhy42yyubka7a3jbum0ydmrk.lambda-url.eu-central-1.on.aws/',
        {otp: otpValue},
      );
      const otpResponse = response.data;
      if (otpResponse) {
        disptach(showSuccessMsg(true));
      }
    } catch {
      disptach(showErrorMsg(true));
    }
  };

  const getPinCodeContainerStyle = (errorMsg, successMsg) => {
    if (errorMsg) {
      return styles.filledPinCodeContainerStyleError;
    } else if (successMsg) {
      return styles.filledPinCodeContainerStyleSuccess;
    } else {
      return styles.filledPinCodeContainerStyle;
    }
  };

  return (
    <View style={styles.container}>
      <Image source={Rapidlogo} style={styles.logo}></Image>
      <View style={styles.txtcontainer}>
        <Text style={styles.mainHeading}>{otpHeading}</Text>
        <Text style={styles.secondaryTxt}>
          {otpSecondaryText}
          <Text style={styles.numberStyle}>{countryCode}</Text>
          {otpSub}
        </Text>
      </View>
      <View style={styles.txtcontainer}>
        <OtpInput
          numberOfDigits={6}
          onTextChange={text => handleOtpChange(text)}
          ref={otpInputRef}
          theme={{
            filledPinCodeContainerStyle: getPinCodeContainerStyle(
              errorMsg,
              successMsg,
            ),
          }}
        />
      </View>
      {successMsg && (
        <View style={styles.confirmContainer}>
          <Image source={Checkboxes} style={styles.confirmStyle}></Image>
          <Text style={styles.confirmTxt}>{successMessage}</Text>
        </View>
      )}
      {errorMsg && (
        <View style={{marginTop: 40}}>
          <Text style={styles.incorectPin}>{errorMessage}</Text>
        </View>
      )}
      <View style={styles.txtcontainer}>
        <TouchableOpacity style={{marginTop: 50}} onPress={handleResendOtp}>
          <Text style={styles.resendTxt}>{resend}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={otpValue.length !== 6}
          style={[
            styles.btnContainer,
            {
              backgroundColor: otpValue.length === 6 ? '#4C6078' : '#F6F6F6',
            },
          ]}
          onPress={handleOtpSubmit}>
          <Text
            style={[
              styles.btnText,
              {color: otpValue.length === 6 ? '#ffffff' : '#B0B0B0'},
            ]}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={handleBack}>
          <Text style={styles.backTxt}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Otp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 24,
  },
  logo: {
    width: 44,
    height: 44,
    marginTop: 20,
    borderRadius: 10,
  },
  confirmStyle: {
    width: 20,
    height: 20,
  },
  txtcontainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  confirmContainer: {
    alignItems: 'center',
    marginTop: 40,
    display: 'flex',
    flexDirection: 'row',
  },
  confirmTxt: {
    color: '#37CCA0',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 7,
  },
  mainHeading: {
    fontFamily: 'Work Sans',
    fontSize: 24,
    lineHeight: 28.15,
    alignItems: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  secondaryTxt: {
    fontFamily: 'Work Sans',
    fontSize: 16,
    lineHeight: 20,
    alignItems: 'center',
    textAlign: 'center',
    color: '#2E2E2E',
    marginTop: 10,
    paddingHorizontal: 24,
  },
  btnContainer: {
    width: 360,
    height: 48,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#4C6078',
    alignItems: 'center',
    borderColor: '#4C6078',
    marginTop: 24,
  },
  btnText: {
    fontFamily: 'Work Sans',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
    textAlign: 'left',
    color: '#ffffff',
  },
  resendTxt: {
    color: '#4C6078',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  backTxt: {
    fontSize: 16,
    color: '#4C6078',
    fontFamily: 'Work Sans',
    fontWeight: 'bold',
  },
  numberStyle: {
    fontWeight: 'bold',
  },
  incorectPin: {
    color: '#F04438',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Work Sans',
  },
  filledPinCodeContainerStyle: {
    backgroundColor: '#FFF',
    borderColor: '#333',
  },
  filledPinCodeContainerStyleError: {
    backgroundColor: '#FFFBFA',
    borderColor: '#FF6E6E',
  },
  filledPinCodeContainerStyleSuccess: {
    backgroundColor: '#EDFDF8',
    borderColor: '#37CCA0',
  },
});
