import { useState, useEffect } from 'react';
import { useAppDispatch } from '../store/store';
import { toast } from 'react-toastify';
import { updateUser, getInfoUser } from '../features/user/userSlice';
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

   // Handle address update
   const handleUpdateAddress = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
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

   return {
      address,
      provinceList,
      districtList,
      wardsList,
      handleChangeValue,
      handleUpdateAddress,
      setAddress
   };
};

export default useAddress;
