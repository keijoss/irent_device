import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useDeviceStore from "@/Hook/deiceStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { redirect } from "react-router-dom";
import axios from "axios";

const columns = [
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "price",
    header: "Price",
    class: "text-center",
  },
  {
    accessorKey: "no_available",
    header: "No. Available",
    class: "text-center",
  },
  {
    accessorKey: "processor",
    header: "Processor",
  },
  {
    accessorKey: "memory",
    header: "Memory",
  },
  {
    accessorKey: "storage",
    header: "Storage",
  },
  {
    accessorKey: "display_resolution",
    header: "Display Resolution",
  },
  {
    accessorKey: "status",
    header: "Status",
    class: "text-center",
  },
  {
    accessorKey: "show",
    header: "Shown",
    class: "text-center",
  },
  {
    accessorKey: "stock",
    header: "Stock",
    class: "text-center",
  },
  {
    accessorKey: "action",
    header: "Action",
    class: "text-center",
  },
];

export default function Dashboard() {
  const devices = useDeviceStore((state) => state.devices);
  const refetch = useDeviceStore((state) => state.refetch);

  useEffect(() => {
    console.log(devices);
  },[devices]);
  const soft_delete_return = (idNumber,value) => {

    const del = async () => {
      const res = await axios
        .delete(`http://localhost:3300/device/${idNumber}`, {
          data: {
            soft_delete: value 
          },
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    del();
             refetch();

  };
  return (
    <div className="w-full px-8 rounded-md overflow-auto">
      <Table className="text-left rounded-md ">
        <TableCaption>Admin Dashboard</TableCaption>
        <TableHeader className="bg-[#80667F] text-white rounded-md ">
          <TableRow className="rounded-md ">
            {columns.map((column, index) => (
              <TableHead className={column.class} key={index}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="items">
          {devices?.result?.map((device, index) => (
            <TableRow key={device.id}>
              <TableCell>{device.brand}</TableCell>
              <TableCell className="text-center">
                {device.price_per_day}
              </TableCell>
              <TableCell className="text-center">{device.available}</TableCell>
              <TableCell>{device.processor}</TableCell>
              <TableCell>{device.memory}</TableCell>
              <TableCell>{device.storage}</TableCell>
              <TableCell>{device.display_resolution}</TableCell>
              <TableCell className="text-center">{device.status}</TableCell>
              <TableCell className="text-center">
                <Select
                  onValueChange={(e) => {
                    soft_delete_return(device.id,e);
                  }}
                >
                  <SelectTrigger className="w-[120px] text-sm bg-[#80667F] text-white ">
                    <SelectValue
                      placeholder={device.soft_delete ?   "Removed" : "Live"}
                      className="text-sm"
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-white px-4 py-2">
                    <SelectItem
                      value={!device.soft_delete ? 1 : 0}
                    >
                      {!device.soft_delete ? "Removed" : "Live"}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-center">{device.stock}</TableCell>
              <TableCell>
                <div className="h-full flex justify-center">
                  <button>Modify</button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
