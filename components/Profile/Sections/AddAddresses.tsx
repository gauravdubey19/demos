import React, { useState,useEffect } from "react";
import { InputField } from "../ProfileComponents/InputFields";
import { Dropdown } from "../ProfileComponents/DropDown";
import { Button } from "@/components/ui/button";
import { State, City } from 'country-state-city';
import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { Address, useGlobalContext } from "@/context/GlobalProvider";
// import { useRouter } from "next/router";

const AddNewAddress = () => {
    const { data: session } = useSession();
    const {setAddresses} = useGlobalContext();
    const [addingAddress, setAddingAddress] = useState(false);
    // const router = useRouter();
  const [addressData, setAddressData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    state: { name: "Select a state", code: "" },
    city: { name: "Select a city", code: "" },
    pincode: "",
  });

  const [states, setStates] = useState<{ name: string; code: string }[]>([]);
  const [cities, setCities] = useState<{ name: string; code: string }[]>([]);

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
    if (addressData.state.code) {
      const cities = City.getCitiesOfState("IN", addressData.state.code);
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
  }, [addressData.state.code]);

  const handleInputChange = (field: string, value: any) => {
    setAddressData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSaveAddress = async (e: any) => {
    e.preventDefault();

    if (!session?.user?.id) {
      toast({
        title: "Error",
        description: "User not logged in",
        variant: "destructive",
      });
      return;
    }

    if (addressData.city.name === "Select a city" || addressData.state.name === "Select a state") {
      toast({
        title: "Please select a valid city and state",
        variant: "destructive",
      });
      return;
    }

    if(addressData.phone.length !== 10){
      toast({
        title: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }
    const requestData = {
      firstName: addressData.firstName,
      lastName: addressData.lastName,
      address: addressData.address,
      phoneNumber: addressData.phone,
      zipCode: addressData.pincode,
      state: addressData.state,
      city: addressData.city,
    };

    try {
      setAddingAddress(true);
      const response = await fetch(`/api/addresses/${session.user.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const responseData = await response.json();
        toast({
          title: "Success",
          description: `Address added successfully`,
        });
        // Back to the previous page
        console.log("Address added successfully: ", responseData);
        setAddresses((prevAddresses: Address[]) => [responseData.address,...prevAddresses]);
        window.history.back();
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData?.error || "Error adding address",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding address:", error);
      toast({
        title: "Error",
        description: "An error occurred while saving the address. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setAddingAddress(false);
    }
  };

  const handleCancel = () => {
    setAddressData({
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      state: { name: "Select a state", code: "" },
      city: { name: "Select a city", code: "" },
      pincode: "",
    });
  };

  return (
    <section className="p-4">
        <form 
        onSubmit={handleSaveAddress}
        >
       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            
        <InputField
          id="firstName"
          label="First name"
          value={addressData.firstName}
          setValue={(value) => handleInputChange("firstName", value)}
          required
        />
        <InputField
          id="lastName"
          label="Last name"
          value={addressData.lastName}
          setValue={(value) => handleInputChange("lastName", value)}
            required
        />
        <InputField
          id="phone"
          label="Phone No"
          type="tel"
          value={addressData.phone}
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
          value={addressData.address}
          setValue={(value) => handleInputChange("address", value)}
            required
        />
        
        {/* State Dropdown */}
        <Dropdown
        defaultValue="Select a state"
          id="state"
          label="State"
          options={states.map((state) => state.name)}
          value={addressData.state.name}
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
          value={addressData.city.name}
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
          value={addressData.pincode}
          setValue={(value) => handleInputChange("pincode", value)}
        />
      </div>
      <div className="flex justify-end mt-6 gap-2">
        <Button onClick={handleCancel} className="text-red-500 border border-red-500 bg-white hover:bg-red-500 hover:text-white">
          Cancel
        </Button>
        <Button type="submit"
         className="bg-yellow-500 text-white hover:opacity-70"
          disabled={addingAddress}
         >
          {addingAddress ? "Adding address..." : "Save Address"}
        </Button>
      </div>
      </form>

    </section>
  );
};

export default AddNewAddress;
