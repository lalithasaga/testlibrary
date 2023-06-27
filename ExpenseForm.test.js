import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExpenseForm from './ExpenseForm';

// Test case 1: Renders ExpenseForm component correctly
test('renders ExpenseForm component', () => {
  render(<ExpenseForm />);
  const expenseFormElement = screen.getByText('Add Expense');
  expect(expenseFormElement).toBeInTheDocument();
});

// Test case 2: Adds a new expense on form submission
test('adds a new expense on form submission', () => {
  render(<ExpenseForm />);
  const expenseInput = screen.getByLabelText('Expense');
  const descriptionInput = screen.getByLabelText('Description');
  const categoryInput = screen.getByLabelText('Category');
  const addButton = screen.getByText('Add Expense');

  fireEvent.change(expenseInput, { target: { value: '10' } });
  fireEvent.change(descriptionInput, { target: { value: 'Lunch' } });
  fireEvent.change(categoryInput, { target: { value: 'Food' } });
  fireEvent.click(addButton);

  const expenseElement = screen.getByText('10');
  expect(expenseElement).toBeInTheDocument();
});

// Test case 3: Displays correct total expenses
test('displays correct total expenses', () => {
  render(<ExpenseForm />);
  const expenseInput = screen.getByLabelText('Expense');
  const addButton = screen.getByText('Add Expense');

  fireEvent.change(expenseInput, { target: { value: '10' } });
  fireEvent.click(addButton);

  fireEvent.change(expenseInput, { target: { value: '20' } });
  fireEvent.click(addButton);

  const totalExpensesElement = screen.getByText('Total Expenses: 30');
  expect(totalExpensesElement).toBeInTheDocument();
});

// Test case 4: Deletes an expense on delete button click
test('deletes an expense on delete button click', () => {
  render(<ExpenseForm />);
  const expenseInput = screen.getByLabelText('Expense');
  const addButton = screen.getByText('Add Expense');
  const deleteButton = screen.getByText('Delete');

  fireEvent.change(expenseInput, { target: { value: '10' } });
  fireEvent.click(addButton);

  fireEvent.click(deleteButton);

  const expenseElement = screen.queryByText('10');
  expect(expenseElement).not.toBeInTheDocument();
});

// Test case 5: Edits an expense on edit button click
test('edits an expense on edit button click', () => {
  render(<ExpenseForm />);
  const expenseInput = screen.getByLabelText('Expense');
  const addButton = screen.getByText('Add Expense');
  const editButton = screen.getByText('Edit');

  fireEvent.change(expenseInput, { target: { value: '10' } });
  fireEvent.click(addButton);

  fireEvent.change(expenseInput, { target: { value: '20' } });
  fireEvent.click(editButton);

  const expenseElement = screen.getByText('20');
  expect(expenseElement).toBeInTheDocument();
});

// Test case 6: Toggles theme on toggle theme button click
test('toggles theme on toggle theme button click', () => {
  render(<ExpenseForm />);
  const toggleThemeButton = screen.getByText('Toggle Theme');

  fireEvent.click(toggleThemeButton);

  const appElement = screen.getByTestId('app');
  expect(appElement).toHaveClass('dark-theme');
});

// Test case 7: Downloads file on download button click
test('downloads file on download button click', () => {
  render(<ExpenseForm />);
  const downloadButton = screen.getByText('Download File');

  fireEvent.click(downloadButton);

  // Add assertions to check the file download functionality
});

// Test case 8: Validates expense input value
test('validates expense input value', () => {
  render(<ExpenseForm />);
  const expenseInput = screen.getByLabelText('Expense');
  const addButton = screen.getByText('Add Expense');

  fireEvent.change(expenseInput, { target: { value: 'abc' } });
  fireEvent.click(addButton);

  const errorElement = screen.getByText('Invalid expense value');
  expect(errorElement).toBeInTheDocument();
});

// Test case 9: Displays a success message on successful expense addition
test('displays a success message on successful expense addition', () => {
  render(<ExpenseForm />);
  const expenseInput = screen.getByLabelText('Expense');
  const addButton = screen.getByText('Add Expense');

  fireEvent.change(expenseInput, { target: { value: '10' } });
  fireEvent.click(addButton);

  const successMessageElement = screen.getByText('Expense added successfully');
  expect(successMessageElement).toBeInTheDocument();
});

// Test case 10: Clears form inputs on form reset
test('clears form inputs on form reset', () => {
  render(<ExpenseForm />);
  const expenseInput = screen.getByLabelText('Expense');
  const descriptionInput = screen.getByLabelText('Description');
  const categoryInput = screen.getByLabelText('Category');
  const resetButton = screen.getByText('Reset');

  fireEvent.change(expenseInput, { target: { value: '10' } });
  fireEvent.change(descriptionInput, { target: { value: 'Lunch' } });
  fireEvent.change(categoryInput, { target: { value: 'Food' } });
  fireEvent.click(resetButton);

  expect(expenseInput.value).toBe('');
  expect(descriptionInput.value).toBe('');
  expect(categoryInput.value).toBe('');
});
