import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { StyledForm } from "./UserForm.styled";
import {
  DeleteButton,
  UpdateButton,
} from "../UserTableBody/UserTableBody.styled";

const UserForm = ({ initialValues, onSubmit, text, closeModal }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    surname: Yup.string().required("Required"),
    numberPhone: Yup.string()
      .matches(/^\+380\d{9}$/, "Must be in the format +380xxxxxxxxx")
      .required("Required"),
    country: Yup.string().required("Required"),
    height: Yup.number().required("Required"),
    weight: Yup.number().required("Required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await onSubmit(values);
          Notify.success(`${text} successful.`);
          closeModal();
        } catch (error) {
          Notify.failure(`Error: ${error.message}`);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <StyledForm>
        <h2>{text}</h2>

        <label>Name: </label>
        <Field type="text" name="name" />
        <ErrorMessage name="name">
          {(msg) => <div>{Notify.failure(`Name: ${msg}`)}</div>}
        </ErrorMessage>

        <label>Surname: </label>
        <Field type="text" name="surname" />
        <ErrorMessage name="surname">
          {(msg) => <div>{Notify.failure(`Surname: ${msg}`)}</div>}
        </ErrorMessage>

        <label>Phone Number: </label>
        <Field type="text" name="numberPhone" placeholder="+380XXXXXXXXX" />
        <ErrorMessage name="numberPhone">
          {(msg) => <div>{Notify.failure(`Number Phone: ${msg}`)}</div>}
        </ErrorMessage>

        <label>Country: </label>
        <Field type="text" name="country" />
        <ErrorMessage name="country">
          {(msg) => <div>{Notify.failure(`Country: ${msg}`)}</div>}
        </ErrorMessage>

        <label>Height: </label>
        <Field type="number" name="height" />
        <ErrorMessage name="height">
          {(msg) => <div>{Notify.failure(`Height: ${msg}`)}</div>}
        </ErrorMessage>

        <label>Weight: </label>
        <Field type="number" name="weight" />
        <ErrorMessage name="weight">
          {(msg) => <div>{Notify.failure(`Weight: ${msg}`)}</div>}
        </ErrorMessage>

        <UpdateButton type="submit">{text}</UpdateButton>
        <DeleteButton type="button" onClick={closeModal}>
          Cancel
        </DeleteButton>
      </StyledForm>
    </Formik>
  );
};

export default UserForm;
