import { useMutation, useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useParams } from "react-router-dom";
import ManageHotelForms from "../components/ManageHotelForms";
import { useAppContext } from "../context/AppContext";

const EditHotel = () => {
  const { id } = useParams();
  const { showToast } = useAppContext();
  const { data: hotel } = useQuery({
    queryKey: ["getMyHotel", id],
    queryFn: () => apiClient.getHotel(id || ""),
    enabled: !!id,
  });

  const { mutate, isPending} = useMutation({
    mutationFn: ({ id, hotel }: { id: string; hotel: FormData }) =>
      apiClient.updateHotel(id, hotel),
    onSuccess: () => {
      showToast({
        message: "Successfully updated",
        type: "SUCCESS",
      });
    },
    onError: () => {
      showToast({
        message: "Unsuccessful updated. Please try again",
        type: "ERROR",
      });
    },
  });

  const modifyData = (data: FormData) => {
    if (id) {
      mutate({ id, hotel: data });
    }
  };

  return (
    <ManageHotelForms
      isLoading={isPending}
      saveData={modifyData}
      hotel={hotel}
    />
  );
};

export default EditHotel;
