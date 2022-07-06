import React from "react";
import { PostProduct } from "../../../api";
import { useMutation, useQueryClient } from "react-query";
import { Formik, FieldArray } from "formik";
import validationSchema from "./validations";
import {
  Text,
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { message } from "antd";
function NewProduct() {
  const queryClient = useQueryClient();

  const newProductMutation = useMutation(PostProduct, {
    //bu keyin sahip olduğu fetch baştan çalışacak silindiği anda tablodan da gidecek.
    onSuccess: () => {
      queryClient.invalidateQueries("admin:products");
    },
  });

  const handleSubmit = async (values, bag) => {
    message.loading({ content: "Saving...", key: "product_create" });
    newProductMutation.mutate(values, {
      onSuccess: () => {
        message.success({
          content: "Product Saved",
          key: "product_create",
          duration: 2,
        });
      },
    });
  };
  return (
    <div>
      <Text fontSize="2xl">New Product</Text>
      <Formik
        initialValues={{
          title: "",
          description: "",
          price: "",
          photos: [],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          errors,
          touched,
          handleChange,
          handleBlur,
          values,
          isSubmitting,
        }) => (
          <>
            <Box>
              <Box my={5} textAlign="left">
                <form onSubmit={handleSubmit}>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      isInvalid={touched.title && errors.title}
                    />
                    {touched.title && errors.title && (
                      <Text color="red">{errors.title}</Text>
                    )}
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      isInvalid={touched.description && errors.description}
                    />
                    {touched.description && errors.description && (
                      <Text color="red">{errors.description}</Text>
                    )}
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Price</FormLabel>
                    <Input
                      name="price"
                      value={values.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      isInvalid={touched.price && errors.price}
                    />
                    {touched.price && errors.price && (
                      <Text color="red">{errors.price}</Text>
                    )}
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Photos</FormLabel>
                    <FieldArray
                      name="photos"
                      render={(arrayHelpers) => (
                        <div>
                          {values.photos.map((photo, index) => (
                            <div key={index}>
                              <Input
                                name={`photos.${index}`}
                                value={photo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled={isSubmitting}
                                width="3xl"
                              />
                              <Button
                                colorScheme="red"
                                mx={2}
                                type="button"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                Remove
                              </Button>
                            </div>
                          ))}
                          <Button
                            type="button"
                            colorScheme="teal"
                            variant="outline"
                            mt={1}
                            onClick={() => arrayHelpers.push("")}
                          >
                            Add Photo
                          </Button>
                        </div>
                      )}
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    variant="ghost"
                    colorScheme="teal"
                    mt={1}
                    isLoading={isSubmitting}
                  >
                    Save
                  </Button>
                </form>
              </Box>
            </Box>
          </>
        )}
      </Formik>
    </div>
  );
}

export default NewProduct;
