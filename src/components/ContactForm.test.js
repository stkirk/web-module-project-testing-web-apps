import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";

// TEST 1
test("renders without errors", () => {
  render(<ContactForm />);
});

//TEST 2
test("renders the contact form header", () => {
  render(<ContactForm />);

  const formHeader = screen.getByText(/contact form/i);
  expect(formHeader).toBeInTheDocument();
  expect(formHeader).toBeTruthy();
  expect(formHeader).toHaveTextContent("Contact Form");
});

//TEST 3
test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  render(<ContactForm />);
  const nameInput = screen.getByLabelText(/first name/i);
  userEvent.type(nameInput, "Bill");
  screen.getByDisplayValue("Bill");
  screen.getByTestId("error");
});

//TEST 4
test("renders THREE error messages if user enters no values into any fields.", async () => {
  render(<ContactForm />);
  const submitButton = screen.getByRole("button", { name: /submit/i });
  userEvent.click(submitButton);
  const errors = screen.getAllByTestId("error");
  expect(errors.length).toBe(3);
  expect(errors.length).not.toBe(2);
});

//TEST 5
test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);
  const firstName = screen.getByLabelText(/first name/i);
  userEvent.type(firstName, "Dexter");
  const lastName = screen.getByLabelText(/last name/i);
  userEvent.type(lastName, "Jetster");
  const submitButton = screen.getByRole("button", { name: /submit/i });
  userEvent.click(submitButton);
  const error = screen.getByTestId("error");
  expect(error).toBeInTheDocument();
});

//TEST 6
test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);
  const falseError = screen.queryByTestId("error");
  expect(falseError).not.toBeInTheDocument();
  const emailInput = screen.getByLabelText(/email/i);
  userEvent.type(emailInput, "Yoda");
  screen.getByDisplayValue("Yoda");
  const error = screen.getByTestId("error");
  expect(error).toBeVisible();
  expect(error).toHaveTextContent("email must be a valid email address");
});

//TEST 7
test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText(/first name/i);
  const emailInput = screen.getByLabelText(/email/i);
  userEvent.type(firstNameInput, "Albus");
  userEvent.type(emailInput, "Dumbledore@hogwarts.edu");
  screen.getByDisplayValue("Albus");
  screen.getByDisplayValue("Dumbledore@hogwarts.edu");
  const submitButton = screen.getByRole("button", { name: /submit/i });
  userEvent.click(submitButton);
  const emailError = screen.getByTestId("error");
  expect(emailError).toBeVisible();
  expect(emailError).toHaveTextContent("lastName is a required field");
});

//TEST 8
test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const emailInput = screen.getByLabelText(/email/i);
  userEvent.type(firstNameInput, "Darth");
  userEvent.type(lastNameInput, "Revan");
  userEvent.type(emailInput, "revan@sith.org");
  const submitButton = screen.getByRole("button", { name: /submit/i });
  userEvent.click(submitButton);
  //see if info renders
  const firstnameDisplay = screen.getByTestId("firstnameDisplay");
  expect(firstnameDisplay).toBeVisible();
  expect(firstnameDisplay).toHaveTextContent("Darth");
  const lastnameDisplay = screen.getByTestId("lastnameDisplay");
  expect(lastnameDisplay).toBeVisible();
  expect(lastnameDisplay).toHaveTextContent("Revan");
  const emailDisplay = screen.getByTestId("emailDisplay");
  expect(emailDisplay).toBeVisible();
  expect(emailDisplay).toHaveTextContent("revan@sith.org");
  const messageDisplay = screen.queryByTestId("messageDisplay");
  expect(messageDisplay).not.toBeInTheDocument();
});

//TEST 9
test("renders all fields text when all fields are submitted.", async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const messageInput = screen.getByLabelText(/message/i);
  userEvent.type(firstNameInput, "Darth");
  userEvent.type(lastNameInput, "Revan");
  userEvent.type(emailInput, "revan@sith.org");
  userEvent.type(messageInput, "Who I am is not important, my message is.");
  const submitButton = screen.getByRole("button", { name: /submit/i });
  userEvent.click(submitButton);
  //see if info renders
  const firstnameDisplay = screen.getByTestId("firstnameDisplay");
  expect(firstnameDisplay).toBeVisible();
  expect(firstnameDisplay).toHaveTextContent("Darth");
  const lastnameDisplay = screen.getByTestId("lastnameDisplay");
  expect(lastnameDisplay).toBeVisible();
  expect(lastnameDisplay).toHaveTextContent("Revan");
  const emailDisplay = screen.getByTestId("emailDisplay");
  expect(emailDisplay).toBeVisible();
  expect(emailDisplay).toHaveTextContent("revan@sith.org");
  const messageDisplay = screen.getByTestId("messageDisplay");
  expect(messageDisplay).toBeVisible();
  expect(messageDisplay).toHaveTextContent(
    "Who I am is not important, my message is."
  );
});
