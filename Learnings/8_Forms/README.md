# Forms
Form is used to collect data from a user. Once in a while we use form to fill our information on a paper or on a website. Either to sign up, sign in or to apply for a job we fill different form fields to submit our data to remote database. We encounter different form fields when we fill a form such as simple text, email, password, telephone, date, checkbox, radio button, option selection and text area field. Currently, HTML5 has provide quite a lot of field types. You may have a look at the following available HTML5 input types.
```
<input type="text" />
<input type="number" />
<input type="range" />

<input type="email" />
<input type="password" />
<input type="tel" />

<input type="checkbox" />
<input type="radio" />

<input type="color" />

<input type="url" />
<input type="image" />
<input type="file" />

<input type="hidden" />

<input type="date" />
<input type="datetime-local" />
<input type="month" />
<input type="week" />
<input type="time" />

<input type="reset" />
<input type="search" />
<input type="submit" />
<input type="button" />
```
In React, we can create forms using these HTML input types. However, handling form data and
input state requires some additional considerations. React provides two main approaches for handling forms: controlled components and uncontrolled components.

## Controlled Components
In controlled components, form data is handled by the React component's state. The value of the input field is controlled by React, and any changes to the input are managed through event handlers.

```jsx
import React, { useState } from 'react';

function ControlledForm() {
  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Submitted name: ${name}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
export default ControlledForm;
```
In this example, the `ControlledForm` component manages the state of the `name` input field. The `handleChange` function updates the state whenever the input value changes, and the `handleSubmit` function handles form submission.

## Uncontrolled Components
In uncontrolled components, form data is handled by the DOM itself. React uses refs to access the values of input fields directly.

```jsx
import React, { useRef } from 'react';
function UncontrolledForm() {
  const nameRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Submitted name: ${nameRef.current.value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" ref={nameRef} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
export default UncontrolledForm;
```
In this example, the `UncontrolledForm` component uses a ref to access the value of the `name` input field when the form is submitted.
In summary, controlled components provide more control over form data and are generally preferred in React applications, while uncontrolled components can be simpler to implement for basic use cases.


## Handling Multiple Inputs
When dealing with multiple input fields, you can manage their state using a single state object in controlled components.

```jsx
import React, { useState } from 'react';
function MultiInputForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
// or 
// function handleChange(e) {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Submitted data: ${JSON.stringify(formData)}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
export default MultiInputForm;
```
In this example, the `MultiInputForm` component manages the state of multiple input fields using a single `formData` state object. The `handleChange` function updates the corresponding field in the state based on the `name` attribute of the input element.

## Handling Select, Radio, Checkbox
React treats all form inputs (text, radio, checkbox, dropdown) the same — via value and onChange.

i) select example:
```jsx
import React, { useState } from 'react';
function FruitSelect() {
  const [fruit, setFruit] = useState('apple');

  return (
    <select value={fruit} onChange={(e) => setFruit(e.target.value)}>
      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
    </select>
  );
}
export default FruitSelect;
```
ii) radio example:
```jsx 
import React, { useState } from 'react';
function GenderSelect() {
  const [gender, setGender] = useState('male');
    return (
        <div>
        <label>
            <input
            type="radio"
            value="male"
            checked={gender === 'male'}
            onChange={(e) => setGender(e.target.value)}
            />
            <span>Male</span>
        </label>
        <label>
            <input
            type="radio"
            value="female"
            checked={gender === 'female'}
            onChange={(e) => setGender(e.target.value)}
            />
            <span>Female</span>
        </label>
    </div>
  );
}
export default GenderSelect;
```

iii) checkbox example:
```jsx
import React, { useState } from 'react';
function SubscribeCheckbox() {
    const [isSubscribed, setIsSubscribed] = useState(false);
    
    return (
        <label>
        <input
            type="checkbox"
            checked={isSubscribed}
            onChange={(e) => setIsSubscribed(e.target.checked)}
        />
        <span>Subscribe to newsletter</span>
        </label>
    );
    }
export default SubscribeCheckbox;
```
In these examples, we handle `select`, `radio`, and `checkbox` inputs using controlled components. The state is updated based on user interactions, and the current value is reflected in the input elements.

## Form Submission
You handle submit events using onSubmit and prevent the default page reload.
- If you don’t call ```e.preventDefault()```, the browser reloads after submitting.

```jsx
import React, { useState } from 'react';
function SimpleForm() {
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    alert(`Submitted name: ${name}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
export default SimpleForm;
```
In this example, the `handleSubmit` function prevents the default form submission behavior and displays an alert with the submitted name.

## Form Validation
you can validate inputs manually or with libraries like Formik, React Hook Form, or Yup
| Library             | Use Case                                         |
| ------------------- | ------------------------------------------------ |
| **Formik**          | Simplifies large forms with validation           |
| **React Hook Form** | Lightweight + works with uncontrolled components |
| **Yup**             | Schema-based validation (often used with Formik) |

You can validate form inputs before submission. Here’s a simple example:
```jsx
import React, { useState } from 'react';
function ValidatedForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.includes('@')) {
      setError('Invalid email address');
    } else {
      setError('');
      alert(`Submitted email: ${email}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}
export default ValidatedForm;
```
In this example, the `ValidatedForm` component checks if the email input contains an "@"
symbol before allowing submission. If the validation fails, an error message is displayed.

## Summary
- Controlled forms sync UI and state — best for React apps.
- Uncontrolled forms rely on the DOM — simpler for small forms.
- Handle onChange + onSubmit for control.
- Use form libraries for validation and scalability.
