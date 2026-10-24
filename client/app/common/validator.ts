import * as yup from "yup";

export const contactSchema = yup.object().shape({
  full_name: yup
    .string()
    .required("Full name is required")
    .min(2, "Name is too short"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  rating: yup.number().required("Please select a rating").min(1).max(5),
  comment: yup
    .string()
    .required("Message / feedback is required")
    .min(100, "Message should be at least 100 characters long")
    .max(200, "Message should be at most 200 characters long"),
});
