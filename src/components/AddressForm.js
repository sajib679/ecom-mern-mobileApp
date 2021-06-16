import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Button, TextInput, RadioButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../store/actions";

/**
 * @author
 * @function AddressForm
 **/

const AddressForm = (props) => {
  const { initialData } = props;
  const [name, setName] = useState(initialData ? initialData.name : "");
  const [mobileNumber, setMobileNumber] = useState(
    initialData ? initialData.mobileNumber : ""
  );
  const [pinCode, setPinCode] = useState(
    initialData ? initialData.pinCode : ""
  );
  const [locality, setLocality] = useState(
    initialData ? initialData.locality : ""
  );
  const [address, setAddress] = useState(
    initialData ? initialData.address : ""
  );
  const [cityDistrictTown, setCityDistrictTown] = useState(
    initialData ? initialData.cityDistrictTown : ""
  );
  const [state, setState] = useState(initialData ? initialData.state : "");
  const [landmark, setLandmark] = useState(
    initialData ? initialData.landmark : ""
  );
  const [alternatePhone, setAlternatePhone] = useState(
    initialData ? initialData.alternatePhone : ""
  );
  const [addressType, setAddressType] = useState(
    initialData ? initialData.addressType : ""
  );

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [submitFlag, setSubmitFlag] = useState(false);
  const [id, setId] = useState(initialData ? initialData._id : "");

  const onAddressSubmit = (e) => {
    const payload = {
      address: {
        name,
        mobileNumber,
        pinCode,
        locality,
        address,
        cityDistrictTown,
        state,
        landmark,
        alternatePhone,
        addressType,
      },
    };
    console.log(payload);
    if (id) {
      payload.address._id = id;
    }
    dispatch(addAddress(payload));
    setSubmitFlag(true);
  };

  useEffect(() => {
    console.log("addressCount", user.address);
    if (submitFlag) {
      console.log("where are we", user);
      let _address = {};
      if (id) {
        _address = {
          _id: id,
          name,
          mobileNumber,
          pinCode,
          locality,
          address,
          cityDistrictTown,
          state,
          landmark,
          alternatePhone,
          addressType,
        };
      } else {
        _address = user.address.slice(user.address.length - 1)[0];
      }

      props.onSubmitForm(_address);
    }
  }, [user.address]);

  const renderAddressForm = () => {
    return (
      <>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              underlineColor="transparent"
              selectionColor="blue"
              style={styles.textInput}
              label="Name"
              value={name}
              onChangeText={(e) => setName(e)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              underlineColor="transparent"
              style={styles.textInput}
              label="10-digit mobile number"
              value={mobileNumber}
              onChangeText={(e) => {
                setMobileNumber(e);
                console.log(mobileNumber);
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              underlineColor="transparent"
              style={styles.textInput}
              label="Pincode"
              value={pinCode}
              onChangeText={(e) => setPinCode(e)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              underlineColor="transparent"
              style={styles.textInput}
              label="Locality"
              value={locality}
              onChangeText={(e) => setLocality(e)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              underlineColor="transparent"
              style={styles.textInput}
              label="Address"
              value={address}
              onChangeText={(e) => setAddress(e)}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              underlineColor="transparent"
              style={styles.textInput}
              label="City/District/Town"
              value={cityDistrictTown}
              onChangeText={(e) => setCityDistrictTown(e)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              underlineColor="transparent"
              style={styles.textInput}
              label="State"
              value={state}
              onChangeText={(e) => setState(e)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              underlineColor="transparent"
              style={styles.textInput}
              label="Landmark (Optional)"
              value={landmark}
              onChangeText={(e) => setLandmark(e)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              underlineColor="transparent"
              style={styles.textInput}
              label="Alternate Phone (Optional)"
              value={alternatePhone}
              onChangeText={(e) => setAlternatePhone(e)}
            />
          </View>
          <View style={styles.container}>
            <Text>Address Type</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                paddingBottom: 5,
              }}
            >
              <View>
                <RadioButton
                  onPress={() => setAddressType("home")}
                  status={addressType === "home" ? "checked" : "unchecked"}
                  name="addressType"
                  value="home"
                />
                <Text>Home</Text>
              </View>
              <View>
                <RadioButton
                  onPress={() => setAddressType("work")}
                  status={addressType === "work" ? "checked" : "unchecked"}
                  name="addressType"
                  value="work"
                />
                <Text>Work</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{}}>
          <Button
            color="#FAF9F6"
            onPress={(e) => onAddressSubmit(e)}
            mode="contained"
          >
            <Text>SAVE AND DELIVER HERE</Text>
          </Button>
        </View>
      </>
    );
  };

  if (props.withoutLayout) {
    return <View style={{ width: "100%" }}>{renderAddressForm()}</View>;
  }

  return (
    <View style={(styles.flexRow, { backgroundColor: "white" })}>
      <View style={styles.checkoutHeader}>
        <TouchableWithoutFeedback onPress={props.onCancel}>
          <View style={styles.flexRow}>
            <Text style={styles.checkoutStep}>+</Text>
            <Text style={styles.stepTitle}>ADD NEW ADDRESS</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={{ width: "100%" }}>{renderAddressForm()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    marginHorizontal: 5,
  },
  inputContainer: {
    width: "100%",
    paddingBottom: 1,
  },
  flexRow: {
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  textInput: {
    backgroundColor: "#FAF9F6",
  },
  container: { padding: 10 },
});

export default AddressForm;
