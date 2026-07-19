import { Controller, useForm } from "react-hook-form";
import DropzoneField from "../../components/DropzoneField/DropzoneField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { NumericFormat } from "react-number-format";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import {
  useGetAnimalByIdQuery,
  useUpdateAnimalMutation,
} from "../../services/animalsApi";
import styles from "./AnimalForm.module.scss";
import AnimalTypeSelect from "../../components/AnimalTypeSelect/AnimalTypeSelect";
import { useEffect } from "react";

export interface UpdateAnimalForm {
  name: string;
  type: "dog" | "cat" | "bird" | "rodent";
  breed: string;
  sex: "male" | "female";
  birthDate: Date | null;
  price: number;
  description: string;
  images: (File | string)[];
}

export default function EditAnimal() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = useGetAnimalByIdQuery(id);
  const [updateAnimal, { isLoading: isUpdating }] = useUpdateAnimalMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setError,
    clearErrors,
  } = useForm<UpdateAnimalForm>({
    defaultValues: {
      name: data?.name,
      type: data?.type,
      breed: data?.breed,
      birthDate: data?.birthDate ? new Date(data?.birthDate) : null,
      price: data?.price,
      description: data?.description,
      images: data?.images,
      sex: data?.sex,
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        type: data.type,
        breed: data.breed,
        birthDate: data.birthDate ? new Date(data.birthDate) : null,
        price: data.price,
        description: data.description,
        images: data.images,
        sex: data.sex,
      });
    }
  }, [data, reset]);

  const onSubmit = async (data: UpdateAnimalForm) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("type", data.type);
    formData.append("breed", data.breed);
    formData.append("sex", data.sex);

    formData.append(
      "birthDate",
      data.birthDate ? data.birthDate.toISOString() : "",
    );

    if (data.price) {
      formData.append("price", String(data.price));
    }

    if (data.description) {
      formData.append("description", data.description);
    }

    if (data.images.length === 0) {
      formData.append("images", "");
    } else {
      data.images.forEach((file) => {
        formData.append("images", file);
      });
    }

    if (!id) return;

    try {
      toast.loading("Updating...");
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      await updateAnimal({
        id,
        formData,
      }).unwrap();

      toast.dismiss();
      toast.success("Updated");

      navigate(`/animals/${id}`);
    } catch {
      toast.dismiss();
      toast.error("Error");
    }
  };

  return (
    <main>
      <Section>
        <Container>
          <Toaster />
          <Breadcrumbs
            className={styles.breadcrumb}
            items={[
              { title: "Animals", path: location.state?.from || "/animals" },
              { title: "Animal details", path: `/animals/${id}` },
              { title: "Edit animal" },
            ]}
          />

          <div className={styles.formWrapper}>
            <h1 className={styles.title}>Edit animal details</h1>

            <form className={styles.addForm} onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div className={styles.inputWrapper}>
                  <legend className={styles.inputLabel}>
                    Animal Type<span className={styles.star}>*</span>
                  </legend>
                  <Controller
                    name="type"
                    control={control}
                    rules={{ required: "Select type of animal" }}
                    render={({ field }) => (
                      <AnimalTypeSelect
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {errors.type && (
                    <p className={styles.errorText}>{errors.type.message}</p>
                  )}
                </div>
                <div className={styles.inputWrapper}>
                  <label className={styles.inputLabel} htmlFor="name">
                    Name<span className={styles.star}>*</span>
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    id="name"
                    {...register("name", {
                      minLength: {
                        value: 2,
                        message: "Name must have minimum 2 character",
                      },
                    })}
                  />

                  {errors.name && (
                    <p className={styles.errorText}>{errors.name.message}</p>
                  )}
                </div>
                <div className={styles.inputWrapper}>
                  <label className={styles.inputLabel} htmlFor="breed">
                    Breed<span className={styles.star}>*</span>
                  </label>

                  <input
                    className={styles.input}
                    type="text"
                    id="breed"
                    {...register("breed", {
                      minLength: {
                        value: 2,
                        message: "Breed must have minimum 2 character",
                      },
                    })}
                  />

                  {errors.breed && (
                    <p className={styles.errorText}>{errors.breed.message}</p>
                  )}
                </div>
                <div className={styles.inputWrapper}>
                  <legend className={styles.inputLabel}>
                    Sex<span className={styles.star}>*</span>
                  </legend>

                  <div className={styles.sexLabelWrapper}>
                    <label className={styles.sexLabel}>
                      Male
                      <input
                        className={styles.sexInput}
                        type="radio"
                        value="male"
                        {...register("sex")}
                      />
                    </label>

                    <label className={styles.sexLabel}>
                      Female
                      <input
                        className={styles.sexInput}
                        type="radio"
                        value="female"
                        {...register("sex")}
                      />
                    </label>
                  </div>

                  {errors.sex && (
                    <p className={styles.errorText}>{errors.sex.message}</p>
                  )}
                </div>
                <div className={styles.inputWrapper}>
                  <label className={styles.inputLabel} htmlFor="birthDate">
                    Date of birth
                  </label>

                  <Controller
                    name="birthDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        className={styles.input}
                        selected={field.value}
                        onChange={field.onChange}
                        dateFormat="dd.MM.yyyy"
                        maxDate={new Date()}
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={30}
                        popperPlacement="bottom-start"
                        portalId="root"
                        calendarClassName={styles.calendar}
                      />
                    )}
                  />

                  {errors.birthDate && (
                    <p className={styles.errorText}>
                      {errors.birthDate.message}
                    </p>
                  )}
                </div>
                <div className={styles.inputWrapper}>
                  <label className={styles.inputLabel} htmlFor="price">
                    Price
                  </label>

                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                      <NumericFormat
                        className={styles.input}
                        value={field.value}
                        onValueChange={(values) =>
                          field.onChange(values.floatValue)
                        }
                        thousandSeparator=","
                        prefix="$"
                        decimalScale={2}
                      />
                    )}
                  />

                  {errors.price && (
                    <p className={styles.errorText}>{errors.price.message}</p>
                  )}
                </div>
              </div>
              <div>
                <div className={styles.descWrapper}>
                  <label className={styles.inputLabel} htmlFor="description">
                    Description
                  </label>

                  <textarea
                    className={styles.description}
                    id="description"
                    {...register("description", {
                      maxLength: {
                        value: 1000,
                        message: "Too long description",
                      },
                    })}
                  />

                  {errors.description && (
                    <p className={styles.errorText}>
                      {errors.description.message}
                    </p>
                  )}
                </div>
                <div className={styles.dropWrapper}>
                  <label className={styles.inputLabel}>Images</label>

                  <Controller
                    name="images"
                    control={control}
                    render={({ field }) => (
                      <DropzoneField
                        value={field.value}
                        onChange={field.onChange}
                        setError={setError}
                        clearErrors={clearErrors}
                      />
                    )}
                  />
                  {errors.images && (
                    <p className={styles.errorImg}>{errors.images.message}</p>
                  )}
                </div>
              </div>
              <div className={styles.btnWrapper}>
                <button
                  type="button"
                  className={styles.resetBtn}
                  onClick={() =>
                    reset({
                      name: "",
                      type: "dog",
                      breed: "",
                      sex: "male",
                      birthDate: null,
                      price: 0,
                      description: "",
                      images: [],
                    })
                  }
                >
                  Reset
                </button>

                <button
                  type="submit"
                  disabled={isUpdating}
                  className={styles.submitBtn}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </Container>
      </Section>
    </main>
  );
}
