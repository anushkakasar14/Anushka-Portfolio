// Every project — card and full case study — is rendered from this file.
// Adding a project = adding an object here (and optionally a visual).
//
// Case-study `sections` are typed blocks rendered by DetailBlock:
//   text · features · stack · flow · notice · links

export const projects = [
  {
    id: 'parijatak',
    index: '01',
    title: 'Studio Parijatak',
    category: 'Home Textile Brand Website',
    description:
      'A responsive brand website for a home textile studio — product showcase, inquiry flow and WhatsApp ordering, taken from client brief to live domain.',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Express', 'PostgreSQL'],
    liveUrl: 'https://www.studioparijatak.com/',
    githubUrl: 'https://github.com/anushkakasar14/Parijatak',
    tags: ['Client project', 'Full-stack', 'Live'],
    visual: 'parijatak',
    meta: [
      { label: 'Type', value: 'Independent client project' },
      { label: 'Role', value: 'Full-stack development' },
      { label: 'Stack', value: 'React · TypeScript · Tailwind CSS · Express' },
      { label: 'Status', value: 'Live' },
    ],
    sections: [
      {
        type: 'text',
        label: 'Overview',
        title: 'A home textile brand,',
        accent: 'brought online.',
        paragraphs: [
          'Studio Parijatak is a home textile brand. The goal was a website that presents the collection beautifully, works smoothly on any device, and makes it effortless for customers to ask about a product.',
          'I worked on it as an independent client project — turning requirements into a responsive storefront, contributing to the admin interface, and handling deployment through to the live domain.',
        ],
      },
      {
        type: 'features',
        label: 'What I built',
        title: 'From brief to',
        accent: 'live site.',
        items: [
          { title: 'Responsive frontend', text: 'Layouts composed for phones, tablets and desktops so the collection looks considered on every screen.' },
          { title: 'Product showcase', text: 'A browsable presentation of the textile range that lets the patterns and materials lead.' },
          { title: 'Interactive product presentation', text: 'Product views designed to feel tactile and engaging rather than a flat catalogue.' },
          { title: 'Admin interface contribution', text: 'Contributed to the admin side used to manage what appears on the storefront.' },
          { title: 'Customer inquiry flow', text: 'A clear path for visitors to ask about products, so interest turns into a conversation.' },
          { title: 'WhatsApp functionality', text: 'Direct WhatsApp hand-off — the channel the brand and its customers already prefer.' },
          { title: 'Deployment & domain work', text: 'Took the site live and connected it to the brand’s own domain.' },
          { title: 'Client requirement implementation', text: 'Translated the client’s brief and feedback into working features, iteration by iteration.' },
        ],
      },
      { type: 'stack', label: 'Under the hood', title: 'Technology' },
      {
        type: 'links',
        label: 'See it',
        title: 'Explore the',
        accent: 'live project.',
        text: 'The site is live — have a look around, or browse the source on GitHub.',
      },
    ],
  },
  {
    id: 'retinopathy',
    index: '02',
    title: 'Diabetic Retinopathy Prediction',
    fullTitle: 'DL & ML-Based Prediction of Diabetic Retinopathy Using Fundus Images',
    category: 'Deep Learning · Research Project',
    description:
      'An academic deep-learning project that classifies retinal fundus images to predict diabetic retinopathy stages — exploring how image models can support early screening research.',
    technologies: ['Deep Learning', 'Machine Learning', 'Image Classification', 'Fundus Image Analysis'],
    liveUrl: null,
    githubUrl: null,
    tags: ['Academic', 'AI / ML', 'Research'],
    visual: 'retina',
    meta: [
      { label: 'Type', value: 'Academic research project' },
      { label: 'Domain', value: 'Deep learning · Computer vision' },
      { label: 'Data', value: 'Retinal fundus images' },
      { label: 'Output', value: 'Predicted DR stage class' },
    ],
    sections: [
      {
        type: 'text',
        label: 'Overview',
        title: 'Teaching a model to',
        accent: 'read the retina.',
        paragraphs: [
          'This project explores how deep learning and machine learning techniques can classify retinal fundus images to predict diabetic retinopathy. It covers the full workflow — from preparing image data to training an image classification model and interpreting its predictions.',
        ],
      },
      {
        type: 'text',
        label: 'Problem',
        title: 'Why it matters',
        paragraphs: [
          'Diabetic retinopathy is a complication of diabetes that affects the retina. Reviewing fundus images manually takes specialist time, which makes it an interesting area for research into automated image analysis.',
        ],
      },
      {
        type: 'text',
        label: 'Solution',
        title: 'An image-classification approach',
        paragraphs: [
          'The project frames the task as image classification: given a fundus photograph, the model predicts which retinopathy class it most likely belongs to. Deep learning lets the model learn relevant visual patterns directly from the images rather than relying on hand-written rules.',
        ],
      },
      {
        type: 'flow',
        label: 'Workflow',
        title: 'The prediction',
        accent: 'pipeline.',
        steps: [
          { icon: 'ImageIcon', title: 'Fundus image input', text: 'Retinal fundus photographs form the dataset the model learns from.' },
          { icon: 'SlidersHorizontal', title: 'Pre-processing', text: 'Images are standardised — resized and normalised — so the model sees consistent input.' },
          { icon: 'BrainCircuit', title: 'Deep learning model', text: 'A neural network learns visual features associated with retinopathy.' },
          { icon: 'Target', title: 'Stage prediction', text: 'The model outputs a predicted diabetic retinopathy class for each image.' },
        ],
      },
      { type: 'stack', label: 'Technology', title: 'Tools & techniques' },
      {
        type: 'notice',
        label: 'Important note',
        text: 'This is an academic research project built for learning and exploration. It is not a medical device, has not been clinically validated, and must not be used to diagnose or make decisions about any medical condition.',
      },
    ],
  },
];

export const getProject = (id) => projects.find((p) => p.id === id);
