import { useDropzone } from "react-dropzone";
import styles from "./DropzoneField.module.scss";
import Icon from "../Icon/Icon";
import { MAX_SIZE } from "../../constants/images";

import type { UseFormClearErrors, UseFormSetError } from "react-hook-form";

import type { UpdateAnimalForm } from "../../pages/Animals/EditAnimalPage";

interface DropzoneFieldProps {
  value: (File | string)[];
  onChange: (files: (File | string)[]) => void;

  setError: UseFormSetError<UpdateAnimalForm>;
  clearErrors: UseFormClearErrors<UpdateAnimalForm>;

  id?: string;
}

export default function DropzoneField({
  value = [],
  onChange,
  id,
  setError,
  clearErrors,
}: DropzoneFieldProps) {
  // Максимальна кількість фото
  const MAX_FILES = 5;

  // Видалення картинки
  const handleRemove = (indexToRemove: number) => {
    const updatedFiles = value.filter((_, index) => index !== indexToRemove);

    onChange(updatedFiles);
  };

  // Dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,

    // тільки картинки
    accept: {
      "image/*": [],
    },

    // максимальний розмір одного файлу
    maxSize: MAX_SIZE,

    onDrop: (acceptedFiles, rejectedFiles) => {
      // Validation rejected files
      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach((file) => {
          file.errors.forEach((error) => {
            if (error.code === "file-too-large") {
              setError("images", {
                type: "manual",
                message: "Image is too large",
              });
            }

            if (error.code === "file-invalid-type") {
              setError("images", {
                type: "manual",
                message: "Only image files allowed",
              });
            }
          });
        });
      }

      // Validation max amount
      const updatedFiles = [...value, ...acceptedFiles];

      if (updatedFiles.length > MAX_FILES) {
        setError("images", {
          type: "manual",
          message: `Maximum ${MAX_FILES} images`,
        });

        return;
      }

      // Якщо rejected files є
      if (rejectedFiles.length > 0) {
        return;
      }

      // Очистка старих помилок
      clearErrors("images");

      // Додаємо файли
      onChange(updatedFiles);
    },
  });

  return (
    <div className={styles.wrapper}>
      <div {...getRootProps()} className={styles.dropZone}>
        <input {...getInputProps({ id })} />

        <div className={styles.content}>
          <div className={styles.uploadIconWrapper}>
            <Icon name="upload" size={30} className={styles.uploadIcon} />
          </div>

          <p className={styles.title}>
            {isDragActive
              ? "Drop the files here..."
              : "Drop your files here or browse"}
          </p>

          <p className={styles.subtitle}>Max file size up to 5 MB</p>
        </div>
      </div>

      {/*Preview картинок */}
      {value.length > 0 && (
        <ul className={styles.fileList}>
          {value.map((file, index) => {
            // Якщо File -> createObjectURL
            // Якщо string -> URL з backend
            const imageSrc =
              file instanceof File ? URL.createObjectURL(file) : file;

            return (
              <li key={index} className={styles.fileItem}>
                <div className={styles.imgWrapper}>
                  <img
                    src={imageSrc}
                    alt="Preview"
                    className={styles.previewImage}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className={styles.removeBtn}
                >
                  <Icon name="cross" size={20} className={styles.deleteIcon} />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
