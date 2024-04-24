import React from "react";
import { Avatar, Badge, Card, Divider, Popover, Text } from "@mantine/core";
import { useUpdateApartmentMutation } from "../../../services/hooks/Apartment/useApartmentMutation";
import { useGetRenterByContractQuery } from "../../../services/hooks/Renter/useRenterQuery";
import {
  FaBed,
  FaBuilding,
  FaBusinessTime,
  FaCalendarDay,
  FaFingerprint,
  FaMobileScreen,
  FaRegMoneyBill1,
  FaRegUser,
} from "react-icons/fa6";
import { HiAtSymbol } from "react-icons/hi";

export const ApartmentStepItem = ({ apartment, isLastItem = false }) => {
  const updateApartment = useUpdateApartmentMutation();

  const { data: renter } = useGetRenterByContractQuery(
    {
      activeContractId: apartment?.activeContractId,
    },
    { enabled: !!apartment?.activeContractId }
  );

  return (
    <div
      className="flex flex-col items-start"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-row items-center gap-5">
        <div
          key={apartment?.id}
          className={`cursor-pointer my-2 w-10 h-10 flex justify-center items-center rounded-full dark:bg-neutral-700 border-2 dark:border-neutral-500 border-neutral-400 ${
            apartment.rented ? "" : "opacity-20"
          } shadow-md`}
        >
          <Text size="lg" fw={900}>
            {apartment?.number}
          </Text>
        </div>
        <div>
          {apartment.rented ? (
            <Popover
              position="top-start"
              offset={{ mainAxis: 15, crossAxis: 100 }}
              withArrow
              arrowPosition="side"
              arrowOffset={22}
              arrowSize={12}
              closeOnEscape={true}
              trapFocus={true}
              radius="lg"
            >
              <Popover.Target>
                <Badge size="lg" miw={100} onClick={(e) => e.stopPropagation()}>
                  {`${renter ? renter.name : ""} ${
                    renter ? renter.lastname : ""
                  }`}
                </Badge>
              </Popover.Target>
              <Popover.Dropdown>
                <Card
                  radius="lg"
                  align="center"
                  styles={{
                    root: {
                      display: "flex",
                      flexDirection: "column",
                    },
                  }}
                >
                  <div className="my-2 flex">
                    <Avatar src={renter?.image_url} size="lg" />
                  </div>
                  <Divider />
                  <div className="flex flex-row gap-5 items-center py-1 mt-2">
                    <FaRegUser color="#64a0ff" />
                    <Text>
                      {renter ? renter.name : ""}{" "}
                      {renter ? renter.lastname : ""}
                    </Text>
                  </div>
                  <div className="flex flex-row gap-5 items-center py-1">
                    <FaFingerprint color="#64a0ff" />
                    <Text>{renter ? renter.dni : ""}</Text>
                  </div>
                  <div className="flex flex-row gap-5 items-center py-1">
                    <FaMobileScreen color="#64a0ff" />
                    <Text>{renter ? renter.phone : ""}</Text>
                  </div>
                  <div className="flex flex-row gap-5 items-center py-1">
                    <HiAtSymbol color="#64a0ff" />

                    <Text>{renter ? renter.email : ""}</Text>
                  </div>
                </Card>
              </Popover.Dropdown>
            </Popover>
          ) : (
            <Badge color="famgreen.7" size="lg" miw={100}>
              Disponible
            </Badge>
          )}
        </div>
      </div>
      {isLastItem ? null : (
        <div className="flex flex-1 justify-center items-center w-10">
          <div className={`w-0.5 h-5 dark:bg-neutral-500 bg-black`} />
        </div>
      )}
    </div>
  );
};
