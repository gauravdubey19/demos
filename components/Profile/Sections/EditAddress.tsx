import React, { useState,useEffect } from "react";
import { InputField } from "../ProfileComponents/InputFields";
import { Dropdown } from "../ProfileComponents/DropDown";
import { Button } from "@/components/ui/button";
import { State, City } from 'country-state-city';
import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { Address, useGlobalContext } from "@/context/GlobalProvider";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";

const EditAddress = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const {setAddresses,editAddressData,setEditAddressData} = useGlobalContext();
    const [saving, setSaving] = useState(false);
  const [states, setStates] = useState<{ name: string; code: string }[]>([]);
  const [cities, setCities] = useState<{ name: string; code: string }[]>([]);
useEffect(() => {
    console.log('editAddressData',editAddressData);
}, [editAddressData]);
  useEffect(() => {
    const indianStates = State.getStatesOfCountry("IN");
    if (indianStates) {
      const stateNames = indianStates.map((state) => ({
        name: state.name,
        code: state.isoCode,
      }));
      setStates([{ name: "Select a state", code: "" }, ...stateNames]);
    }
  }, []);

  useEffect(() => {
    if (editAddressData.state.code) {
      const cities = City.getCitiesOfState("IN", editAddressData.state.code);
      if (cities) {
        const cityNames = cities.map((city) => ({
          name: city.name,
          code: city.stateCode,
        }));
        setCities([{ name: "Select a city", code: "" }, ...cityNames]);
      } else {
        setCities([{ name: "Select a city", code: "" }]);
      }
    } else {
      setCities([{ name: "Select a city", code: "" }]);
    }
  }, [editAddressData.state.code]);

  const handleInputChange = (field: string, value: any) => {
    setEditAddressData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleEditAddress = async (e: any) => {
  e.preventDefault();

  if (!session?.user?.id) {
    toast({
      title: "Error",
      description: "User not logged in",
      variant: "destructive",
    });
    return;
  }

  if (editAddressData.city.name === "Select a city" || editAddressData.state.name === "Select a state") {
    toast({
      title: "Please select a valid city and state",
      variant: "destructive",
    });
    return;
  }
  if(editAddressData.phone.length !== 10){
    toast({
      title: "Please enter a valid phone number",
      variant: "destructive",
    });
    return;
  }
  const requestData = {
    addressId: editAddressData._id, // Include addressId for editing
    firstName: editAddressData.firstName,
    lastName: editAddressData.lastName,
    address: editAddressData.address,
    phone_number: editAddressData.phone,
    zipCode: editAddressData.pincode,
    state: editAddressData.state,
    city: editAddressData.city,
  };

  try {
    setSaving(true);
    const response = await fetch(`/api/addresses/${session.user.id}`, {
      method: "PUT", // Change method to PUT
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (response.ok) {
      const responseData = await response.json();
      toast({
        title: "Success",
        description: `Address updated successfully`,
      });
      // Update the addresses state with the edited address
      setAddresses((prevAddresses: Address[]) =>
        prevAddresses.map((address) =>
          address._id === responseData.address._id ? responseData.address : address
        )
      );
      // Back to the previous page
      console.log("Address updated successfully: ", responseData);
      router.back();
    } else {
      const errorData = await response.json();
      toast({
        title: "Error",
        description: errorData?.error || "Error updating address",
        variant: "destructive",
      });
    }
  } catch (error) {
    console.error("Error updating address:", error);
    toast({
      title: "Error",
      description: "An error occurred while updating the address. Please try again later.",
      variant: "destructive",
    });
  } finally {
    setSaving(false);
  }
};

  const handleCancel = () => {
    setEditAddressData({
      _id: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      state: { name: "Select a state", code: "" },
      city: { name: "Select a city", code: "" },
      pincode: "",
    });
    router.back();
  };

  return (
    <section className="p-4">
        <form 
        onSubmit={handleEditAddress}
        >
       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            
        <InputField
          id="firstName"
          label="First name"
          value={editAddressData.firstName}
          setValue={(value) => handleInputChange("firstName", value)}
          required
        />
        <InputField
          id="lastName"
          label="Last name"
          value={editAddressData.lastName}
          setValue={(value) => handleInputChange("lastName", value)}
            required
        />
        <InputField
          id="phone"
          label="Phone No"
          type="tel"
          value={editAddressData.phone}
          setValue={(value) => {
            let numericValue = value.replace(/[^0-9]/g, "");
            if (numericValue.length > 10) {
              numericValue = numericValue.slice(0, 10);
            }
            handleInputChange("phone", numericValue);
          }}
            required
        />
        <InputField
          id="address"
          label="Address"
          value={editAddressData.address}
          setValue={(value) => handleInputChange("address", value)}
            required
        />
        
        {/* State Dropdown */}
        <Dropdown
        defaultValue="Select a state"
          id="state"
          label="State"
          options={states.map((state) => state.name)}
          value={editAddressData.state.name}
          setValue={(value) => {
            const selectedState = states.find((state) => state.name === value);
            if (selectedState) {
              handleInputChange("state", selectedState);
            }
          }}
        />

        {/* City Dropdown */}
        <Dropdown
        defaultValue="Select a city"
          id="city"
          label="City"
          options={cities.map((city) => city.name)}
          value={editAddressData.city.name}
          setValue={(value) => {
            const selectedCity = cities.find((city) => city.name === value);
            if (selectedCity) {
              handleInputChange("city", selectedCity);
            }
          }}
        />

        <InputField
        required
          id="pincode"
          label="Pincode"
          value={editAddressData.pincode}
          setValue={(value) => handleInputChange("pincode", value)}
        />
      </div>
      <div className="flex justify-end mt-6 gap-2">
        <Button onClick={handleCancel} className="text-red-500 border border-red-500 bg-white hover:bg-red-500 hover:text-white">
          Cancel
        </Button>
        <Button type="submit"
         className="bg-yellow-500 text-white hover:opacity-70 disabled:opacity-70"
            disabled={saving}
         >
            {saving ? "Saving address..." : "Save Address"}
        </Button>
      </div>
      </form>

    </section>
  );
};

export default EditAddress;
