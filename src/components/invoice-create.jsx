"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Dialog } from "./ui/dialog";
import { toast } from "sonner";

// const formSchema = z.object({
//   InvoiceNumber: z.string().min(3),
//   CustomerName: z.string().min(3),
//   BillingAddress: z.string().min(3),
//   ShippingAddress: z.string().min(3),
//   GSTIN: z.string().min(3),

//   items: z.string().optional(),

//   bills: z.string().optional(),
// });

export default function CreateInvoiceForm({
  invoice = {},
  setInvoice = () => {},
  closeDialog = () => {},
}) {
  const form = useForm({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      InvoiceNumber: "kasdj",
      CustomerName: "dsaoidsa ",
      BillingAddress: "gdfgdfg",
      ShippingAddress: "kjsadkjsa",
      GSTIN: "klsjdklasjdlsk",
    },
  });

  const { fields, append, update, remove } = useFieldArray({
    control: form.control,
    name: "items",
    defaultValues: {
      items: [],
    },
  });

  const {
    fields: bFields,
    append: bAppend,
    update: bUpdate,
    remove: bRemove,
  } = useFieldArray({
    control: form.control,
    name: "bills",
    defaultValues: {
      bills: [],
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    setInvoice((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        TotalAmount: "100",
        ...data,
      },
    ]);
    toast.success("Invoice Created");
    closeDialog();
    form.reset();
  };

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="InvoiceNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>InvoiceNumber</FormLabel>
                <FormControl>
                  <Input placeholder="InvoiceNumber" {...field} />
                </FormControl>
                <FormDescription>InvoiceNumber</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="CustomerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CustomerName</FormLabel>
                <FormControl>
                  <Input placeholder="CustomerName" {...field} />
                </FormControl>
                <FormDescription>CustomerName</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="BillingAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>BillingAddress</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="BillingAddress"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>BillingAddress</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ShippingAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ShippingAddress</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="ShippingAddress"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>ShippingAddress</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="GSTIN"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GSTIN</FormLabel>
                <FormControl>
                  <Input placeholder="GSTIN" {...field} />
                </FormControl>
                <FormDescription>GSTIN</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            {fields.map((field, index) => {
              return (
                <div key={index} className="flex flex-col border p-2">
                  <div className="flex w-full justify-between items-center py-2">
                    <h2>Add Invoice</h2>
                    <Button
                      className="remove"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </Button>
                  </div>
                  <ItemEdit
                    control={form.control}
                    index={index}
                    value={field.value}
                    update={update}
                  />
                </div>
              );
            })}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => append({ value: "" })}
            >
              Add Item
            </Button>
          </div>
          <div>
            {bFields.map((field, index) => (
              <div key={index} className="flex flex-col border p-2">
                <div className="flex w-full justify-between items-center py-2">
                  <h3>Add BillSundry</h3>
                  <Button
                    className="remove"
                    type="button"
                    onClick={() => bRemove(index)}
                  >
                    Remove
                  </Button>
                </div>
                <BillEdit
                  control={form.control}
                  index={index}
                  value={field.value}
                  update={bUpdate}
                />
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => bAppend({ value: "" })}
            >
              Add BillSundry
            </Button>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
const Display = ({ control, index, fieldArray }) => {
  const data = useWatch({
    control,
    name: `${fieldArray}.${index}`,
  });

  if (!data) return null;

  return (
    <div>
      <h3>Submitted Data</h3>
      <div className="bg-slate-300">
        {Object.entries(data).map(([key, value]) => (
          <div key={key}>
            <span>{key}</span>
            {" : "}
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ItemEdit = ({ update, index, value, control }) => {
  const { handleSubmit, control: editControl } = useForm({
    defaultValues: value,
  });

  return (
    <div className="border p-4 rounded-md">
      <Display control={control} index={index} fieldArray={"items"} />
      <FormField
        control={editControl}
        name="itemName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>itemName</FormLabel>
            <FormControl>
              <Input placeholder="itemName" {...field} />
            </FormControl>
            <FormDescription>itemName</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={editControl}
        name="quantity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>quantity</FormLabel>
            <FormControl>
              <Input placeholder="quantity" {...field} />
            </FormControl>
            <FormDescription>quantity</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={editControl}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>price</FormLabel>
            <FormControl>
              <Input placeholder="price" {...field} />
            </FormControl>
            <FormDescription>price</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={editControl}
        name="amount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>amount</FormLabel>
            <FormControl>
              <Input placeholder="amount" {...field} />
            </FormControl>
            <FormDescription>amount</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button
        type="button"
        onClick={handleSubmit((data) => {
          update(index, data);
        })}
      >
        Submit
      </Button>
    </div>
  );
};

const BillEdit = ({ update, index, value, control }) => {
  const { handleSubmit, control: editControl } = useForm({
    defaultValues: value,
  });

  return (
    <div className="border p-4 rounded-md">
      <Display control={control} index={index} fieldArray={"bills"} />
      <FormField
        control={editControl}
        name="billSundryName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>billSundryName</FormLabel>
            <FormControl>
              <Input placeholder="billSundryName" {...field} />
            </FormControl>
            <FormDescription>billSundryName</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={editControl}
        name="amount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>amount</FormLabel>
            <FormControl>
              <Input placeholder="amount" {...field} />
            </FormControl>
            <FormDescription>amount</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button
        type="button"
        onClick={handleSubmit((data) => {
          console.log(data);
          update(index, data);
        })}
      >
        Submit
      </Button>
    </div>
  );
};
