import InputFile from "@/components/ui/InputFile";
import useAddCategoryModal from "@/hooks/useAddCategoryModal";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";

interface PropTypes {
  isOpen: boolean;
  onClose?: () => void;
  refetchCategory?: () => void;
  onOpenChange: () => void;
}

const AddCategory = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchCategory } = props;
  const {
    control,
    errors,
    handleAddCategory,
    handleSubmit,
    isPendingMutateAddCategory,
    isPendingMutateAddFile,
    isSuccessMutateAddCategory,
    reset,
  } = useAddCategoryModal();

  useEffect (() => {
    if (isSuccessMutateAddCategory) {
      onClose?.();
      refetchCategory?.();
    }
  }, [isSuccessMutateAddCategory])

  return (
    <Modal onOpenChange={onOpenChange} isOpen={isOpen} placement="center" scrollBehavior="inside">
      <form onSubmit={handleSubmit((data) => handleAddCategory(data as Parameters<typeof handleAddCategory>[0]))}>
        <ModalContent className="m-4">
          <ModalHeader>Add Category</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-bold">Information</p>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Category Name"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.name !== undefined}
                    errorMessage={errors.name?.message}
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Category Description"
                    variant="bordered"
                    isInvalid={errors.description !== undefined}
                    errorMessage={errors.description?.message}
                  />
                )}
              />
              <p className="mt-2 font-bold">Icon</p>
              <Controller
                name="icon"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    onChange={(e) => {
                      onChange(e.currentTarget.files);
                    }}
                    isInvalid={errors.icon !== undefined}
                    errorMessage={errors.icon?.message}
                    isDropable
                  />
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="font-semibold"
              color="danger"
              variant="flat"
              onPress={onClose}
              disabled={isPendingMutateAddCategory || isPendingMutateAddFile}
            >
              Cancel
            </Button>
            <Button
              className="font-semibold"
              color="danger"
              type="submit"
              disabled={isPendingMutateAddCategory || isPendingMutateAddFile}
            >
              {isPendingMutateAddCategory || isPendingMutateAddFile ? (
                <Spinner size="sm" color="white"/>
              ) : (
                "Add Category"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddCategory;
