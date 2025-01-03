import { useState } from "react";

import { Box, Typography } from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import CloseIcon from "@mui/icons-material/Close";
import Button from "components/Button";

import { Formik, Form, Field } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

import { getTrafficProgramToolbarStyles } from "../styles";
import Modal from "components/Modal";
import { FormInput } from "components/Input";

const Content = ({ classes, onClose }) => {
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .test(
        "password-match",
        "Incorrect password",
        (value) => value === "1234"
      ),
  });

  const handleSubmit = () => {
    toast.success("Traffic timing successfully changed");
    onClose();
  };

  return (
    <Box>
      <Box sx={classes.header}>
        <Typography>Traffic timing change ALERT!</Typography>
        <CloseIcon sx={classes.icon} onClick={onClose} />
      </Box>
      <Box sx={classes.body}>
        <Typography>
          Change the traffic light timing require manager approval Are you sure
          you want to change this data?
        </Typography>
        <Formik
          initialValues={{ password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ handleSubmit, errors }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                component={FormInput}
                placeholder="Enter Password"
                name="password"
                error={!!errors.password}
                isPassword={true}
                className="inputField"
              />
              <Box sx={classes.footer}>
                <Button className="cancelBtn" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">Approved</Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export const TrafficProgramToolbar = () => {
  const classes = getTrafficProgramToolbarStyles();

  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpenAlertModal(true);
  };
  const handleCloseModal = () => {
    setIsOpenAlertModal(false);
  };
  return (
    <Box>
      <Button
        sx={classes.updateBtn}
        startIcon={<UpdateIcon />}
        onClick={() => handleOpenModal()}
      >
        Update
      </Button>

      <Modal
        open={isOpenAlertModal}
        onClose={() => handleCloseModal()}
        size="xs"
        content={<Content classes={classes} onClose={handleCloseModal} />}
        modalStyles={classes.modal}
      />
    </Box>
  );
};
