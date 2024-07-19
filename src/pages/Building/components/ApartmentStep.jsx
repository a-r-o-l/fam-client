import React, { useEffect } from "react";
import { useGetApartmentsQuery } from "../../../services/hooks/Apartment/useApartmentQuery";
import { useQueryClient } from "@tanstack/react-query";
import { ApartmentStepItem } from "./ApartmentStepItem";
import { ScrollArea, Text } from "@mantine/core";

export const ApartmentStep = ({ selectedBuilding }) => {
  const queryClient = useQueryClient();
  const { data: apartments, refetch } = useGetApartmentsQuery({
    BuildingId: selectedBuilding?.id,
  });

  useEffect(() => {
    refetch();
  }, [selectedBuilding, refetch]);

  return (
    <div className="flex flex-col">
      <ScrollArea
        h={600}
        scrollbars="y"
        scrollbarSize="md"
        p={20}
        w={320}
        className={` ${
          selectedBuilding && apartments?.length && apartments.length > 6
            ? "border-neutral-700 border-b-2"
            : ""
        }`}
      >
        {selectedBuilding && apartments?.length ? (
          apartments.map((apartment, index) => (
            <ApartmentStepItem
              key={apartment.id}
              apartment={apartment}
              isLastItem={index === apartments?.length - 1}
            />
          ))
        ) : (
          <></>
        )}
      </ScrollArea>
    </div>
  );
};
