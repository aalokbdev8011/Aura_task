import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Rapidlogo from '../assets/Rapidlogo.png';
import PhoneInput from 'react-native-phone-number-input';
import CountryPicker from 'react-native-country-picker-modal';
import Input from '../assets/Input.png';
import {
  addPhoneNumber,
  addFormattedValue,
  addCountryCode,
  addtoggleCheckBox,
  addphoneValidation,
  addcheckBoxValidation,
} from '../store/LoginSlice';
import {useDispatch, useSelector} from 'react-redux';
import {
  checkBoxerror,
  errorText,
  headingText,
  secondaryText,
  subText,
  terms,
  termsText,
} from '../config';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const phoneNumber = useSelector(state => state.login.value);
  const countryCode = useSelector(state => state.login.countryCode);
  const formattedValue = useSelector(state => state.login.formattedValue);
  const withCountryNameButton = useSelector(
    state => state.login.withCountryNameButton,
  );
  const toggleCheckBox = useSelector(state => state.login.toggleCheckBox);
  const isValidNumber = useSelector(state => state.login.isValidNumber);
  const isCheckBox = useSelector(state => state.login.isCheckBox);

  const handleInputSubmit = () => {
    const isPhoneNumberValid = !isNaN(phoneNumber) && phoneNumber.length === 10;

    if (isPhoneNumberValid && toggleCheckBox) {
      navigation.navigate('Otp', {
        countryCode: formattedValue,
      });
      dispatch(addphoneValidation(true));
      dispatch(addcheckBoxValidation(true));
    } else {
      dispatch(addphoneValidation(isPhoneNumberValid));
      dispatch(addcheckBoxValidation(toggleCheckBox));
    }
  };
  return (
    <View style={styles.container}>
      <Image source={Rapidlogo} style={styles.logo}></Image>
      <View style={styles.txtcontainer}>
        <Text style={styles.mainHeading}>{headingText}</Text>
        <Text style={styles.secondaryTxt}>{subText}</Text>
        <Text style={styles.secondaryTxt}>{secondaryText}</Text>
      </View>
      <View>
        <View style={styles.wrapper}>
          <PhoneInput
            defaultValue={phoneNumber}
            layout="second"
            onChangeText={text => {
              dispatch(addPhoneNumber(text));
            }}
            onChangeFormattedText={text => {
              dispatch(addFormattedValue(text));
            }}
            onChangeCountry={text => {
              dispatch(addCountryCode(text.cca2));
            }}
            withDarkTheme
            containerStyle={styles.phoneStyle}
            textContainerStyle={styles.txtStyle}
            textInputStyle={{padding: 0, fontSize: 16}}
            codeTextStyle={styles.codeTextStyle}
            maxLength={10}
          />
          <View style={styles.countryPickerContainer}>
            <CountryPicker
              {...{
                countryCode,
                withCountryNameButton,
              }}
              disableNativeModal
            />
          </View>
        </View>
        {!isValidNumber && <Text style={styles.errorText}>{errorText}</Text>}
      </View>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          onPress={() => {
            dispatch(addtoggleCheckBox(!toggleCheckBox)),
              dispatch(addcheckBoxValidation(!isCheckBox));
          }}>
          <View style={styles.checkboximg}>
            {toggleCheckBox && (
              <Image source={Input} style={styles.checkimg}></Image>
            )}
          </View>
        </TouchableOpacity>
        <Text style={styles.checkboxtext}>
          {termsText}
          <Text style={styles.terms}>{terms}</Text>
        </Text>
      </View>
      {!isCheckBox && (
        <View>
          <Text style={styles.errorText}>{checkBoxerror}</Text>
        </View>
      )}
      <View>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={handleInputSubmit}>
          <Text style={styles.btnText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 24,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  logo: {
    width: 44,
    height: 44,
    marginTop: 20,
    borderRadius: 10,
  },
  txtcontainer: {
    marginTop: 40,
    alignItems: 'center',
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
  phoneStyle: {
    width: 210,
    borderWidth: 1,
    borderColor: '#98A4AF',
    borderRadius: 10,
    marginTop: 44,
    backgroundColor: '#ffffff',
  },
  txtStyle: {
    borderColor: '#98A4AF',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    marginLeft: -25,
  },
  checkboxContainer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  checkboxtext: {
    marginTop: 5,
    fontFamily: 'Work Sans',
    fontSize: 14,
    color: '#2E2E2E',
  },
  terms: {
    textDecorationLine: 'underline',
    color: '#4C6078',
    fontWeight: 'bold',
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
    marginTop: 50,
    borderColor: '#4C6078',
  },
  btnText: {
    fontFamily: 'Work Sans',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
    textAlign: 'left',
    color: '#ffffff',
  },
  errorText: {
    color: 'red',
    fontSize: 15,
    marginTop: 5,
    marginLeft: 10,
  },
  countryPickerContainer: {
    marginTop: 45,
    marginLeft: 15,
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#98A4AF',
  },
  checkboximg: {
    borderWidth: 1,
    width: 17,
    height: 17,
    borderRadius: 50,
    marginTop: 7,
    marginRight: 10,
  },
  checkimg: {
    position: 'absolute',
    bottom: 0,
    top: -17,
    right: -16,
  },
  codeTextStyle: {
    fontSize: 16,
    color: '#4C6078',
    marginLeft: -20,
  },
});
