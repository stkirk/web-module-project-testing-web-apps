import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
  render(<ContactForm />);

  const formHeader = screen.getByText(/contact form/i);
  expect(formHeader).toBeInTheDocument();
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  render(<ContactForm />);
  const nameInput = screen.getByLabelText(/first name/i);
  userEvent.type(nameInput, "Bill");
  screen.getByDisplayValue("Bill");
  screen.getByTestId("error");
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  render(<ContactForm />);
  const submitButton = screen.getByRole("button", { name: /submit/i });
  userEvent.click(submitButton);
  const errors = screen.getAllByTestId("error");
  expect(errors.length).toBe(3);
  expect(errors.length).not.toBe(2);
});

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

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {});

test("renders all fields text when all fields are submitted.", async () => {});
