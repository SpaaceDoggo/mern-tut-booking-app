import * as apiClient from "../api-client";
import { useMutation } from "@tanstack/react-query";
import ManageHotelForms from "../components/ManageHotelForms";
import { useAppContext } from "../context/AppContext";

const AddHotel = () => {
  const { showToast } = useAppContext();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: apiClient.addHotel,
    onSuccess: () => {
      showToast({
        message: "Added a hotel",
        type: "SUCCESS",
      });
    },
    onError: (error) => {
      showToast({
        message: error.message,
        type: "ERROR",
      });
    },
  });

  const handleSave = (formData: FormData) => {
    mutate(formData);
  };
  return (
    <>
      <ManageHotelForms 
       saveData={handleSave} 
       isLoading={isPending} 
       isSuccess={isSuccess}
      />
    </>
  );
};

export default AddHotel;
