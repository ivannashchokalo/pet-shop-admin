import { Controller, useForm } from "react-hook-form";
import DropzoneField from "../../components/DropzoneField/DropzoneField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { NumericFormat } from "react-number-format";
import toast, { Toaster } from "react-hot-toast";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import styles from "./AnimalForm.module.scss";
import { useLocation, useNavigate } from "react-router";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { useAddAnimalMutation } from "../../services/animalsApi";
import AnimalTypeSelect from "../../components/AnimalTypeSelect/AnimalTypeSelect";

interface CreateNewAnimalForm {
  name: string;
  type: "dog" | "cat" | "bird" | "rodent";
  breed: string;
  sex: "male" | "female";
  birthDate: Date;
  price: number;
  description: string;
  images: File[];
}

export default function CreateNewAnimal() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setError,
    clearErrors,
  } = useForm<CreateNewAnimalForm>({
    defaultValues: {
      type: "dog",
      images: [],
    },
    mode: "onBlur",
  });

  const [addAnimal, { isLoading }] = useAddAnimalMutation();

  const onSubmit = async (data: CreateNewAnimalForm) => {
    const animalData = new FormData();
    animalData.append("name", data.name);
    animalData.append("type", data.type);
    animalData.append("breed", data.breed);
    animalData.append("sex", data.sex);

    if (data.birthDate) {
      animalData.append("birthDate", data.birthDate.toISOString());
    }

    if (data.price) {
      animalData.append("price", String(data.price));
    }

    if (data.description) {
      animalData.append("description", data.description);
    }

    data.images.forEach((file) => {
      animalData.append("images", file);
    });
    try {
      toast.loading("Creating...");
      await addAnimal(animalData).unwrap();

      toast.dismiss();
      toast.success("Created");

      navigate("/animals");

      reset({
        name: "",
        type: "dog",
        breed: "",
        birthDate: undefined,
        price: 0,
        description: "",
        images: [],
      });
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
              { title: "Create animal" },
            ]}
          />
          <div className={styles.formWrapper}>
            <h1 className={styles.title}>Add a new animal to the database</h1>
            <form className={styles.addForm} onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div className={styles.inputWrapper}>
                  <label className={styles.inputLabel} htmlFor="type">
                    Animal Type <span className={styles.star}>*</span>
                  </label>
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
                  <div>
                    <input
                      placeholder="Enter the animal's name"
                      className={styles.input}
                      type="text"
                      id="name"
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must have minimum 2 character",
                        },
                      })}
                    />

                    <p className={styles.errorText}>
                      {errors.name && errors.name.message}
                    </p>
                  </div>
                </div>
                <div className={styles.inputWrapper}>
                  <label className={styles.inputLabel} htmlFor="breed">
                    Breed<span className={styles.star}>*</span>
                  </label>
                  <div>
                    <input
                      placeholder="Enter the breed"
                      className={styles.input}
                      type="text"
                      id="breed"
                      {...register("breed", {
                        required: "Breed is required",
                        minLength: {
                          value: 2,
                          message: "Breed must have minimum 2 character",
                        },
                      })}
                    />
                    <p className={styles.errorText}>
                      {errors.breed && errors.breed.message}
                    </p>
                  </div>
                </div>

                <div className={styles.inputWrapper}>
                  <legend className={styles.inputLabel}>
                    Sex<span className={styles.star}>*</span>{" "}
                  </legend>
                  <div className={styles.sexLabelWrapper}>
                    <label className={styles.sexLabel}>
                      Male
                      <input
                        defaultChecked
                        className={styles.sexInput}
                        type="radio"
                        value="male"
                        {...register("sex", { required: "Sex type of animal" })}
                      />
                    </label>
                    <label className={styles.sexLabel}>
                      Female
                      <input
                        className={styles.sexInput}
                        type="radio"
                        value="female"
                        {...register("sex", { required: "Sex type of animal" })}
                      />
                    </label>
                  </div>
                  {errors.sex && <p>{errors.sex.message}</p>}
                </div>

                <div className={styles.inputWrapper}>
                  <label htmlFor="birthDate" className={styles.inputLabel}>
                    Date of birth:
                  </label>
                  <Controller
                    name="birthDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        className={styles.input}
                        id="birthDate"
                        placeholderText="Select birth date"
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

                  {errors.birthDate && <p>{errors.birthDate.message}</p>}
                </div>

                <div className={styles.inputWrapper}>
                  <label className={styles.inputLabel} htmlFor="price">
                    Price:
                  </label>
                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                      <NumericFormat
                        placeholder="0.00"
                        className={styles.input}
                        id="price"
                        value={field.value}
                        onValueChange={(values) => {
                          field.onChange(values.floatValue);
                        }}
                        allowedDecimalSeparators={["."]}
                        thousandSeparator=","
                        prefix="$"
                        decimalScale={2}
                        allowLeadingZeros={false}
                        allowNegative={false}
                      />
                    )}
                  />
                  {errors.price && <p>{errors.price.message}</p>}
                </div>
              </div>
              <div>
                <div className={styles.descWrapper}>
                  <label className={styles.inputLabel} htmlFor="description">
                    Description
                  </label>
                  <textarea
                    placeholder="Describe the animal's personality, health condition, and any special notes..."
                    className={styles.description}
                    id="description"
                    {...register("description", {
                      maxLength: {
                        value: 1000,
                        message: "Too long description",
                      },
                    })}
                  />
                  {errors.description && <p>{errors.description.message}</p>}
                </div>
                <div className={styles.dropWrapper}>
                  <label className={styles.inputLabel} htmlFor="images">
                    Images
                  </label>
                  <Controller
                    name="images"
                    control={control}
                    render={({ field }) => {
                      return (
                        <DropzoneField
                          id="images"
                          value={field.value}
                          onChange={field.onChange}
                          setError={setError}
                          clearErrors={clearErrors}
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className={styles.btnWrapper}>
                <button
                  type="button"
                  className={styles.resetBtn}
                  onClick={() => reset()}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={styles.submitBtn}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </Container>
      </Section>
    </main>
  );
}
