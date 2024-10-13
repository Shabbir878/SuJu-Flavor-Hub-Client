// "use client";
// import { ReactNode } from "react";
// import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

// interface FormConfig {
//   defaultValues?: Record<string, any>;
//   resolver?: any;
// }

// interface IProps extends FormConfig {
//   children: ReactNode;
//   onSubmit: SubmitHandler<any>;
// }

// const FXForm = ({ children, onSubmit, defaultValues, resolver }: IProps) => {
//   const formConfig: FormConfig = {};

//   if (!!defaultValues) {
//     formConfig["defaultValues"] = defaultValues;
//   }
//   if (!!resolver) {
//     formConfig["resolver"] = resolver;
//   }

//   const methods = useForm(formConfig);

//   const submitHandler = methods.handleSubmit;

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={submitHandler(onSubmit)}>{children}</form>
//     </FormProvider>
//   );
// };

// export default FXForm;

// "use client";
// import { ReactNode } from "react";
// import { FormProvider, useForm } from "react-hook-form";

// interface FormConfig {
//   defaultValues?: Record<string, any>;
//   resolver?: any;
// }

// interface IProps extends FormConfig {
//   children: ReactNode;
//   onSubmit: (data: any, formMethods: { reset: () => void }) => Promise<void>; // Updated type
// }

// const FXForm = ({ children, onSubmit, defaultValues, resolver }: IProps) => {
//   const formConfig: FormConfig = {};

//   if (!!defaultValues) {
//     formConfig["defaultValues"] = defaultValues;
//   }
//   if (!!resolver) {
//     formConfig["resolver"] = resolver;
//   }

//   const methods = useForm(formConfig);

//   const submitHandler = async (data: any) => {
//     await onSubmit(data, { reset: methods.reset }); // Pass reset here
//   };

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={methods.handleSubmit(submitHandler)}>{children}</form>
//     </FormProvider>
//   );
// };

// export default FXForm;

// "use client";
// import { ReactNode } from "react";
// import { FormProvider, useForm, SubmitHandler } from "react-hook-form";

// interface FormConfig {
//   defaultValues?: Record<string, any>;
//   resolver?: any;
// }

// interface IProps extends FormConfig {
//   children: ReactNode;
//   onSubmit: SubmitHandler<any>; // Update type to match SubmitHandler directly
// }

// const FXForm = ({ children, onSubmit, defaultValues, resolver }: IProps) => {
//   const formConfig: FormConfig = {};

//   if (!!defaultValues) {
//     formConfig["defaultValues"] = defaultValues;
//   }
//   if (!!resolver) {
//     formConfig["resolver"] = resolver;
//   }

//   const methods = useForm(formConfig);

//   const submitHandler = async (data: any) => {
//     await onSubmit(data, { reset: methods.reset }); // Pass reset here
//   };

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={methods.handleSubmit(submitHandler)}>{children}</form>
//     </FormProvider>
//   );
// };

// export default FXForm;

"use client";
import { ReactNode } from "react";
import {
  FormProvider,
  useForm,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";

interface FormConfig {
  defaultValues?: Record<string, any>;
  resolver?: any;
}

// Update the interface to allow for the formMethods parameter
interface IProps extends FormConfig {
  children: ReactNode;
  onSubmit: (
    data: FieldValues,
    formMethods: { reset: () => void },
  ) => Promise<void>; // Change to accept reset
}

const FXForm = ({ children, onSubmit, defaultValues, resolver }: IProps) => {
  const formConfig: FormConfig = {};

  if (!!defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (!!resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);

  const submitHandler: SubmitHandler<FieldValues> = async (data) => {
    await onSubmit(data, { reset: methods.reset }); // Pass reset here
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submitHandler)}>{children}</form>
    </FormProvider>
  );
};

export default FXForm;