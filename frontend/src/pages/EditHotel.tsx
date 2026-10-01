import { useMutation, useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useParams } from "react-router-dom";
import ManageHotelForms from "../components/ManageHotelForms";
import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";

const EditHotel = () => {
  const { id } = useParams();
  const { showToast } = useAppContext();
  const {
    data: hotel,
  } = useQuery({
    queryKey: ["getMyHotel", id],
    queryFn: () => apiClient.getHotel(id || ""),
    enabled: !!id,
  });

  useEffect(() => {
    console.log(hotel);
  }, [hotel]);

  const {
    mutate,
    isPending,
    isSuccess,
    isIdle,

  } = useMutation({
    mutationFn: ({ id, hotel }: { id: string; hotel: FormData }) =>
      apiClient.updateHotel(id, hotel),
  });

  const modifyData = (data: FormData) => {
    if (id) {
      mutate({ id, hotel: data });
    }
  };

  useEffect(() => {
    console.log(isIdle);
    if (isSuccess && !isIdle) {
      showToast({
        message: "Successfully updated",
        type: "SUCCESS",
      });
    }else if (!isSuccess && !isIdle && !isPending) {
      showToast({
        message: "Unsuccessful updated. Please try again",
        type: 'ERROR'
      })
    }

  }, [isSuccess]);

  return (
    <ManageHotelForms
      isLoading={isPending}
      saveData={modifyData}
      hotel={hotel}
    />
  );
};

export default EditHotel;
