"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { createContext, useState } from "react";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateInvoiceForm from "./invoice-create";

const PAGE_SIZE = 3;

const DataTable = () => {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [invoices, setInvoice] = useState([
    {
      id: "1",
      InvoiceNumber: "231",
      CustomerName: "Tarun",
      BillingAddress: "sadklsjaldas",
      ShippingAddress: "sdsakldjasd",
      GSTIN: "12031293adls",
      TotalAmount: "9312",
    },
    {
      id: "2",
      InvoiceNumber: "231",
      CustomerName: "Tarun",
      BillingAddress: "sadklsjaldas",
      ShippingAddress: "sdsakldjasd",
      GSTIN: "12031293adls",
      TotalAmount: "9312",
    },
    {
      id: "3",
      InvoiceNumber: "231",
      CustomerName: "Tarun",
      BillingAddress: "sadklsjaldas",
      ShippingAddress: "sdsakldjasd",
      GSTIN: "12031293adls",
      TotalAmount: "9312",
    },
    {
      id: "4",
      InvoiceNumber: "231",
      CustomerName: "Tarun",
      BillingAddress: "sadklsjaldas",
      ShippingAddress: "sdsakldjasd",
      GSTIN: "12031293adls",
      TotalAmount: "9312",
    },
    {
      id: "5",
      InvoiceNumber: "231",
      CustomerName: "Tarun",
      BillingAddress: "sadklsjaldas",
      ShippingAddress: "sdsakldjasd",
      GSTIN: "12031293adls",
      TotalAmount: "9312",
    },
    {
      id: "6",
      InvoiceNumber: "231",
      CustomerName: "Tarun",
      BillingAddress: "sadklsjaldas",
      ShippingAddress: "sdsakldjasd",
      GSTIN: "12031293adls",
      TotalAmount: "9312",
    },
    {
      id: "7",
      InvoiceNumber: "231",
      CustomerName: "Tarun",
      BillingAddress: "sadklsjaldas",
      ShippingAddress: "sdsakldjasd",
      GSTIN: "12031293adls",
      TotalAmount: "9312",
    },
    {
      id: "8",
      InvoiceNumber: "231",
      CustomerName: "Tarun",
      BillingAddress: "sadklsjaldas",
      ShippingAddress: "sdsakldjasd",
      GSTIN: "12031293adls",
      TotalAmount: "9312",
    },
  ]);

  const totalPages = Math.ceil(invoices.length / PAGE_SIZE);
  return (
    <div className="w-10/12 p-5">
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Invoices</h1>
          <DialogTrigger asChild>
            <Button className="mt-3">Add Invoice</Button>
          </DialogTrigger>
        </div>
        <Table className="mt-2">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">id</TableHead>
              <TableHead>InvoiceNumber</TableHead>
              <TableHead>CustomerName</TableHead>
              <TableHead>BillingAddress</TableHead>
              <TableHead>ShippingAddress</TableHead>
              <TableHead>GSTIN</TableHead>
              <TableHead className="text-right">TotalAmount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices
              .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
              .map(
                ({
                  id,
                  InvoiceNumber,
                  CustomerName,
                  BillingAddress,
                  ShippingAddress,
                  GSTIN,
                  TotalAmount,
                }) => {
                  return (
                    <TableRow key={id}>
                      <TableCell className="font-medium">{id}</TableCell>
                      <TableCell>{InvoiceNumber}</TableCell>
                      <TableCell>{CustomerName}</TableCell>
                      <TableCell>{BillingAddress}</TableCell>
                      <TableCell>{ShippingAddress}</TableCell>
                      <TableCell>{GSTIN}</TableCell>
                      <TableCell className="text-right">
                        {TotalAmount}
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
          </TableBody>
        </Table>
        <Pagination className="mt-3">
          <PaginationContent>
            <PaginationItem>
              <Button
                onClick={() => {
                  page > 1 && setPage(page - 1);
                }}
                variant="outline"
              >
                Previous
              </Button>
            </PaginationItem>
            {[...Array(totalPages).keys()].map((_, i) => {
              return (
                <PaginationItem key={i}>
                  <Button variant="outline" onClick={() => setPage(i + 1)}>
                    {i + 1}
                  </Button>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <Button
                onClick={() => {
                  page < totalPages && setPage(page + 1);
                }}
                variant="outline"
              >
                Next
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <DialogContent className="max-h-[80%] overflow-auto">
          <CreateInvoiceForm
            invoice={{}}
            setInvoice={setInvoice}
            closeDialog={() => {
              setOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DataTable;
