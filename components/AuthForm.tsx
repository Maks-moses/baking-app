"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getLoggedInUser, signIn, signUp } from "@/lib/actions/user.actions";
import PlaidLink from "./PlaidLink";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // sign up with appwrite & create plain link token

      if (type === "sign-up") {
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
          email: data.email,
          password: data.password,
        };
        const newUser = await signUp(userData);
        setUser(newUser);
      }
      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        if (response) router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="flex  cursor-pointer items-center gap-1">
          <Image src="/icons/logo.svg" width={34} height={34} alt="rien" />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 mg:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user
              ? "Lier un compte"
              : type === "sign-in"
              ? "se connecter"
              : "créer un compte"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Associer votre compte pour commencer"
                : "Veuillez saisir vos coordonnées"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          {" "}
          <PlaidLink user={user} variant="primary" />{" "}
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="firstName"
                      label="Prenom"
                      placeholder="Saisissez votre prenom"
                    />
                    <CustomInput
                      control={form.control}
                      name="lastName"
                      label="Nom"
                      placeholder="Saisissez votre nom"
                    />
                  </div>

                  <CustomInput
                    control={form.control}
                    name="address1"
                    label="Adresse"
                    placeholder="Saisissez votre adresse"
                  />
                  <CustomInput
                    control={form.control}
                    name="city"
                    label="Ville"
                    placeholder="Saisissez votre ville"
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="state"
                      label="Etat"
                      placeholder="Ex: RDC"
                    />
                    <CustomInput
                      control={form.control}
                      name="postalCode"
                      label="Code Postal"
                      placeholder="Ex: 11101"
                    />
                  </div>

                  <CustomInput
                    control={form.control}
                    name="dateOfBirth"
                    label="date de naissance"
                    placeholder="aaaa-mm-jj"
                  />
                  <CustomInput
                    control={form.control}
                    name="ssn"
                    label="SSN"
                    placeholder="EX: 1234"
                  />
                </>
              )}
              <CustomInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="Saisissez votre email"
              />
              <CustomInput
                control={form.control}
                name="password"
                label="Mot de passe"
                placeholder="Saisissez votre mot de passe"
              />

              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Se connecter"
                  ) : (
                    "S'enregister"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Vous n'avez pas de compte?"
                : "Vous avez déjà un compte?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Creer un compte" : "Se connecter"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
