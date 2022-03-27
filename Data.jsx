export const formModalContent = {
  inputs: [
      {
      placeholder: 'Enter Your Name',
      label: 'Your Name',
      variant: 'standard',
      name: 'yourName',
      type: 'text',
      req: true,
      message: 'Your name is required.',
      },
      {
      placeholder: 'Enter Your E-mail',
      label: 'E-mail',
      variant: 'standard',
      name: 'email',
      type: 'text',
      req: true,
      message: 'Your e-mail is required.',
      },
      {
        placeholder: 'Enter Your Phone',
        label: 'Phone',
        variant: 'standard',
        name: 'phone',
        type: 'tel',
        req: false,
        message: 'Phone is not required.'
      },
      {
        placeholder: 'Enter Subject',
        label: 'Subject',
        variant: 'standard',
        name: 'subject',
        type: 'text',
        req: false,
        message: 'Subject is required.'
      }
  ],
};
