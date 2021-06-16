import React, { useState, useRef } from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import AddressForm from "../../components/AddressForm";
import { RadioButton, Button } from "react-native-paper";
import Card from "../../components/Card";
const Address = ({
  index,
  adr,
  selectAddress,
  enableAddressEditForm,
  confirmDeliveryAddress,
  onAddressSubmit,
  setNewAddress,
}) => {
  const [checked, setChecked] = useState(false);
  const buttonRef = useRef();
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
        }}
      >
        <RadioButton
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            selectAddress(adr);
            setNewAddress(false);
            setChecked(!checked);
          }}
        />
        <Text style={styles.addressType}>{adr.addressType}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.addressContainer]}>
          {!adr.edit ? (
            <Card>
              <View style={{ marginBottom: 6 }}>
                <View style={styles.addressDetail}></View>
                <Text>{adr.name}</Text>
                <Text>{adr.mobileNumber}</Text>
                <Text>
                  {adr.address}
                  {`${adr.state} - ${adr.pinCode} , ${adr.cityDistrictTown}`}
                </Text>
              </View>
              {adr.selected && (
                <View style={styles.buttonContainer}>
                  <Button
                    color="black"
                    mode="outlined"
                    onPress={() => enableAddressEditForm(adr)}
                  >
                    <Text>Edit</Text>
                  </Button>

                  <Button
                    color="#2874f0"
                    mode="outlined"
                    onPress={() => confirmDeliveryAddress(adr)}
                  >
                    <Text>Deliver Here</Text>
                  </Button>
                </View>
              )}
            </Card>
          ) : (
            <AddressForm
              withoutLayout={true}
              onSubmitForm={onAddressSubmit}
              initialData={adr}
              onCancel={() => {}}
            />
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default Address;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    padding: 0,
    justifyContent: "space-between",
  },

  addressDetail: {
    paddingBottom: 2,
    fontWeight: "600",
    fontSize: 12,
  },

  loggedInId: {
    fontSize: 12,
    marginTop: 5,
  },

  addressContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
    backgroundColor: "#f5faff",
    flex: 1,
    marginBottom: 10,
  },

  addressType: {
    textTransform: "capitalize",
  },
  stepCompleted: {
    padding: 6,
    fontSize: 12,
  },
});
