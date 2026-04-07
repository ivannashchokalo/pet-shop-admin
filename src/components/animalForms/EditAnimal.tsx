import { Controller, useForm } from "react-hook-form";
import DropzoneField from "../DropzoneField/DropzoneField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { NumericFormat } from "react-number-format";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router";
import Section from "../Section/Section";
import Container from "../Container/Container";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import {
  useGetAnimalByIdQuery,
  useUpdateAnimalMutation,
} from "../../services/animalsApi";
import styles from "./AnimalForms.module.scss";

interface UpdateAnimalForm {
  name: string;
  type: "dog" | "cat";
  breed: string;
  sex: "male" | "female";
  birthDate: Date | null;
  price: number;
  description: string;
  images: File[];
}

export default function EditAnimal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isLoading } = useGetAnimalByIdQuery(id);
  const [updateAnimal, { isLoading: isUpdating }] = useUpdateAnimalMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
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
  const onSubmit = async (data: UpdateAnimalForm) => {
    console.log(data);

    const formData = new FormData();

    if (data.name) {
      formData.append("name", data.name);
    }

    if (data.type) {
      formData.append("type", data.type);
    }

    if (data.breed) {
      formData.append("breed", data.breed);
    }

    if (data.sex) {
      formData.append("sex", data.sex);
    }

    formData.append(
      "birthDate",
      data.birthDate ? data.birthDate.toISOString() : "",
    );

    if (data.price) {
      formData.append("price", data.price);
    }

    if (data.description) {
      formData.append("description", data.description);
    }

    data.images.forEach((file) => {
      formData.append("images", file);
    });

    if (!id) return;

    try {
      toast.loading("Updating...");

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
              {/* LEFT SIDE */}
              <div>
                {/* NAME */}
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

                {/* TYPE */}
                <div className={styles.inputWrapper}>
                  <legend className={styles.inputLabel}>
                    Animal Type<span className={styles.star}>*</span>
                  </legend>

                  <div className={styles.sexLabelWrapper}>
                    <label className={styles.sexLabel}>
                      Dog
                      <input
                        className={styles.sexInput}
                        type="radio"
                        value="dog"
                        {...register("type")}
                      />
                    </label>

                    <label className={styles.sexLabel}>
                      Cat
                      <input
                        className={styles.sexInput}
                        type="radio"
                        value="cat"
                        {...register("type")}
                      />
                    </label>
                  </div>

                  {errors.type && (
                    <p className={styles.errorText}>{errors.type.message}</p>
                  )}
                </div>

                {/* BREED */}
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

                {/* SEX */}
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

                {/* DATE */}
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

                {/* PRICE */}
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

              {/* RIGHT SIDE */}
              <div>
                {/* DESCRIPTION */}
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

                {/* IMAGES */}
                <div className={styles.dropWrapper}>
                  <label className={styles.inputLabel}>Images</label>

                  <Controller
                    name="images"
                    control={control}
                    render={({ field }) => (
                      <DropzoneField
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>

              {/* BUTTONS */}
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
    // <main>
    //   <Section>
    //     <Container>
    //       <Toaster />
    //       <Breadcrumbs
    //         items={[
    //           { title: "Animals", path: location.state?.from || "/animals" },
    //           { title: " Animal detile", path: `/animals/${id}` },
    //           { title: "Edit animal" },
    //         ]}
    //       />
    //       <div>
    //         <h1>Edit Animal Details</h1>
    //       </div>
    //       <form onSubmit={handleSubmit(onSubmit)}>
    //         <div>
    //           <label htmlFor="name">Name:</label>
    //           <input
    //             type="text"
    //             id="name"
    //             {...register("name", {
    //               minLength: {
    //                 value: 2,
    //                 message: "Name must have minimum 2 character",
    //               },
    //             })}
    //           />
    //           {errors.name && <p>{errors.name.message}</p>}
    //         </div>
    //         <div>
    //           <fieldset>
    //             <legend>Choose an animal </legend>
    //             <label>
    //               Dog
    //               <input type="radio" value="dog" {...register("type")} />
    //             </label>
    //             <label>
    //               Cat
    //               <input type="radio" value="cat" {...register("type")} />
    //             </label>
    //           </fieldset>
    //           {errors.type && <p>{errors.type.message}</p>}
    //         </div>
    //         <div>
    //           <fieldset>
    //             <legend>Choose a sex </legend>
    //             <label>
    //               Male
    //               <input type="radio" value="male" {...register("sex")} />
    //             </label>
    //             <label>
    //               Female
    //               <input type="radio" value="female" {...register("sex")} />
    //             </label>
    //           </fieldset>
    //           {errors.sex && <p>{errors.sex.message}</p>}
    //         </div>

    //         <div>
    //           <label htmlFor="breed">Breed:</label>
    //           <input
    //             type="text"
    //             id="breed"
    //             {...register("breed", {
    //               minLength: {
    //                 value: 2,
    //                 message: "Breed must have minimum 2 character",
    //               },
    //             })}
    //           />
    //         </div>
    //         <div>
    //           <p>Date of birth:</p>
    //           <Controller
    //             name="birthDate"
    //             control={control}
    //             render={({ field }) => (
    //               <DatePicker
    //                 placeholderText="Select birth date"
    //                 selected={field.value}
    //                 onChange={field.onChange}
    //                 dateFormat="dd.MM.yyyy"
    //                 maxDate={new Date()}
    //                 showYearDropdown
    //                 scrollableYearDropdown
    //                 yearDropdownItemNumber={30}
    //               />
    //             )}
    //           />

    //           {errors.birthDate && <p>{errors.birthDate.message}</p>}
    //         </div>

    //         <div>
    //           <label htmlFor="price">Price:</label>
    //           <Controller
    //             name="price"
    //             control={control}
    //             render={({ field }) => (
    //               <NumericFormat
    //                 value={field.value}
    //                 onValueChange={(values) => {
    //                   field.onChange(values.floatValue);
    //                 }}
    //                 allowedDecimalSeparators={["."]}
    //                 thousandSeparator=","
    //                 prefix="$"
    //                 decimalScale={2}
    //                 allowLeadingZeros={false}
    //                 allowNegative={false}
    //               />
    //             )}
    //           ></Controller>
    //           {errors.price && <p>{errors.price.message}</p>}
    //         </div>

    //         <div>
    //           <label htmlFor="description">Description:</label>
    //           <textarea
    //             style={{
    //               resize: "none",
    //               width: 300,
    //               height: 100,
    //             }}
    //             id="description"
    //             {...register("description", {
    //               maxLength: {
    //                 value: 1000,
    //                 message: "Too long description",
    //               },
    //             })}
    //           />
    //           {errors.description && <p>{errors.description.message}</p>}
    //         </div>
    //         <Controller
    //           name="images"
    //           control={control}
    //           render={({ field }) => {
    //             return (
    //               <DropzoneField
    //                 value={field.value}
    //                 onChange={field.onChange}
    //               />
    //             );
    //           }}
    //         />
    //         <button disabled={isUpdating}>Send</button>
    //         <button
    //           type="button"
    //           onClick={() =>
    //             reset({
    //               name: "",
    //               type: "dog",
    //               breed: "",
    //               birthDate: undefined,
    //               price: undefined,
    //               description: "",
    //               images: [],
    //             })
    //           }
    //         >
    //           Reset
    //         </button>
    //       </form>
    //     </Container>
    //   </Section>
    // </main>
  );
}
