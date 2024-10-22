import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "@/lib/api";
import { CUSTOMER_DATA } from "@/lib/storage";
import { toast } from "sonner";

type LoginDialogProps = {
  triggerButton: React.ReactNode; // The button will be passed as a prop
};

const LoginPrompt: React.FC<LoginDialogProps> = ({ triggerButton }) => {
  const loginSchema = z.object({
    name: z.string().min(2).max(50),
    phone: z.string().length(10, "Phone number must be exactly 10 digits"),
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
    await signUp(values.name, values.phone)
      .then(({ data }) => {
        console.log(data);
        localStorage.setItem(CUSTOMER_DATA, JSON.stringify(data.customer));
        toast(data.message, {
          style: {
            backgroundColor: "green",
            color: "white",
          },
        });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast("Error occured. Contact support!", {
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
      });
  }

  return (
    <Dialog>
      <DialogTrigger>{triggerButton}</DialogTrigger>
      <DialogContent className="w-[90%] rounded-xl">
        <DialogHeader className="flex items-start">
          <DialogTitle className="text-xl">
            You aren&apos;t logged in!!
          </DialogTitle>
          <DialogDescription className="text-left text-sm leading-tight">
            Please login to your account. Enter your phone number below.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name"
                        {...field}
                        className="text-sm px-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="XXXXX XXXXX"
                        {...field}
                        className="text-sm px-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-4 w-[100%] flex items-center justify-center">
                <Button type="submit">Login</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginPrompt;
