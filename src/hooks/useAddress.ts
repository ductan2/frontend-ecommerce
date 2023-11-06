import { useState, useEffect } from 'react';
import { useAppDispatch } from '../store/store';
import { toast } from 'react-toastify';
import { updateUser, getInfoUser, updateAddress, deleteAddress } from '../features/user/userSlice';
import { Address } from '../types/user';

const useAddress = () => {
   const [address, setAddress] = useState<Address>({
      province: '',
      district: '',
      wards: ''
   });
   const [provinceList, setProvinceList] = useState([]);
   const [districtList, setDistrictList] = useState([]);
   const [wardsList, setWardsList] = useState([]);
   const dispatch = useAppDispatch();

   // Fetch province list
   useEffect(() => {
      fetch('https://provinces.open-api.vn/api/')
         .then((response) => {
            if (!response.ok) {
               throw new Error('Network response was not ok');
            }
            return response.json();
         })
         .then((data) => {
            setProvinceList(data);
         })
         .catch((error) => toast.error(error.message));
   }, []);

   // Fetch district list based on selected province
   useEffect(() => {
      if (address.province) {
         fetch(`https://provinces.open-api.vn/api/d/search/?q=${address.province}`)
            .then((response) => {
               if (!response.ok) {
                  throw new Error('Network response was not ok');
               }
               return response.json();
            })
            .then((data) => {
               setDistrictList(data);
            })
            .catch((error) => toast.error(error.message));
      }
   }, [address.province]);

   // Fetch wards list based on selected district
   useEffect(() => {
      if (address.district) {
         fetch(`https://provinces.open-api.vn/api/w/search/?q=${address.district}`)
            .then((response) => {
               if (!response.ok) {
                  throw new Error('Network response was not ok');
               }
               return response.json();
            })
            .then((data) => {
               setWardsList(data);
            })
            .catch((error) => toast.error(error.message));
      }
   }, [address.district]);

   // Handle value changes
   const handleChangeValue = (e: React.ChangeEvent<HTMLSelectElement>, option: string) => {
      const { value } = e.target;
      setAddress((prev) => ({
         ...prev,
         [option]: value
      }));
   };
   const handleUpdateAddress = async (id: string) => {
      if (!address.district || !address.province || !address.wards) {
         toast.error('Please enter your address');
         return;
      }

      dispatch(updateAddress({ id_address: id, address })).then(() => {
         setTimeout(() => {
            dispatch(getInfoUser());
         }, 500);
      });
   }
   // Handle address update
   const handleAddAddress = async () => {

      if (!address.district || !address.province || !address.wards) {
         toast.error('Please enter your address');
         return;
      }

      dispatch(updateUser({ address })).then(() => {
         setTimeout(() => {
            dispatch(getInfoUser());
         }, 500);
      });
   };
   const handleDeleteAddress = async (id: string) => {
      dispatch(deleteAddress({ id_address: id })).then(() => {
         setTimeout(() => {
            dispatch(getInfoUser());
         }, 500);
      });
   }
   return {
      address,
      provinceList,
      districtList,
      wardsList,
      handleChangeValue,
      handleAddAddress,
      setAddress,
      handleUpdateAddress,
      handleDeleteAddress
   };
};

export default useAddress;
